import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProfileSidebar = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <>
      <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="xs">
        <ProfileHeader>
          <DialogTitle>{user.name}</DialogTitle>
          <IconButton onClick={onClose} style={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </ProfileHeader>

        <ProfileContent dividers>
          <BigAvatar>
            {user.avatar ? (
              <BigAvatarImg src={user.avatar} alt={user.name} />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </BigAvatar>

          <InfoRow>
            <strong>Username:</strong> {user.username || "N/A"}
          </InfoRow>
          <InfoRow>
            <strong>Email:</strong> {user.email || "N/A"}
          </InfoRow>
          <InfoRow>
            <strong>Phone:</strong> {user.phone || "N/A"}
          </InfoRow>
          <InfoRow>
            <strong>Website:</strong> {user.website || "N/A"}
          </InfoRow>

          <Divider />

          <Typography
            variant="h6"
            style={{ marginTop: 10, fontSize: 14, color: "#aaa" }}
          >
            Company
          </Typography>
          <InfoRow>
            <strong>Name:</strong> {user.company?.name || "N/A"}
          </InfoRow>
          <InfoRow>
            <strong>Phrase:</strong> <i>{user.company?.catchPhrase}</i>
          </InfoRow>

          <Divider />

          <Typography
            variant="h6"
            style={{ marginTop: 10, fontSize: 14, color: "#aaa" }}
          >
            Address
          </Typography>
          <InfoRow>
            {user.address?.streetA}, {user.address?.city}
          </InfoRow>
          <InfoRow>{user.address?.country}</InfoRow>
        </ProfileContent>
      </Dialog>
    </>
  );
};

export default ProfileSidebar;

const ProfileHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#1976d2",
  color: "white",
  paddingRight: "10px",
});

const ProfileContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  backgroundColor: "#f5f5f5",
});

const BigAvatar = styled("div")({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  alignSelf: "center",
  marginBottom: "15px",
  border: "3px solid #1976d2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#007FFF",
  color: "white",
  fontSize: "30px",
  fontWeight: "bold",
  overflow: "hidden",
});

const BigAvatarImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const InfoRow = styled("div")({
  fontSize: "14px",
  color: "#333",
  wordBreak: "break-all",
});

const Divider = styled("hr")({
  width: "100%",
  border: "0",
  borderTop: "1px solid #ddd",
  margin: "10px 0",
});
