import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { VFC } from "react";

type PROPS = {
  title: string;
  photo: string;
};

export const SingleChat: VFC<PROPS> = (props) => {
  const { title, photo } = props;
  return (
    <List sx={{ marginRight: "56px" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="" src={photo} />
        </ListItemAvatar>
        <ListItemText sx={{ padding: "0px 10px" }} primary={title} />
      </ListItem>
      <Divider sx={{ marginRight: "16px" }} variant="inset" component="li" />
    </List>
  );
};
