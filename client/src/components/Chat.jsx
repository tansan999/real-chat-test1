import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { styled } from "@mui/material/styles";
import iconEmoji from "../images/happy-svgrepo-com.svg";
import EmojiPicker from "emoji-picker-react";
import Masseges from "./Massages";
import Sidebar from "./Sidebar";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // State management
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const [typingStatus, setTypingStatus] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // Join the room on component mount
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  // Listener: Receive new messages
  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  // Listener: Load message history from DB
  useEffect(() => {
    socket.on("history", ({ data }) => {
      const formattedHistory = data.map((msg) => ({
        user: { name: msg.user },
        message: msg.message,
        time: msg.time,
        _id: msg._id,
      }));
      setState((_state) => [...formattedHistory, ..._state]);
    });
  }, []);

  // Listener: Typing indicator
  useEffect(() => {
    socket.on("typing", ({ data }) => {
      setTypingStatus(`${data} is typing...`);
      setTimeout(() => setTypingStatus(""), 2000);
    });
  }, []);

  // Listener: Update room user list & identify current user
  useEffect(() => {
    socket.on("joinRoom", ({ data: { users } }) => {
      setUsers(users.length);
      setRoomUsers(users);

      const myUser = users.find((u) => u.name === params.name);
      if (myUser) setCurrentUser(myUser);
    });
  }, [params.name]);

  // Admin function: Kick a user
  const handleKick = (targetUserName) => {
    socket.emit("kick", {
      params: { room: params.room, name: targetUserName },
    });
  };

  // Check if I was kicked from the room
  useEffect(() => {
    if (roomUsers.length > 0) {
      const amIInRoom = roomUsers.find((u) => u.name === params.name);
      if (!amIInRoom) {
        navigate("/"); // Redirect to login
      }
    }
  }, [roomUsers, params.name, navigate]);

  // Listener: Message deleted
  useEffect(() => {
    socket.on("deleteMessage", ({ id }) => {
      setState((_state) => _state.filter((msg) => msg._id !== id));
    });
  }, []);

  // Handler: Delete message
  const handleDeleteMessage = (id) => {
    if (id) {
      socket.emit("deleteMessage", { id, room: params.room });
    }
  };

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", { params });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;

    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  const onEmojiClick = (emojiData) => {
    const newMessage = `${message} ${emojiData.emoji}`;
    setMessage(newMessage);
    setOpen(false);
  };

  return (
    <PageContainer>
      <ChatCard>
        {/* Left Sidebar with Users */}
        <Sidebar
          users={roomUsers}
          currentUser={currentUser}
          onKick={handleKick}
        />

        <ChatArea>
          <ChatHeader>
            <RoomInfo>
              <RoomTitle>{params.room}</RoomTitle>
              <UserCount>{users} users online</UserCount>
            </RoomInfo>
            <LeaveButton onClick={leftRoom}>Leave Room</LeaveButton>
          </ChatHeader>

          <MessagesArea>
            <Masseges
              messages={state}
              name={params.name}
              onDelete={handleDeleteMessage}
              isAdmin={currentUser.isAdmin}
            />
            {typingStatus && <TypingIndicator>{typingStatus}</TypingIndicator>}
          </MessagesArea>

          <ChatFooter onSubmit={handleSubmit}>
            <InputContainer>
              <StyledInput
                type="text"
                name="message"
                placeholder="What do you want to say?"
                onChange={handleChange}
                value={message}
                autoCapitalize="off"
                autoComplete="off"
                required
              />
            </InputContainer>
            <EmojiContainer>
              <EmojiIcon
                src={iconEmoji}
                alt="emoji"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <EmojiPickerWrapper>
                  <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
                </EmojiPickerWrapper>
              )}
            </EmojiContainer>
            <SendButtonContainer>
              <SendButton type="submit" value="Send" />
            </SendButtonContainer>
          </ChatFooter>
        </ChatArea>
      </ChatCard>
    </PageContainer>
  );
};

export default Chat;

const PageContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#1a1a1a",
  fontFamily: "'Roboto', sans-serif",
});

const ChatCard = styled("div")({
  width: "100%",
  maxWidth: "1100px",
  height: "90vh",
  backgroundColor: "#252525",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  display: "flex",
  overflow: "hidden",
});

const ChatArea = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const ChatHeader = styled("div")({
  height: "70px",
  backgroundColor: "#2e2e2e",
  borderBottom: "1px solid #3d3d3d",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
});

const RoomInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const RoomTitle = styled("div")({
  fontSize: "18px",
  fontWeight: "bold",
  color: "#ffffff",
  textTransform: "capitalize",
});

const UserCount = styled("div")({
  fontSize: "12px",
  color: "#a0a0a0",
});

const LeaveButton = styled("button")({
  padding: "8px 16px",
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: "#ff3333",
  },
});

const MessagesArea = styled("div")({
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#444",
    borderRadius: "3px",
  },
});

const TypingIndicator = styled("div")({
  color: "#a0a0a0",
  fontSize: "12px",
  fontStyle: "italic",
  marginLeft: "10px",
  marginTop: "5px",
});

const ChatFooter = styled("form")({
  padding: "16px 24px",
  backgroundColor: "#2e2e2e",
  borderTop: "1px solid #3d3d3d",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  position: "relative",
});

const InputContainer = styled("div")({
  flex: 1,
  position: "relative",
});

const StyledInput = styled("input")({
  width: "100%",
  padding: "12px 16px",
  borderRadius: "24px",
  border: "1px solid #444",
  backgroundColor: "#1a1a1a",
  color: "white",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s",
  "&:focus": {
    borderColor: "#007FFF",
  },
  "&::placeholder": {
    color: "#666",
  },
});

const EmojiContainer = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const EmojiIcon = styled("img")({
  width: "28px",
  height: "28px",
  opacity: 0.7,
  transition: "opacity 0.2s, transform 0.2s",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.1)",
  },
});

const EmojiPickerWrapper = styled("div")({
  position: "absolute",
  bottom: "50px",
  right: "0",
  zIndex: 100,
});

const SendButtonContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const SendButton = styled("input")({
  padding: "10px 24px",
  backgroundColor: "#007FFF",
  color: "white",
  border: "none",
  borderRadius: "24px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: "#0066cc",
  },
});
