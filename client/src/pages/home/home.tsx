import { Box, Typography, Stack } from "@mui/material";
import React, { useEffect } from "react";

import bg from "../../assets/bg.jpg";
import sport from "../../assets/sport_home.png";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

import "./home.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Discussions from "./discussions/discussions";
import Sports from "./sports/sports";
import Testimonials from "./testimonials/testimonials";
import About from "./about/About";
import Contact from "./contact/contact";
import axios from "axios";
import { getBadminton, getBasketball, getCricket, getFootball, getTable_Tennis } from "../../store/registeredSlice";

const Home = () => {
  const dispatch = useDispatch();
  const s_id = useSelector((state: RootState) => state.login.userId);
  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    const fetchData = async () => {
      if (token !== "") {
        try {
          const response = await axios.get(
            `http://localhost:5000/user/registered/${s_id}`
          );

          if (response.status === 200) {
            const data = response.data;
            // console.log(data);

            dispatch(getBadminton(data.Badminton));
            dispatch(getBasketball(data.Basketball));
            dispatch(getCricket(data.Cricket));
            dispatch(getFootball(data.Football));
            dispatch(getTable_Tennis(data.Table_Tennis));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homePage">
      <HeroBanner />
      <Sports />
      {/* <Discussions /> */}
      <About />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
