import { Card, CardActions, CardMedia, Container, Grid, IconButton, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as axiosConf from "../api/axiosConf";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { toast } from 'react-toastify';


export default function MovieCard(props) {
    const [changeLikeColor, setChangeLikeColor] = useState();
    const [changeDislikeColor, setChangeDislikeColor] = useState();
    const movie = props.movie;
    const user = props.user;

    const handleLikeColor = async (movieId, movieName) => {
        setChangeLikeColor("primary")
        setChangeDislikeColor("dark")

        const likeObject = {
            movie : movie,
            user : user
        }

        try{
            const res = await axiosConf.likeMovie(user.id, movieId, likeObject);
            if(res.status === 200){
                toast.success(movieName + "liked by you")
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleDislikeColor = async () => {
        setChangeLikeColor("dark")
        setChangeDislikeColor("primary")
    }

    return (
        <>
            <Grid item xs={2}>
                <Card key={movie.movieId} sx={{ width: 345 }}>
                    <CardMedia
                        component="img"
                        alt="movie poster"
                        height="120"
                        width="120"
                        image={movie.moviePosterUrl}
                    />
                    <CardActions>
                        <Button raised size="small" color="accent" variant="outlined" href={movie.movieUrl} target="_blank">Watch</Button>
                        <IconButton onClick={() => handleLikeColor(movie.movieId)}>
                            <ThumbUpAltIcon color={changeLikeColor} />
                        </IconButton>
                        <IconButton onClick={() => handleDislikeColor()}>
                            <ThumbDownAltIcon color={changeDislikeColor} />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}
