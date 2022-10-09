import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as axiosConf from "../../api/axiosConf";
import EditUser from './EditUser';

function GetUser(props) {
    const [user, setUser] = useState([]);
    const param = useParams();

    const getUserById = async () => {
        try{
            const res = await axiosConf.getUserById(param.id);
            if(res !== null){
                setUser(JSON.parse(JSON.stringify(res.data)));
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getUserById();
    }, [])

  return (
    <div>
        <EditUser data={user} getUserById = {getUserById}/>
    </div>
  )
}

export default GetUser