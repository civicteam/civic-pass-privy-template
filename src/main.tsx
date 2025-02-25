import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrivyProvider } from "@privy-io/react-auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId="privy-app-id"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        loginMethods: ["wallet"],
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
