import React, { useEffect, useRef, useState } from "react";
import { Button, colors } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { Height } from "@mui/icons-material";

interface MessagesProps {
  socket: Socket;
  message: string;
  userName: string;
  sport: string;
  updateMessage: (newMessage: string) => void;
  validate: string;
}

interface MessageType {
  room: string;
  author: string;
  message: string;
  time: string;
}

const Messages: React.FC<MessagesProps> = ({
  socket,
  message,
  userName,
  sport,
  updateMessage,
  validate,
}) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const sendMessage = async () => {
    if (message !== "" && validate != null) {
      const messageData: MessageType = {
        room: sport,
        author: userName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
      updateMessage("");
    }
  };

  const socketRef = useRef(socket);

  useEffect(() => {
    // Use the ref value instead of the prop directly
    const currentSocket = socketRef.current;

    console.log(currentSocket);

    currentSocket.on("receive_message", (data: any) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    });

    // Cleanup the socket event listener when the component unmounts
    return () => {
      currentSocket.off("receive_message");
    };
  }, [socketRef]);

  return (
    <div className="message_container">
      <ScrollToBottom className="display">
        {messageList.map((messageContent) => {
          return (
            <div
              className="message"
              id={userName === messageContent.author ? "you" : "other"}
            >
              <div className="message_line">
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <div className="time">{messageContent.time}</div>
                  <div className="author">{messageContent.author}</div>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="controls">
        <input
          type="text"
          placeholder={
            validate == null || validate == ""
              ? "Alert!!! Enter a chat room to initialize your talk"
              : "# Welcome to the chat room, start by saying Hii !!!"
          }
          value={message}
          onChange={(event) => {
            updateMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault(); // Prevent default form submission behavior
              sendMessage();
            }
          }}
          disabled={validate == (null || "")}
        />
        <Button
          onClick={sendMessage}
          variant="contained"
          endIcon={<SendIcon />}
          disabled={validate == (null || "")}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Messages;
