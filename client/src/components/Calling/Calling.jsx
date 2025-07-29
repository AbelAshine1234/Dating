import React from "react";
import Video from "../Video/Video";
import FormCard from "../FormCard/FormCard";
import IncomingCall from "../IncomingCall/IncomingCall";
import VideoNavBar from "../VideoNavBar/VideoNavBar";

const Calling = () => {
  return (
    <>
      <VideoNavBar />
      <Video />
      <FormCard />
      <IncomingCall />
    </>
  );
};

export default Calling;
