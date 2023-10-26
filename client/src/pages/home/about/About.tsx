import React from "react";
import "./About.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import ReactPlayer from "react-player/lazy";

const About = () => {
  return (
    <div className="about">
      <ContentWrapper>
        <div className="aboutTitle">About</div>
        <div className="aboutContent">
          <div className="left">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=LaQj636PJh0`}
              controls
              width="100%"
              height="100%"
            />
          </div>
          <div className="right">
            <div className="title">A Platform For Empowering Teams, Athletes, and Organizations</div>
            <div className="content">Our sports management platform offers seamless data management for  subscribed players, including profiles, equipment details, and secure handling of personal information. Stay updated with live matches and sports events while ensuring the privacy and security of all data.</div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default About;
