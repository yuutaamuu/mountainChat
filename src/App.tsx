import React, { useEffect, VFC } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectuser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { Home } from "./components/Home";
import { Auth } from "./components/Auth";
import { MountainChat } from "./components/MountainChat";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { selectmountain } from "./features/mountainSlice";
import { AuthedRoute } from "./components/AuthedRoute";

const App: VFC = () => {
  const user = useSelector(selectuser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user.uid ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path=":postId" element={<MountainChat />} />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
