import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);
    if (isDisabled) e.preventDefault();
  };

  return (
    <BackgroundBox>
      <StyledContainer maxWidth="xs">
        <FormCard elevation={10}>
          <Heading component="h1" variant="h4">
            Welcome
          </Heading>

          <SubHeading variant="body2">
            Enter your details to join the chat
          </SubHeading>

          <FormBox component="form" autoComplete="off">
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name={NAME}
              value={values[NAME]}
              onChange={handleChange}
              autoFocus
            />

            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={ROOM}
              label="Room Name"
              id="room"
              value={values[ROOM]}
              onChange={handleChange}
            />

            <StyledLink
              to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
              onClick={handleClick}
            >
              <SubmitButton
                fullWidth
                variant="contained"
                endIcon={<LoginIcon />}
              >
                Sign In
              </SubmitButton>
            </StyledLink>
          </FormBox>
        </FormCard>
      </StyledContainer>
    </BackgroundBox>
  );
};

export default Main;


const BackgroundBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", 
  padding: "20px",
});

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
});

const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)", 
  backgroundColor: "rgba(255, 255, 255, 0.95)", 
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const Heading = styled(Typography)({
  marginBottom: "24px",
  fontWeight: 700,
  color: "#1565c0",
});

const SubHeading = styled(Typography)({
  marginBottom: "32px",
  color: "#757575", 
});

const FormBox = styled(Box)({
  width: "100%",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1565c0",
    },
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  width: "100%",
  display: "block",
  marginTop: "16px",
});

const SubmitButton = styled(Button)({
  padding: "12px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  transition: "transform 0.2s",
  textTransform: "none",
  "&:hover": {
    transform: "scale(1.02)",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
});
