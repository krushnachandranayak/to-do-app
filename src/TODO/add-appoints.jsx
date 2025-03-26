import axios from "axios"
import { useFormik } from "formik"
import {useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"; 

export function AddAppointment() {
    let navigate=useNavigate();
    const[cookies,setCookie,removeCookie]=useCookies(['userid'])
    const formik=useFormik({
        initialValues:{
            title:'',
            date:null,
            userid:cookies['userid']
        },
        validationSchema:yup.object({
            title:yup.string().required("Title Must Type"),
            date: yup.date().required("Date is required")
        }), 
        onSubmit:(appoinment)=>{
            axios.post(`http://localhost:5000/appoinments`,appoinment)
            .then(()=>{
                console.log("appoinment added");
            })
            navigate('/dashborad');
        }
    })
    return (
        <div className="container bg-light w-50 p-4 ">
            <b>Add New Appoinment-{cookies['userid']}</b>
            <form onSubmit={formik.handleSubmit} className="mt-4">
                <dl>
                    <dt>Title</dt>
                    <dd><input onChange={formik.handleChange} type="text" className="form-control" name="title" /></dd>
                    <dd className="text-danger">{formik.errors.title}</dd>
                    <dt>Date</dt>
                    <dd>
                       <input type="date" onChange={formik.handleChange} name="date"/>
                    </dd>
                    <dd className="text-danger">{formik.errors.date}</dd>
                </dl>
                <button type="submit" className="btn btn-success">Add</button>
                <Link to="/dashborad" className="btn btn-warning mx-2">Cancel</Link>
            </form>
        </div>
    )
}