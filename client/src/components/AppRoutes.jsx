import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import Main from "./Main";

const AppRourtes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRourtes;
