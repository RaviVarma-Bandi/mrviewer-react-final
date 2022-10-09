import { AppBar, Box, Grid, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import mrviewer from '../../mrviewer.png'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function UserNavBar() {
    const navigate = useNavigate();
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
                        <Grid
                            justify="space-between"
                            container
                            spacing={24}
                        >
                            <Grid item>
                                <Typography type="title" color="inherit">
                                    <img src={mrviewer} alt="Logo" height={20} width={140}/>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <div>
                                    <Button raised color="accent" variant="text" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default UserNavBar