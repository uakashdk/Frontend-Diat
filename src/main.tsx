import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    
    {/* 🔥 Global Toaster */}
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      }}
    />
  </>
);