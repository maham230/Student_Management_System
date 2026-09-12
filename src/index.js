import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <Auth0Provider
      domain="dev-q2r62qs1ijmvpot3.us.auth0.com"
      clientId="6CSbTFMomcF2EeHLy5qhCqDExDUX3x19"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <App />

    </Auth0Provider>

  </React.StrictMode>
);

reportWebVitals();