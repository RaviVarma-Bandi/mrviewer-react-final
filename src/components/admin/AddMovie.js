import { Card, CardContent, Container, Grid } from '@material-ui/core'
import * as axiosConf from "../../api/axiosConf";
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
    const navigate = useNavigate()
    const movie = useFormik({
        initialValues: {
            movieName: '',
            moviePosterUrl: '',
            movieUrl: '',
            movieCast: '',
            movieDescription: '',
            like : []
        },
        validationSchema: Yup.object({
            movieName: Yup.string().required('* required field'),
            moviePosterUrl: Yup.string().required('* required field'),
            movieUrl: Yup.string().required('* required field'),
            movieDescription: Yup.string().required('* required field'),
            movieCast: Yup.string().required('* required field')
        })
    })


    const handleSubmit = async (event) => {
        event.preventDefault()

        let movies = {
            movieName: movie.values.movieName,
            movieUrl: movie.values.movieUrl,
            moviePosterUrl: movie.values.moviePosterUrl,
            movieCast: movie.values.movieCast,
            movieDescription: movie.values.movieDescription,
        }

        let response;
        try {
            response = await axiosConf.addMovie(movies);
            if (response.status === 202) {
                navigate("/admin/movies");
            }
        } catch (error) {
            alert("Unable to add movie")
        }
        console.log("resData", response);
    }

        return (
            <div>
                <Container fluid>
                    <Grid xs={12}>
                        <Card className='bg-dark text-white my-2 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <CardContent className='d-flex flex-column align-items-center mx-auto w-100'>
                                <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
                                <p className="text-white-50 mb-5">Add a new movie</p>

                                <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center mx-auto w-100'>
                                    <div>
                                        <label>Movie Name</label>
                                        <br />
                                        <input class="rounded"
                                            id="movieName"
                                            name="movieName"
                                            type="text"
                                            placeholder='Enter Movie Name'
                                            {...movie.getFieldProps('movieName')}
                                        />
                                        {
                                            movie.touched.movieName && movie.errors.movieName ?
                                                (<div><small class="text-danger">{movie.errors.movieName}</small></div>) : null
                                        }
                                    </div>

                                    <div>
                                        <label>Movie Url</label>
                                        <br />
                                        <input class="rounded"
                                            id="movieUrl"
                                            name="movieUrl"
                                            type="text"
                                            placeholder='Enter movie link'
                                            {...movie.getFieldProps('movieUrl')}
                                        />
                                        {
                                            movie.touched.movieUrl && movie.errors.movieUrl ?
                                                (<div><small class="text-danger">{movie.errors.movieUrl}</small></div>) : null
                                        }
                                    </div>
                                    <div>
                                        <label>Movie Poster Url</label>
                                        <br />
                                        <input class="rounded"
                                            id="moviePosterUrl"
                                            name="moviePosterUrl"
                                            type="moviePosterUrl"
                                            placeholder='Enter poster link'
                                            {...movie.getFieldProps('moviePosterUrl')}
                                        />
                                        {
                                            movie.touched.moviePosterUrl && movie.errors.moviePosterUrl ?
                                                (<div><small class="text-danger">{movie.errors.moviePosterUrl}</small></div>) : null
                                        }
                                    </div>

                                    <div>
                                        <label>Movie Cast</label>
                                        <br />
                                        <input class="rounded"
                                            id="movieCast"
                                            name="movieCast"
                                            type="movieCast"
                                            placeholder='Enter movie cast'
                                            {...movie.getFieldProps('movieCast')}
                                        />
                                        {
                                            movie.touched.movieCast && movie.errors.movieCast ?
                                                (<div><small class="text-danger">{movie.errors.movieCast}</small></div>) : null
                                        }
                                    </div>

                                    <div>
                                        <label>Movie Description</label>
                                        <br />
                                        <input class="rounded"
                                            id="movieDescription"
                                            name="movieDescription"
                                            type="movieDescription"
                                            placeholder='Enter description'
                                            {...movie.getFieldProps('movieDescription')}
                                        />
                                        {
                                            movie.touched.movieDescription && movie.errors.movieDescription ?
                                                (<div><small class="text-danger">{movie.errors.movieDescription}</small></div>) : null
                                        }
                                    </div>
                                    <button type="submit" class="btn btn-success btn-md mx-3 mt-3">Submit</button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
            </div>
        )
    }

    export default AddMovie