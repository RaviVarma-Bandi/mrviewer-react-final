import { Card, CardActions, CardHeader, CardMedia, Container, Grid, IconButton, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as axiosConf from "../../api/axiosConf";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function MoviesList() {
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
            const res = await axiosConf.moviesList();
            console.log(res.data)
            setMovies(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const addMovie = () => {
        navigate("/admin/movie/add")
    }

    const updateMovie = (id) => {
        navigate("/admin/movie/update/"+id)
    }

    const deleteMovie = async (id) => {
        try{
            if(window.confirm('Are you sure you want to delete?')){
                await axiosConf.deleteMovie(id);
                window.location.reload();
                alert('Deleted movie');
            }
        }catch(error){
            console.log("delete error: ",error);
            alert("Unable to delete movie, try again")
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
                                        <CardHeader action={[
                                            <IconButton onClick={() => addMovie()}>
                                                <AddCircleIcon />
                                            </IconButton>,
                                            <IconButton onClick={() => updateMovie(movie.movieId)}>
                                                <EditIcon />
                                            </IconButton>,    
                                            <IconButton onClick={() => deleteMovie(movie.movieId)}>
                                                <DeleteForeverRoundedIcon />
                                            </IconButton>
                                        ]}/>
                                        <CardMedia
                                            component="img"
                                            alt="movie poster"
                                            height="120"
                                            width="120"
                                            image={movie.moviePosterUrl}
                                        />
                                        <CardActions>
                                            <Button raised size="small" color="accent" variant="outlined" href={movie.movieUrl} target="_blank">Watch</Button>
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

export default MoviesList