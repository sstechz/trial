import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import "./detailsBanner.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import b1 from "../../../assets/Badminton/4.jpg";
import b2 from "../../../assets/Basketball/2.jpg";
import b3 from "../../../assets/Cricket/1.jpg";
import b4 from "../../../assets/Football/3.jpg";
import b5 from "../../../assets/Table Tennis/2.jpg";

import p1 from "../../../assets/Badminton/2.jpg";
import p2 from "../../../assets/Basketball/1.jpg";
import p3 from "../../../assets/Cricket/2.jpg";
import p4 from "../../../assets/Football/2.jpg";
import p5 from "../../../assets/Table Tennis/1.jpg";

import info from "../../../assets/sports.json";

import Base from "../../../components/equipments/base";
import registeredSlice from "../../../store/registeredSlice";

interface DetailsBannerProps {
  //  any -> keyof typeof info for serving as the key of info json obj.
  sports: keyof typeof info;
}

const DetailsBanner = ({ sports }: DetailsBannerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [venue, setVenue] = useState("");
  const [fee, setFee] = useState("");
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState("");
  const [equipment, setEquipment] = useState({});

  const banner = {
    Badminton: b1,
    Basketball: b2,
    Cricket: b3,
    Football: b4,
    Table_Tennis: b5,
  };

  const poster = {
    Badminton: p1,
    Basketball: p2,
    Cricket: p3,
    Football: p4,
    Table_Tennis: p5,
  };

  const registeredDate = useSelector((state: RootState) => state.registered[sports as keyof typeof registeredSlice]);

  const currentDate = new Date();
  const registerDateTime = new Date(registeredDate);
  const timeDifference = registerDateTime.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/sport/${sports}`
        );

        const data = response.data;

        setVenue(data.Venue);
        setTime(data.Time);
        setFee(data.Fee);
        setEquipment(data.equipments);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    const temp = Math.floor(Math.random() * info[sports].memories.length);
    setIndex(temp);

    fetchdata();
  }, []);

  return (
    <div className="detailsBanner">
      {!isLoading ? (
        <>
          <div className="backdrop-img">
            <Img src={banner[sports as keyof typeof banner]} className="" />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                <Img
                  src={poster[sports as keyof typeof banner]}
                  className="poster-img"
                />
              </div>
              <div className="right">
                <div className="title">{info[sports].title}</div>
                <div className="subtitle">"{info[sports].subTitle}"</div>

                <Base equipment={equipment} />

                <div className="timeline">
                  <div className="history">
                    <div className="heading">Memories</div>
                    <div className="content">
                      {info[sports].memories[index]}
                    </div>
                  </div>
                  <div className="time">
                    <div className="heading">Remaining Days : {daysRemaining}</div>
                    <Button variant="contained">
                      Renew
                    </Button>
                  </div>
                </div>

                <div className="info">
                  <div className="info-item">
                    <span className="text bold">Venue:</span>
                    <span className="text">{venue}</span>
                  </div>
                  <div className="info-item">
                    <span className="text bold">Time:</span>
                    <span className="text">{time}</span>
                  </div>
                </div>

                <div className="info">
                  <div className="info-item">
                    <span className="text bold">Secretary:</span>
                    <span className="text">
                      Shrey Sahay, Pushkar Kumar Sinha, Om Ojas
                    </span>
                  </div>
                </div>

                <div className="info">
                  <div className="info-item">
                    <span className="text bold">Top Players:</span>
                    <span className="text">
                      Shrey Sahay, Pushkar Kumar Sinha, Om Ojas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ContentWrapper>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
