import React from "react";
import { styled } from "@mui/material/styles";

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

const Messages = ({ messages = [], name = "" }) => {
  return (
    <>
      {messages.map((item, i) => {
        const userName = item.user?.name || item.user;
        const text = item.message || item.text;
        const time = item.time || "";

        const isMe =
          userName?.trim().toLowerCase() === name?.trim().toLowerCase();
        const isAdmin = userName === "Admin";

        if (isAdmin) {
          return <SystemMessage key={i}>{text}</SystemMessage>;
        }

        const userColor = stringToColor(userName || "User");
        const initials = userName ? userName.slice(0, 2).toUpperCase() : "??";

        return (
          <MessageWrapper key={i} isMe={isMe}>
            {!isMe && (
              <Avatar style={{ backgroundColor: userColor }}>{initials}</Avatar>
            )}

            <MessageBlock isMe={isMe}>
              {!isMe && (
                <SenderName style={{ color: userColor }}>{userName}</SenderName>
              )}

              <Bubble isMe={isMe}>
                <MessageText>{text}</MessageText>
                <MessageTime isMe={isMe}>{time}</MessageTime>
              </Bubble>
            </MessageBlock>
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
  marginBottom: "15px",
  alignItems: "flex-end",
  gap: "10px",
}));

const Avatar = styled("div")({
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "14px",
  flexShrink: 0,
});

const MessageBlock = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMe",
})(({ isMe }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isMe ? "flex-end" : "flex-start",
  maxWidth: "70%",
}));

const Bubble = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMe",
})(({ isMe }) => ({
  padding: "8px 12px",
  borderRadius: "16px",
  borderBottomLeftRadius: isMe ? "16px" : "0",
  borderBottomRightRadius: isMe ? "0" : "16px",

  backgroundColor: isMe ? "#007FFF" : "#252525",
  color: "#ffffff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  position: "relative",
  minWidth: "60px",
}));

const SenderName = styled("div")({
  fontSize: "12px",
  marginBottom: "4px",
  fontWeight: "600",
  marginLeft: "10px",
});

const MessageText = styled("div")({
  fontSize: "15px",
  lineHeight: "1.4",
  wordBreak: "break-word",
  marginBottom: "5px",
});

const MessageTime = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMe",
})(({ isMe }) => ({
  fontSize: "10px",
  color: isMe ? "rgba(255,255,255,0.7)" : "#a0a0a0",
  textAlign: "right",
  marginTop: "-5px",
}));
