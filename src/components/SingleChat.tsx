import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, VFC } from "react";

type PROPS = {
  title: string;
  photo: string;
  time: Date;
};

export const SingleChat: VFC<PROPS> = (props) => {
  const { title, photo, time } = props;
  const [newTime, setNewTime] = useState("");
  const chattime = new Date(time);

  const formattime = `${chattime.getFullYear()}/${
    chattime.getMonth() + 1
  }/${chattime.getDate()} ${chattime.getHours()}:${chattime.getMinutes()}`;
  useEffect(() => {
    setNewTime(formattime);
  }, []);

  console.log(newTime);

  return (
    <List sx={{ marginRight: "56px" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="" src={photo} />
        </ListItemAvatar>
        <ListItemText sx={{ padding: "0px 10px" }} primary={title} />
      </ListItem>
      <Typography sx={{ padding: "0px 72px" }}>{newTime}</Typography>
      <Divider sx={{ marginRight: "16px" }} variant="inset" component="li" />
    </List>
  );
};
