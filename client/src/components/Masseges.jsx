import React from "react";
import { styled } from "@mui/material/styles";

const Messages = ({ messages = [], name = "" }) => {
  return (
    <>
      {messages.map((item, i) => {
        const userName = item.user?.name || item.user;
        const text = item.message || item.text;

        const isMe =
          userName?.trim().toLowerCase() === name?.trim().toLowerCase();

        return (
          <MessageWrapper key={i} isMe={isMe}>
            <MessageBubble isMe={isMe}>
              <SenderName>{userName}</SenderName>
              <MessageText>{text}</MessageText>
            </MessageBubble>
          </MessageWrapper>
        );
      })}
    </>
  );
};

export default Messages;

const MessageWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMe",
})(({ isMe }) => ({
  display: "flex",
  justifyContent: isMe ? "flex-end" : "flex-start",
  marginBottom: "12px",
}));

const MessageBubble = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMe",
})(({ isMe }) => ({
  maxWidth: "60%",
  padding: "10px 16px",
  borderRadius: "14px",
  borderBottomLeftRadius: isMe ? "14px" : "2px",
  borderBottomRightRadius: isMe ? "2px" : "14px",
  backgroundColor: isMe ? "#007FFF" : "#3d3d3d",
  color: "#ffffff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
}));

const SenderName = styled("div")({
  fontSize: "11px",
  color: "rgba(255,255,255,0.6)",
  marginBottom: "4px",
  fontWeight: "bold",
});

const MessageText = styled("div")({
  fontSize: "15px",
  lineHeight: "1.4",
  wordBreak: "break-word",
});
