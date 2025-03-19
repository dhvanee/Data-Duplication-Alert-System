import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Material Icons for UI elements
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head.appendChild(link);

createRoot(document.getElementById("root")).render(<App />);