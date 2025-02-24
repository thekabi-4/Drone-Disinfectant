$(function () {
    const video = $("video")[0];

    var model;
    const esp32CamIP = "http://your_esp32_cam_ip_address"; // Replace with your ESP32-CAM IP address
    const videoStreamURL = esp32CamIP + ":81/stream"; // Commonly used port for ESP32-CAM stream

    function startVideoStream() {
        return new Promise(function (resolve, reject) {
            video.src = videoStreamURL;
            video.onloadeddata = function () {
                video.play();
                resolve();
            };
            video.onerror = function (err) {
                console.error("Error loading ESP32-CAM stream: ", err);
                // Fallback to webcam if ESP32-CAM stream fails
                navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                    video.srcObject = stream;
                    video.onloadeddata = function () {
                        video.play();
                        resolve();
                    };
                }).catch(function (webcamErr) {
                    console.error("Error loading webcam: ", webcamErr);
                    reject(webcamErr);
                });
            };
        });
    }

    var publishable_key = "rf_jkLnLoyBywOS9Erd4VuDOWMjEzm2";
    var toLoad = {
        model: "drone-s99wy",
        version: 1
    };

    function loadModel() {
        return new Promise(function (resolve, reject) {
            roboflow
                .auth({
                    publishable_key: publishable_key
                })
                .load(toLoad)
                .then(function (m) {
                    model = m;
                    resolve();
                })
                .catch(function (err) {
                    console.error("Error loading Roboflow model: ", err);
                    reject(err);
                });
        });
    }

    Promise.all([startVideoStream(), loadModel()]).then(function () {
        $("body").removeClass("loading");
        resizeCanvas();
        detectFrame();
    });

    var canvas, ctx;
    const font = "16px sans-serif";

    function videoDimensions(video) {
        var videoRatio = video.videoWidth / video.videoHeight;
        var width = video.offsetWidth,
            height = video.offsetHeight;
        var elementRatio = width / height;

        if (elementRatio > videoRatio) {
            width = height * videoRatio;
        } else {
            height = width / videoRatio;
        }

        return {
            width: width,
            height: height
        };
    }

    $(window).resize(function () {
        resizeCanvas();
    });

    const resizeCanvas = function () {
        $("canvas").remove();

        canvas = $("<canvas/>");
        ctx = canvas[0].getContext("2d");

        var dimensions = videoDimensions(video);
        canvas[0].width = video.videoWidth;
        canvas[0].height = video.videoHeight;

        canvas.css({
            width: dimensions.width,
            height: dimensions.height,
            left: ($(window).width() - dimensions.width) / 2,
            top: ($(window).height() - dimensions.height) / 2
        });

        $("body").append(canvas);
    };

    const renderPredictions = function (predictions) {
        var dimensions = videoDimensions(video);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        predictions.forEach(function (prediction) {
            const x = prediction.bbox.x;
            const y = prediction.bbox.y;
            const width = prediction.bbox.width;
            const height = prediction.bbox.height;

            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(
                x,
                y,
                width,
                height
            );

            ctx.fillStyle = "red";
            const textWidth = ctx.measureText(prediction.class).width;
            const textHeight = parseInt(font, 10);
            ctx.fillRect(
                x,
                y - textHeight,
                textWidth + 8,
                textHeight + 4
            );

            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(
                prediction.class,
                x + 4,
                y - textHeight
            );
        });
    };

    var prevTime;
    var pastFrameTimes = [];
    const detectFrame = function () {
        if (!model) return requestAnimationFrame(detectFrame);

        model
            .detect(video)
            .then(function (predictions) {
                requestAnimationFrame(detectFrame);
                renderPredictions(predictions);

                if (prevTime) {
                    pastFrameTimes.push(Date.now() - prevTime);
                    if (pastFrameTimes.length > 30) pastFrameTimes.shift();

                    var total = 0;
                    pastFrameTimes.forEach(function (t) {
                        total += t / 1000;
                    });

                    var fps = pastFrameTimes.length / total;
                    $("#fps").text(Math.round(fps));
                }
                prevTime = Date.now();
            })
            .catch(function (e) {
                console.log("CAUGHT", e);
                requestAnimationFrame(detectFrame);
            });
    };
});
