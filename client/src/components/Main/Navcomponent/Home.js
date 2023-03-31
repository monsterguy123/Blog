import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CardContent,
  Card,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import { Elipses } from "..";

const Home = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    return axios.get(`http://localhost:8080/api/userpost`)
      .then((res) => setData(res.data.data));
  }, []);

  return (
    <>
      <Navbar />
      {data.map((data, index) => {
        return (
          <Link key={index} to={`/viewpost/${data._id}`}><Card key={index} style={{ width: 400, float: "left", margin: "50px 50px" }}>
            <CardMedia
              height={200}
              component={"img"}
              image={data.image}
              alt="error"
            />
            <CardContent key={index} width={200}>
              <Typography>{Elipses(data.title, 20)}</Typography>{" "}
              <Typography>{data.categoary}</Typography>{" "}
              <Typography>{Elipses(data.discription, 100)}</Typography>{" "}
            </CardContent>{" "}
          </Card>
          </Link>
        );
      })}{" "}</>
  )
}

export default Home