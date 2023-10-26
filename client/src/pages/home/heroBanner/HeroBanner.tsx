import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import Img from "../../../components/lazyLoadImage/Img";
import heroBg from "../../../assets/heroBanner.jpg";

import "./HeroBanner.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const name = useSelector((state: RootState) => state.login.userName);

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={heroBg} className={""} />
      </div>

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          {/* add typewriter effect on the title */}
          <span className="title">Welcome. {name}</span>
          <span className="subtitle">
            Place for Gaming Community. Events, Clubs & More.
          </span>
          <span className="subtitle2">Explore Now !!</span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
