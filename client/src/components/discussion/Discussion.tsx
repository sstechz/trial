import React, { useEffect } from "react";
import "./Discussion.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import dp from "../../assets/Basketball/2.jpg";
import { Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

import { io, Socket } from "socket.io-client";
import { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import Messages from "../messages/Messages";

import ScrollToBottom from "react-scroll-to-bottom";

const socket = io("http://localhost:3100");

const Discussion = () => {
  const [sport, setSport] = useState("");
  const [validate, setValidate] = useState("");
  const [message, setMessage] = useState("");
  const [exit, setExit] = useState("");

  const [entry, setEntry] = useState({
    Badminton: 0,
    Cricket: 0,
    Basketball: 0,
    Football: 0,
    Table_Tennis: 0,
  });

  const updateEntry = (keyToUpdate: string, newValue: number) => {
    // Create a copy of the current 'entry' state
    const updatedEntry = { ...entry };

    // Update the value of the specified key in the copy
    updatedEntry[keyToUpdate as keyof typeof updatedEntry] = newValue;

    // Update the state with the modified copy
    setEntry(updatedEntry);
  };

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  const userName = useSelector((state: RootState) => state.login.userName);

  const access = useSelector((state: RootState) => state.registered);

  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    const registeredUpto = access[sport as keyof typeof access];
    const presentDay = new Date();
    const registeredUptoDay = new Date(registeredUpto);

    if(registeredUptoDay > presentDay){
      setValidate(access[sport as keyof typeof access]);
    }
    else{
      setValidate("");
    }
    
  }, [sport]);

  useEffect(() => {
    const room = sport;

    console.log(validate);

    //  if all set OK
    if (userName !== "" && room !== "" && validate != null && exit != 'exit' && token !== "") {
      socket.emit("join_room", room);
      updateEntry(sport, 1);
    }

    //  if logged in but not subscribed
    else if (
      userName !== "" &&
      room !== "" &&
      validate == null &&
      token !== ""
    ) {
      alert("You have not registered for this sport");
    }

    //  if user not logged in
    else if (userName === "" && room !== "" && token === "") {
      alert("Please log in to enter the chat room");
      setValidate("");
    }
  }, [validate]);

  const joinRoom = (room: string) => {
    setSport(room);
  };

  const exitRoom = (room: string) => {
    socket.emit("leave_room", room);
    setExit("exit");
    setValidate("");
    updateEntry(room, 0);
  };

  const roomNames = [
    "Badminton",
    "Cricket",
    "Basketball",
    "Football",
    "Table_Tennis",
  ];

  return (
    <ContentWrapper>
      <div className="discussion_container">
        <div className="left">
          <div className="title">{validate}</div>
          <div className="chat_rooms">
            {roomNames.map((roomName) => (
              <div className="room" key={roomName}>
                <div className="overview" id="exit">
                  <Button
                    onClick={() => {
                      joinRoom(roomName);
                    }}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    {roomName}
                  </Button>
                  {entry[roomName as keyof typeof entry] ? (
                    <IconButton
                      aria-label="delete"
                      className="exit_button"
                      onClick={() => {
                        exitRoom(roomName);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="middle">
          <div className="title">Messages</div>
          <Messages
            socket={socket}
            message={message}
            userName={userName}
            sport={sport}
            updateMessage={updateMessage}
            validate={validate}
          />
        </div>
        <div className="right">
          <div className="title">Participants</div>
          <div className="participants"></div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Discussion;
function useRefs(arg0: null) {
  throw new Error("Function not implemented.");
}
