import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useCallback, useState, VFC } from "react";
import { db, firebaseApp } from "../firebase";
import {
  addDoc,
  collection,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectuser } from "../features/userSlice";

type PROPS = {
  id: number | undefined;
  getData: (id: number) => void;
};

export const InputChat: VFC<PROPS> = (props) => {
  const { id, getData } = props;
  const user = useSelector(selectuser);
  const [input, setInput] = useState("");
  const [dateTime, setDateTime] = useState("");

  const onChangeChat = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const sendChat = async (target: string) => {
    if (id && input) {
      // target.preventDefault();
      const chatCollection = await addDoc(
        collection(db, `chats/${id}`, "message"),
        {
          title: target,
          uid: user.uid,
          photo: user.photoUrl,
          name: user.displayName,
          timestamp: serverTimestamp(),
        }
      );
      setInput("");
      getData(id);
    }
  };

  return (
    <Box
      sx={{
        bottom: 0,
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
      }}
    >
      <Box sx={{ width: "75%", boxSizing: "border-box" }}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={(e) => onChangeChat(e)}
        />
      </Box>
      <Box sx={{ width: "25%" }}>
        <Button
          sx={{ width: "100%", boxSizing: "border-box" }}
          variant="contained"
          size="medium"
          onClick={() => sendChat(input)}
        >
          送信
        </Button>
      </Box>
    </Box>
  );
};
