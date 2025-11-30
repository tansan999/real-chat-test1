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
      <Container
        maxWidth="xs"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormCard elevation={10}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, fontWeight: 700, color: "#1565c0" }}
          >
            Welcome
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            Enter your details to join the chat
          </Typography>

          <Box component="form" sx={{ width: "100%" }} autoComplete="off">
            <TextField
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
              sx={{ mb: 2 }}
            />

            <TextField
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

            <Link
              to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
              style={{
                textDecoration: "none",
                // pointerEvents: handleClick ? "none" : "auto",
              }}
              onClick={handleClick}
            >
              <StyledButton
                fullWidth
                variant="contained"
                // disabled={handleClick}
                endIcon={<LoginIcon />}
              >
                Sign In
              </StyledButton>
            </Link>
          </Box>
        </FormCard>
      </Container>
    </BackgroundBox>
  );
};

export default Main;

// --- STYLES ---

// Красивый фон с градиентом
const BackgroundBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Синий градиент
  padding: "20px",
});

// Карточка формы
const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)", // Глубокая тень
  backgroundColor: "rgba(255, 255, 255, 0.95)", // Слегка прозрачный белый фон
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledButton = styled(Button)({
  marginTop: "20px",
  padding: "12px",
  fontSize: "1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
});
