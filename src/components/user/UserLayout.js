import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import UserNavBar from './UserNavBar';


function UserLayout() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user === null || user.role !== "USER") {
            toast.error("Please Login to view this page", {
                toastId: "loginError"
            })
            navigate("/login");
        }
        else{
            toast.success(`Hello, ${user.username}`, {
                toastId: "WelcomeMessage"
            });
        }
    }, [])

    return (
        <div>
            {
                user && 
                <div>
                    <UserNavBar />
                    <Outlet/>
                </div>
            }
        </div>
    )
}

export default UserLayout