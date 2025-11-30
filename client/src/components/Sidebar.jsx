import React, { useState } from "react";
import { styled } from "@mui/material/styles";

const Sidebar = ({ users = [], currentUser, onKick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Title>Room Members</Title>
        <SearchInput
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Search members..."
        />
      </SidebarHeader>

      <UserList>
        {filteredUsers.map((user) => {
          const isMe = user.name === currentUser.name;
          const showKick = currentUser.isAdmin && !isMe;

          return (
            <UserItem key={user.name}>
              <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
              <UserInfo>
                <UserName>
                  {user.name}
                  {user.isAdmin && <AdminBadge>👑</AdminBadge>}
                  {isMe && <MeBadge>(You)</MeBadge>}
                </UserName>
              </UserInfo>

              {showKick && (
                <KickButton onClick={() => onKick(user.name)}>✕</KickButton>
              )}
            </UserItem>
          );
        })}
      </UserList>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled("div")({
  width: "300px",
  height: "100%",
  backgroundColor: "#212121",
  borderRight: "1px solid #101010",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
});

const SidebarHeader = styled("div")({
  padding: "15px",
  backgroundColor: "#212121",
});

const Title = styled("h3")({
  color: "white",
  margin: "0 0 15px 0",
  fontSize: "16px",
});

const SearchInput = styled("input")({
  width: "100%",
  padding: "10px 15px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#101010",
  color: "white",
  fontSize: "14px",
  outline: "none",
  "&::placeholder": { color: "#777" },
  "&:focus": { backgroundColor: "#000" },
});

const UserList = styled("div")({
  flex: 1,
  overflowY: "auto",
});

const UserItem = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
  transition: "background 0.2s",
  "&:hover": { backgroundColor: "#2c2c2c" },
  justifyContent: "space-between",
});

const Avatar = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "12px",
  backgroundColor: "#007FFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
});

const UserInfo = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const UserName = styled("div")({
  color: "#fff",
  fontWeight: "500",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

const AdminBadge = styled("span")({
  fontSize: "12px",
});

const MeBadge = styled("span")({
  color: "#666",
  fontSize: "12px",
});

const KickButton = styled("button")({
  background: "none",
  border: "none",
  color: "#ff4d4d",
  fontSize: "18px",
  cursor: "pointer",
  padding: "5px",
  "&:hover": { color: "red" },
});
