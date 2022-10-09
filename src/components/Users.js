import { Card, CardContent, Container, Grid, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as axiosConf from "../api/axiosConf";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useNavigate } from 'react-router-dom';


function User() {
    const editUserUrl = "/edit";
    const navigate=useNavigate();
    const [users,setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const res = await axiosConf.users();
            console.log(res.data)
            setUsers(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = (id) => {
        navigate("/admin/edit/"+id);
    }

    const deleteUser = async (id) => {
        try{
            if(window.confirm('Are you sure you want to delete?')){
                await axiosConf.deleteUser(id);
                window.location.reload();
                alert('Deleted user');
            }
        }catch(error){
            console.log("delete error: ",error);
            alert("Unable to delete user, try again")
        }
    }

    useEffect(()=>{
        getAllUsers()
    },[])

    return (
        <div>
            <Container fluid>
                <Card className='bg-secondary text-white-50 my-2 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                    <CardContent className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        <h2 className="fw-bold mb-2 text-uppercase">MRVIEWER</h2>
                        <p className="text-white-50 mb-5">User detials</p>
                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>Actions</TableCell>
                                    <TableCell align="center">User_Id</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Mobile_Number</TableCell>
                                    <TableCell align="center">Verified_On</TableCell>
                                    <TableCell align="center">Register_On</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 3 } }}
                                    >
                                        <TableCell colSpan={2}>
                                            <IconButton color='primary' onClick={() => updateUser(user.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color='primary' onClick={() => deleteUser(user.id)}>
                                                <DeleteForeverRoundedIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {user.email}
                                        </TableCell>
                                        <TableCell align="right">{user.mobileNumber}</TableCell>
                                        <TableCell align="right">{user.verifiedOn}</TableCell>
                                        <TableCell align="right">{user.registeredOn}</TableCell>
                                        <TableCell align="right">{user.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default User