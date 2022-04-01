import { Box, Container, Typography } from "@mui/material";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import firebase, { FirebaseApp } from "firebase/app";
import { useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectmountain } from "../features/mountainSlice";
import { db } from "../firebase";
import { Header } from "./Header";
import { InputChat } from "./InputChat";
import { SingleChat } from "./SingleChat";
import { MySingleChat } from "./MySingleChat ";
import { selectuser } from "../features/userSlice";

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

type singleMOUNTAIN = {
  mountain: MOUNTAIN;
};

type DBDATA = {
  name: string;
  photo: string;
  title: string;
  uid: string;
  timestamp: string;
};

export const MountainChat: VFC = () => {
  const [datas, setDatas] = useState<DBDATA[]>([]);
  const [number, setNumber] = useState<number[]>([0]);
  const [singleData, setSingleData] = useState<MOUNTAIN | undefined>();
  const mountains = useSelector(selectmountain);
  const user = useSelector(selectuser);
  const params = useParams();

  const getData = async (num: number) => {
    const dataRef = collection(db, `chats/${num}`, "message");
    const q = query(dataRef, orderBy("timestamp"));

    const querySnapshot = await getDocs(q);
    const result: any[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      // const newChat = [...datas, doc.data() as DBDATA];
      // console.log(newChat);
      // setDatas(newChat);
      const data = {
        name: doc.data().name,
        photo: doc.data().photo,
        title: doc.data().title,
        uid: doc.data().uid,
        time: doc.data().time,
      };
      console.log(data);
      result.push(data);
    });
    setDatas(result);
  };

  const getArr = () => {
    const arr = [1, 2, 3];
    arr.map((a) => {
      const newArr = [...number, a];
      setNumber(newArr);
    });
  };

  useEffect(() => {
    let num = Number(params.postId) - 1;
    if (mountains) {
      setSingleData(mountains[num]);
      getData(Number(params.postId));
      getArr();
    }
  }, []);

  console.log(datas);
  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        sx={{ boxSizing: "border-box", height: "85vh", marginTop: "16px" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            height: "auto",
            width: "100%",
          }}
        >
          <Typography sx={{ padding: "16px 32px", fontSize: "1.6em" }}>
            {singleData?.name}
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{
            backgroundColor: "#fafafa",
            height: "90%",
            overflow: "auto",
            overflowY: "scrool",
            padding: "16px 0",
            boxSizing: "border-box",
            width: "100%",
            overflowWrap: "break-word",
          }}
        >
          {datas.map((data, index) =>
            data.name === user.displayName ? (
              <MySingleChat key={index} title={data.title} photo={data.photo} />
            ) : (
              <SingleChat key={index} title={data.title} photo={data.photo} />
            )
          )}
        </Box>
        <InputChat id={singleData?.id} getData={getData} />
      </Container>
    </>
  );
};
