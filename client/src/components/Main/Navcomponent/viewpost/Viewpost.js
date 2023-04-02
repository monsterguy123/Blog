import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography,TextField, Grid, Avatar, } from '@mui/material'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASEURL from '../../../Baseurl'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';

const Viewpost = () => {
    const [data, setData] = useState({})
    const [comment, setComment] = useState('')
    const [User , setUser] = useState([])

    const { id } = useParams()
    const Id = localStorage.getItem('userId')
    const navigate = useNavigate()
   
    useEffect(() => {
        return axios.get(`${BASEURL}/api/id/${id}`)
            .then(res => setUser(res.data))
    });

    useEffect(() => {
        return axios.post(`${BASEURL}/api/id`, { id })
            .then(res => setData(res.data.data))
    }, [id]);
    const image = data.image
    const title = data.title;
    const discription = data.discription;
    const by = data.PostedBy
    const user = data.user

    const DeletePost = async () => {
        let res = await axios.put(`${BASEURL}/api/id`, { userid: id })
        if (res.status === 201) {
            navigate('/')
        }
    }
    const Sendcomment = async () => {
        setComment('')
         await axios.post(`${BASEURL}/api/userpost/comment`,{comment,user:Id,post:id,date:moment().format('MMMM Do YYYY, h:mm:ss a'),})
    }
   
    const DeleteComment = async (iD) => {
         await axios.put(`${BASEURL}/api/userpost/comment/${iD}`)
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
                    <Typography  variant='h5' position={'relative'} left={900}>by {by}</Typography>
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

{/* comment box */}

<CardContent>
    <div>
        <Typography variant='h3'>COMMENTS : </Typography>
        <div style={{ height:400,border:"4px solid green",overflow:"auto"}}>
            {User.map((data,index)=>{
               return (
                <div key={index}>
          <Grid key={index} style={{marginTop:10,marginLeft:30,marginBottom:20,boxShadow:"1px 1px 2px blue",width:1300}} container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={data.image}/>
          </Grid>
          <Grid justifyContent="left" item xs maxWidth>
          <DeleteIcon onClick={()=>DeleteComment(data._id)} style={{marginLeft:1190}}/>
            <h4 style={{ marginTop: -30, textAlign: "left" }}>{data.name}</h4>
            <p  style={{ textAlign: "left",wordWrap:'break-word',width:1200 }}>
              {data.comment}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted {data.date}
            </p>
          </Grid>
        </Grid>
    
                </div>
               )
            })}
             </div>
                    </div>
                    <div>
                     <TextField value={comment} type='text' style={{marginLeft:20,width:1200,height:400}} onChange={(e)=> setComment(e.target.value)}/>
                     <Button onClick={()=> Sendcomment()}  variant='contained' style={{width:120,height:55}}>SEND</Button>
                    </div>
                </CardContent>
            </Card>
            )

        </div>
    )
}

export default Viewpost