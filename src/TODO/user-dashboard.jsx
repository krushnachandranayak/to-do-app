import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserDashboard() {
    const [cookies, removeCookie] = useCookies(["userid"]);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([{id: 0, title: '', date: '', userid: ''}]);

    const userId = cookies.userid; // Extracted for cleaner dependencies

    // Fetch Appointments
    const fetchAppointments = useCallback(() => {
        if (!userId) return;

        axios
            .get(`https://to-do-json-server.onrender.com/appoinments`)
            .then((response) => {
                let userAppointments = response.data.filter(
                    (appointment) => appointment.userid === userId
                );
                setAppointments(userAppointments);
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    }, [userId]);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // Handle Signout
    function handleSignout() {
        removeCookie("userid");
        navigate("/");
    }

    return (
        <div className="container bg-light w-50 p-4">
            <h5 className="d-flex justify-content-between">
                <span>{userId} - </span>
                <span>Dashboard</span>
                <span><button className="btn btn-danger" onClick={handleSignout}>Signout</button></span>
            </h5>
            <Link to="/add-appointment" className="btn btn-success bi bi-calendar-event">Add Appointments</Link>
            
            <div className="mt-2 overflow-auto" style={{ height: '300px' }}>
                {appointments.length > 0 ? (
                    appointments.map(appointment => (
                        <Alert className="m-3" key={appointment.id}>
                            <AlertTitle>{appointment.title}</AlertTitle>
                            <p className="text-primary">{appointment.date}</p>
                            <div>
                                <Link className="bi bi-pen-fill btn btn-warning" 
                                      to={`/edit-appointment/${appointment.id}`} />
                                <Link className="bi bi-trash-fill btn btn-danger mx-2" 
                                      to={`/delete-appointment/${appointment.id}`} />
                            </div>
                        </Alert>
                    ))
                ) : (
                    <p className="text-muted text-center">No appointments found</p>
                )}
            </div>
        </div>
    );
}
