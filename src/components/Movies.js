import { Card, CardActions, CardMedia, Container, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as axiosConf from "../api/axiosConf";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function Movies() {
    const navigate = useNavigate();
    const style = makeStyles((s) => ({
        root: {
            flexGrow: 1,
            padding: s.spacing(2)
        }
    }));

    const [movies, setMovies] = useState([])

    const getAllMovies = async () => {
        try {
            const res = await axiosConf.movies();
            console.log(res.data)
            setMovies(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllMovies()
    }, [])

    return (
        <div>
            <Container>
                <div className={style.root}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {
                            movies.map((movie) => (
                                <Grid item xs={2}>
                                    <Card key={movie.movieId} sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            alt="movie poster"
                                            height="120"
                                            width="120"
                                            image={movie.moviePosterUrl}
                                        />
                                        <CardActions>
                                            <Button raised size="small" color="accent" variant="outlined" href={movie.movieUrl}target="_blank">Watch</Button>
                                            <Link to="">
                                                <ThumbUpAltIcon />
                                            </Link>
                                            <Link to="">
                                                <ThumbDownAltIcon />
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default Movies