import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DeleteAppointment() {
    let param=useParams();
    let navigate=useNavigate();
    const [appointment, setAppointment] = useState({id:0, title:'', date:'', userid:''});
    useEffect(()=>{
        axios.get(`https://to-do-json-server.onrender.com/appoinments/${param.id}`)
        .then(response=>{
             setAppointment(response.data)
        })
    },[param.id])
    function handleDeleteClick(){
        axios.delete(`https://to-do-json-server.onrender.com/appoinments/${param.id}`)
        .then(()=>{
            console.log("Deleted");
        })
      navigate('/dashboard');
    }
    return (
        <div className="container bg-light w-50 p-4">
            <h3>Delete Appointment</h3>
            <h5 className="my-3">Are you sure want to delete? <br /> <span className="text-danger my-3">{appointment.title}</span> </h5>
            <button onClick={handleDeleteClick} className="btn btn-danger mx-2">Yes</button>
            <Link to="/dashboard" className="btn btn-warning">Cancel</Link>
        </div>
    )
}