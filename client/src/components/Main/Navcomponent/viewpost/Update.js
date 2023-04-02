import React from 'react'
import axios from 'axios';
import {
    Button,
    CardContent,
    Card,
    Grid,
    TextField,
    CardActions,
} from "@mui/material";
import { useFormik } from "formik";
import { useParams, useNavigate } from 'react-router-dom';
import BASEURL from '../../../Baseurl';

const Update = () => {
    const { id: user } = useParams()
    const navigate = useNavigate()
    const updateBlog = async () => {
        let res = await axios.put(`${BASEURL}/api/userpost/update`, { userid: user, data: values })
        if (res.status === 202) {
            navigate(`/viewpost/${user}`)
        }
    }
    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            image: "",
            title: "",
            discription: "",
            PostedBy: "",
            categoary: ""
        },
        onSubmit: updateBlog,
    });

    return (
        <>
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <TextField
                                    value={values.image}
                                    onChange={handleChange}
                                    name="image"
                                    type="text"
                                    variant="outlined"
                                    label="image url"
                                    fullWidth
                                />
                            </Grid>{" "}
                            <Grid xs={12} item>
                                <TextField
                                    value={values.title}
                                    onChange={handleChange}
                                    name="title"
                                    type="text"
                                    variant="outlined"
                                    label="title"
                                    fullWidth
                                />
                            </Grid>{" "}
                            <Grid xs={12} item>
                                <TextField
                                    value={values.discription}
                                    onChange={handleChange}
                                    name="discription"
                                    label="Discription"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    value={values.category}
                                    onChange={handleChange}
                                    name="categoary"
                                    type="text"
                                    variant="outlined"
                                    label="Categoary"
                                    fullWidth
                                />
                            </Grid>{" "}
                            <Grid xs={12} item>
                                <TextField
                                    value={values.PostedBy}
                                    onChange={handleChange}
                                    name="PostedBy"
                                    label="PostedBy"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>{" "}
                    </CardContent>{" "}
                    <CardActions>
                        <Grid xs={12} item>
                            <Button variant="contained" type="submit">
                                CREATE POST{" "}
                            </Button>{" "}
                        </Grid>{" "}
                    </CardActions>{" "}
                </form>{" "}
            </Card>
        </>
    )
}

export default Update