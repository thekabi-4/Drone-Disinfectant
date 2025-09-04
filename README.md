# Drone-Disinfectant

Automated Drone System for Spraying Disinfectants on Mosquito Breeding Sites

---

##  Overview

**Drone-Disinfectant** is a proof-of-concept web-based interface for a drone-driven system that targets mosquito breeding grounds and infected zones. Built with HTML, CSS, and JavaScript, it provides a foundation for controlling drone behavior and visualizing spraying operations, intended for extending into real-world applications.

---

##  Repository Contents

- **index.html** – Core user interface and visual representation of drone activities.
- **main.css** – Styling for the application (layout, controls, visuals).
- **main.js** – Logic for drone movement simulation, spraying behavior, and user interactions.

---

##  Key Features

- Interactive drone control through a browser interface.
- Visual simulation of spray coverage areas.
- Modular front-end code ideal for connecting to real drone APIs or further development.

---

##  Getting Started

### Prerequisites

- A modern browser (Chrome, Edge, Firefox, etc.).
- (Optional) Local server environment to avoid browser security issues when loading resources.

### Running Locally

1. **Clone the repository and navigate into it:**
    ```bash
    git clone https://github.com/thekabi-4/Drone-Disinfectant.git
    cd Drone-Disinfectant
    ```

2. **Serve locally (recommended for full functionality):**
    ```bash
    # Using Python (3.x)
    python3 -m http.server 8000

    # Or using Node.js
    npx http-server
    ```

3. **Open the app in your browser:**
    Visit `http://localhost:8000` and interact with the interface via `index.html`.

---

##  Potential Enhancements

Here are some directions you may explore to expand this prototype:

- **Real Drone Integration:** Hook up to drone hardware (e.g., via WebSocket, ROS bridge).
- **Mapping & GPS:** Overlay geographical maps and coordinate-driven drone paths.
- **Environmental Sensors:** Add data collection (e.g., humidity, temperature) to guide spraying.
- **User Interface Improvements:** Info pop-ups, forms for spraying settings, safety alerts.
- **Backend Support:** Log activity, manage schedules, store flight data on a server.

---

##  Contribution

Contributions are welcome! Here’s how you can help:

1. Fork the repo.
2. Make your enhancements.
3. Submit a Pull Request with a description of your changes and use case.

---

##  License

Specify a license (e.g., MIT, Apache 2.0) to clarify usage and contributions. Until then, it's under default GitHub licensing.

---

Happy coding—and here's to smarter, safer environments!  
If you'd like badges, deployment instructions, drone-control docs, or anything else added, I’m happy to help.
@the.kabi2004@gmail.com
