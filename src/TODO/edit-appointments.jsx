import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

export function EditAppointment() {
    let params = useParams();
    let navigate = useNavigate();

    const [appointment, setAppointment] = useState({ id: 0, title: '', date: '', userid: '' });

    const formik = useFormik({
        initialValues: {
            id: appointment.id,
            title: appointment.title,
            date: appointment.date,
            userid: appointment.userid
        },
        onSubmit: (appointment) => {
            axios.put(`https://to-do-json-server.onrender.com/appoinments/${params.id}`, appointment)
                .then(() => {
                    console.log('saved');
                })
            navigate('/dashborad');
        },
        enableReinitialize: true
    })

    useEffect(() => {
        axios.get(`https://to-do-json-server.onrender.com/appoinments/${params.id}`)
            .then(response => {
                setAppointment(response.data);
            })
    }, [params.id])

    return (
        <div className="container bg-light w-50 p-4">
            <h3>Edit Appointment</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} value={formik.values.title} className="form-control" name="title" /></dd>
                    <dt>Date</dt>
                    <dd><input type="date" onChange={formik.handleChange} value={formik.values.date} name="date"/></dd>
                </dl>
                <button className="btn btn-success mx-2">Save</button>
                <Link to="/dashborad" className="btn btn-warning">Cancel</Link>
            </form>
        </div>
    )
}