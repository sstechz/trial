import React, { useState, useEffect } from "react";
import "./players.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

import dp from "../../../assets/dp/2.jpg";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PlayersProps {
  //  any -> keyof typeof info for serving as the key of info json obj.
  // sports: keyof typeof info;
  sports: any;
}

const Players = ({ sports }: PlayersProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<string[]>([]);
  const [playerData, setPlayerData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get<string[]>(
          `http://localhost:5000/user/players/${sports}`
        );

        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    //// This will be executed after players state has been updated
    if (players.length === 0) {
      return;
    }

    // Make API calls for each player in the 'players' array
    const fetchPlayerData = async () => {
      try {
        const playerDataPromises = players.map(async (player) => {
          const response = await axios.get(
            `http://localhost:5000/user/players/banner/${player}`
          );
          return response.data;
        });

        const playerDpPromises = players.map(async (player) => {
          const response = await axios.get(
            `http://localhost:5100/dp/${player}`
          );
          return response.data.dp;
        });

        const allPlayerData = await Promise.all(playerDataPromises);
        const allPlayerDp = await Promise.all(playerDpPromises);

        // Combine both sets of data into a single array of player objects
        const combinedPlayerData = allPlayerData.map((data, index) => {
          return {
            ...data,
            dp: allPlayerDp[index],
          };
        });

        setPlayerData(combinedPlayerData);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, [players]);

  useEffect(() => {
    //  used to  prevent the hook from running during the initial render and only trigger it when the playerData state is updated
    if (playerData.length === 0) {
      return;
    }

    setIsLoading(false);
  }, [playerData]);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const slideNo = Math.min(players.length, 6);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slideNo,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="playerSection">
      <ContentWrapper>
        <div className="playerHeading">Players</div>

        {isLoading ? (
          <div className="playerSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        ) : (
          <div className="listItems">
            <Slider {...settings}>
              {playerData.map((player, index) => (
                <div key={index} className="listItem">
                  <div className="profileImg">
                    <Img src={player.dp} className="" />
                  </div>
                  <div className="name">{player.name}</div>
                  <div className="name year">
                    {player.s_id}, {player.branch}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Players;
