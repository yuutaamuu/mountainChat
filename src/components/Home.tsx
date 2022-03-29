import { Box } from "@mui/system";
import axios from "axios";
import { useCallback, useEffect, useState, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardLayout } from "./CardLayout";
import { Header } from "./Header";
import { selectmountain, getData } from "../features/mountainSlice";

type MOUNTAIN = {
  id: number;
  name: string;
  nameKana: string;
  area: string;
  prefectures: string[];
  elevation: number;
  location: {
    latitude: number;
    longitude: number;
    gsiUrl: string;
  };
  tags: string[];
};

type MOUNTAINS = {
  mountains: MOUNTAIN[];
};

export const Home: VFC = () => {
  const [mountains, setMountains] = useState<MOUNTAIN[]>([]);
  const dispatch = useDispatch();
  const mountain = useSelector(selectmountain);

  const getMountainDatas = useCallback(async () => {
    await axios
      .get<MOUNTAINS>("https://mountix.codemountains.org/api/v1/mountains")
      .then((res) => {
        setMountains(res.data.mountains);
        dispatch(getData(res.data.mountains));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMountainDatas();
  }, []);

  return (
    <div>
      <Header />
      <Box
        sx={{
          width: 960,
          height: "auto",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {mountains.map((mountain) => (
          <CardLayout key={mountain.id} mountain={mountain} />
        ))}
      </Box>
    </div>
  );
};
