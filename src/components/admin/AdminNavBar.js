import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import mrviewer from '../../mrviewer.png'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AdminNavBar() {
    const navigate = useNavigate();
    const handleMovies = () => {
        navigate("/admin/movies")
    }

    const handleUsers = () => {
        navigate("/admin/")
    }
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        setTimeout(() => {
            toast.success("Logged out successfully");
        }, 1000);
        navigate("/");
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' color="transparent" elevation={0}>
                    <Toolbar>
                        <Grid item>
                            <Typography type="title" color="inherit">
                                <img src={mrviewer} alt="Logo" height={20} width={140} />
                            </Typography>
                        </Grid>
                        <Grid
                            sx={{ flexGrow: 1 }}
                            justify="space-between"
                            container
                            spacing={24}
                        >
                            <Grid item>
                                <div>
                                    <Button className="btn mx-5" raised color="accent" variant="text" onClick={handleUsers}>
                                        <strong>USERS</strong>
                                    </Button>
                                    <Button raised className="btn" color="accent" variant="text" onClick={handleMovies}>
                                        <strong>MOVIES</strong>
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <div>
                                <Button raised color="accent" variant="text" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default AdminNavBar