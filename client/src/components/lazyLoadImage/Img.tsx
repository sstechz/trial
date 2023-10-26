import { Method } from "axios";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImgProps {
    src: string;
    className: string;
}

const Img = ({src, className} : ImgProps) => {
  return (
    <LazyLoadImage 
        className={className || ""}
        alt="" 
        effect="blur" 
        src={src} 
    />
  );
};

export default Img;
