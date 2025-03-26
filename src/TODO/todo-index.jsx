import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./todo-index.css"
import { ToDoHome } from "./ToDoHome"
import { ToDoRegister } from "./ToDoRegister"
import { ToDoLogin } from "./ToDoLogin"
import { UserDashboard } from "./user-dashboard"
import { AddAppointment } from "./add-appoints"
import { DeleteAppointment } from "./delete-appointments"
import { EditAppointment } from "./edit-appointments"
export function ToDoIndex() {
    return (
        <div className="d-flex justify-content-center">
            <div className="bg-image">
                <div className="shade">
                    <BrowserRouter>
                        <header className="text-white text-center p-2">
                            <h2><Link to={"/"} className='btn btn-light w-50'>To-Do App</Link></h2>
                        </header>
                        <section>
                            <Routes>
                                <Route path="/" element={<ToDoHome />}></Route>
                                <Route path="register" element={<ToDoRegister />}></Route>
                                <Route path="login" element={<ToDoLogin />}></Route>
                                <Route path="dashborad" element={<UserDashboard/>}></Route>
                                <Route path="add-appointment" element={<AddAppointment/>}></Route>
                                <Route path="delete-appoinment/:id" element={<DeleteAppointment/>}></Route>
                                <Route path="edit-appoinment/:id" element={<EditAppointment/>}></Route> 
                            </Routes>
                        </section>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
}