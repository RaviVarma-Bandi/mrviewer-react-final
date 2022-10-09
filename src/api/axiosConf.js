import axios from "axios";
import axiosObject from "./bootapi";

const baseUrl = "http://localhost:8080";

export const login = async (val) => {
    const res = await axios({
        method : 'post',
        url : `${baseUrl}/user/login`,
        data : val
    });
    return res;
}

export const signup = async (val) => {
    const res = await axios({
        method : 'post',
        url : `${baseUrl}/user/register`,
        data : val
    });
    return res;
}

export const logout = () => {
    localStorage.removeItem('jwtToken');
}

export const movies = async () => {
    const res = await axiosObject({
        method : 'get',
        url : `${baseUrl}/user/movies`,
    });
    return res;
}

export const users = async () => {
    const res = await axiosObject({
        method : 'get',
        url : `${baseUrl}/admin/`,
    });
    return res;
}

export const getUserById = async (id) => {
    const res = await axiosObject({
        method : 'get',
        url : `${baseUrl}/admin/${id}`,
    })
    return res;
}

export const editUser = async (user, id) => {
    const res = await axiosObject({
        method : 'put',
        url : `${baseUrl}/admin/edit/${id}`,
        data : user,
    })
    return res;
}

export const moviesList = async () => {
    const res = await axiosObject({
        method : 'get',
        url : `${baseUrl}/admin/movies`,
    });
    return res;
}

export const addMovie = async (movies) => {
    const res = await axiosObject({
        method : 'post',
        url : `${baseUrl}/admin/movie/add`,
        data : movies,
    });
    return res;
}

export const getMovieById = async (id) => {
    const res = await axiosObject({
        method : 'get',
        url : `${baseUrl}/admin/movie/${id}`,
    });
    return res;
}

export const editMovie = async (movies, id) => {
    const res = await axiosObject({
        method: 'put',
        url : `${baseUrl}/admin/movie/update/${id}`,
        data : movies,
    });
    return res;
}

export const deleteMovie = async (id) => {
    const res = await axiosObject({
        method: 'delete',
        url: `${baseUrl}/admin/movie/delete/${id}`,
    });
    return res;
}

export const deleteUser = async (id) => {
    const res = await axiosObject({
        method: 'delete',
        url: `${baseUrl}/admin/delete/${id}`,
    });
    return res;
}