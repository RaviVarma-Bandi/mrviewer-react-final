import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import AdminNavBar from './AdminNavBar';


function AdminLayout() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user === null || user.role !== "ADMIN") {
            toast.error("Please Login to view this page", {
                toastId: "loginError1"
            })
            navigate("/login");
        }
        else{
            toast.success(`Hello, ${user.username}`, {
                toastId: "WelcomeMessage1"
            });
        }
    }, [])

    return (
        <div>
            {
                user && 
                <div>
                    <AdminNavBar />
                    <Outlet/>
                </div>
            }
        </div>
    )
}

export default AdminLayout