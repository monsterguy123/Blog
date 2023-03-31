import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import Posts from './profile/posts'
import axios from 'axios'

const UserProfile = () => {
  const [data, setData] = useState({})
  const id = localStorage.getItem('userId')
  useEffect(() => {
    return axios.get(`http://localhost:8080/api/users/${id}`)
      .then(res => setData(res.data.data))
  }, [])

  return (
    <>
      <Navbar />
      <Card style={{ height: 600, width: 1500, margin: "auto", marginTop: 50, borderRadius: "4px solid black" }}>
        <CardContent style={{ marginTop: 120, marginLeft: 50 }}>
          <Avatar
            style={{ border: "2px solid blue", height: 200, width: 200 }}
            alt="user"
            src={data.image}
          />
          <Typography marginLeft={6} marginTop={2}>{data.firstName + " " + data.lastName}</Typography>
        </CardContent>
        <CardContent style={{ position: "relative", top: -370, left: 300, height: 500, border: "4px solid green", width: 1100 }}>
          {
            <Posts />
          }
        </CardContent>
      </Card >
    </>
  )
}

export default UserProfile