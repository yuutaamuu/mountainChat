import React, { VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { MountainChat } from "./MountainChat";

export const AuthedRoute: VFC = () => {
  return (
    <Route path="/" element={<Home />}>
      <Route path=":postId" element={<MountainChat />} />
    </Route>
  );
};
