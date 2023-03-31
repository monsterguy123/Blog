import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Viewpost = () => {
    const [data, setData] = useState({})
    const { id } = useParams()
    const Id = localStorage.getItem('userId')
    const navigate = useNavigate()
    useEffect(() => {
        return axios.post("http://localhost:8080/api/id", { id })
            .then(res => setData(res.data.data))
    }, [id]);
    const image = data.image
    const title = data.title;
    const discription = data.discription;
    const by = data.PostedBy
    const user = data.user

    const DeletePost = async () => {
        let res = await axios.put("http://localhost:8080/api/id", { userid: id })
        if (res.status === 201) {
            navigate('/')
        }
    }

    return (
        <div>
            <Card style={{ width: 1400, position: 'relative', left: 70, top: 30 }}>
                {
                    user === Id ?
                        <CardActions>
                            <Link to={`/viewpost/update/${id}`}><Button>Update</Button></Link>
                            <Button onClick={() => DeletePost()}>Delete</Button>
                        </CardActions>
                        :
                        null
                }
                <CardContent style={{ border: "4px solid green", height: "100px", width: 1200, marginLeft: 100 }}>
                    <Typography variant='h2'>{title}</Typography>
                    <Typography variant='h5' position={'relative'} left={1000}>by {by}</Typography>
                </CardContent>
                <CardMedia
                    style={{ border: "2px solid black", width: 1000, marginLeft: 200 }}
                    height={500}
                    component={"img"}
                    image={image}
                />
                <CardContent style={{ border: "4px solid blue", height: 400, maxHeight: 1000 }}>
                    <Typography variant='h5'>{discription}</Typography>
                </CardContent>

            </Card>
            )

        </div>
    )
}

export default Viewpost