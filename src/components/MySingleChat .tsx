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

export const MySingleChat: VFC<PROPS> = (props) => {
  const { title, photo, time } = props;
  const [newTime, setNewTime] = useState("");
  const chattime = new Date(time);

  const formattime = `${chattime.getFullYear()}/${
    chattime.getMonth() + 1
  }/${chattime.getDate()} ${chattime.getHours()}:${chattime.getMinutes()}`;
  useEffect(() => {
    setNewTime(formattime);
  }, []);

  return (
    <List sx={{ marginLeft: "56px" }}>
      <ListItem alignItems="flex-start">
        <ListItemText sx={{ padding: "0px 10px" }} primary={title} />
        <ListItemAvatar>
          <Avatar alt="" src={photo} />
        </ListItemAvatar>
      </ListItem>
      <Typography sx={{ padding: "0px 16px" }}>{newTime}</Typography>
      <Divider
        sx={{ marginLeft: "16px", marginRight: "72px" }}
        variant="inset"
        component="li"
      />
    </List>
  );
};
