import React from "react";
import Routes from "./Routes";
import videoBg from "../images/BackgroundVideo.mp4";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div>
        <div className="m-0 p-0">
          <div className="backSplash">
            <video src={videoBg} autoPlay loop muted />
          </div>
          <div className="routes">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
