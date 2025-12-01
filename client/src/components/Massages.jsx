import React from "react";
import { styled } from "@mui/material/styles";

const Messages = ({ messages = [], name = "", onDelete }) => {
  return (
    <>
      {messages.map((item) => {
        const userName = item.user?.name || item.user;
        const text = item.message;
        const time = item.time;
        const id = item._id;

        const isMe =
          userName?.trim().toLowerCase() === name?.trim().toLowerCase();

        const canDelete = isMe;

        if (userName === "Admin") {
          return (
            <SystemMessage key={id || Math.random()}>{text}</SystemMessage>
          );
        }

        return (
          <MessageWrapper key={id || Math.random()} isMe={isMe}>
            <MessageBubble isMe={isMe}>
              <SenderName>{userName}</SenderName>
              <MessageText>{text}</MessageText>
              <MessageFooter>
                <MessageTime isMe={isMe}>{time}</MessageTime>
                {canDelete && (
                  <DeleteIcon onClick={() => onDelete(id)}>🗑</DeleteIcon>
                )}
              </MessageFooter>
            </MessageBubble>
          </MessageWrapper>
        );
      })}
    </>
  );
};

export default Messages;

const SystemMessage = styled("div")({
  textAlign: "center",
  color: "#a0a0a0",
  fontSize: "12px",
  margin: "10px 0",
  fontStyle: "italic",
});

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
  position: "relative",
  minWidth: "100px",
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

const MessageFooter = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "5px",
  gap: "10px",
});

const MessageTime = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMe",
})(({ isMe }) => ({
  fontSize: "10px",
  color: "rgba(255,255,255,0.7)",
}));

const DeleteIcon = styled("span")({
  cursor: "pointer",
  fontSize: "12px",
  opacity: 0.7,
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.2)",
  },
});
