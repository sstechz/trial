import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Carousel.scss";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";

import bg_badminton from "../../assets/Badminton/1.jpg";
import bg_basketball from "../../assets/Basketball/2.jpg";
import bg_cricket from "../../assets/Cricket/1.jpg";
import bg_football from "../../assets/Football/4.jpg";
import bg_tt from "../../assets/Table Tennis/2.jpg";

const Carousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sports, setSports] = useState([]);
  const [time, setTime] = useState([]);

  const bg: string[] = [
    bg_badminton,
    bg_basketball,
    bg_cricket,
    bg_football,
    bg_tt,
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://trail-server-7o2t.onrender.com/sport");
        const data = response.data;
        // console.log(data.sports);
        setSports(data.sports);
        setTime(data.time);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchdata();
  }, []);

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="place skeleton"></div>
          <div className="time skeleton"></div>
        </div>
      </div>
    );
  };

  const access = useSelector((state: RootState) => state.registered);
  const token = useSelector((state: RootState) => state.login.token);

  const checkValidation = (sport: any) => {
    const registeredUpto = access[sport as keyof typeof access];
    const presentDay = new Date();
    const registeredUptoDay = new Date(registeredUpto);

    if(token == ""){
      alert(`Login to enter ${sport} Room`);
    }

    else if(registeredUptoDay < presentDay) {
      alert(`Register for ${sport}`);
    }

    else if(registeredUptoDay >= presentDay){
      if(token !== ""){
        navigate(`/${sport}`);
      }
    }

  }

  const cardItem = (sport: any, time: any, bg: any) => {
    const validate = access[sport as keyof typeof access];

    return (
      <div
        className="carouselItem"
        onClick={() => {
          checkValidation(sport);
        }}
      >
        <div className="posterBlock">
          <Img src={bg} className={""} />
        </div>
        <div className="textBlock">
          <span className="place">{sport}</span>
          <span className="time">{time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {!isLoading ? (
          <div className="carouselItems">
            {sports.map((sport, index) => (
              <React.Fragment key={index}>
                {cardItem(sport, time[index], bg[index])}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
