import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App";
import { VideoCallProvider } from "./context/Context";
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <VideoCallProvider>
        <App />
      </VideoCallProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
