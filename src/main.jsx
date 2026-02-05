import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n"; // i18n ko import karna mat bhoolna

createRoot(document.getElementById("root")).render(<App />);
