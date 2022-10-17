import {  Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as axiosConf from "../api/axiosConf";
import MovieCard from './MovieCard';

function Movies() {
    const [movies, setMovies] = useState([])
    const user = JSON.parse(localStorage.getItem("user"));

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
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {
                    movies.map((movie) => (
                        <MovieCard movie={movie} user={user}/>
                    ))
                }
            </Grid>
        </div>
    )
}

export default Movies