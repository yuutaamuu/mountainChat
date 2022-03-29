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

export const MySingleChat: VFC<PROPS> = (props) => {
  const { title, photo } = props;
  return (
    <List sx={{ marginLeft: "56px" }}>
      <ListItem alignItems="flex-start">
        <ListItemText sx={{ padding: "0px 10px" }} primary={title} />
        <ListItemAvatar>
          <Avatar alt="" src={photo} />
        </ListItemAvatar>
      </ListItem>
      <Divider
        sx={{ marginLeft: "16px", marginRight: "72px" }}
        variant="inset"
        component="li"
      />
    </List>
  );
};
