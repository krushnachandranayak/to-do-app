import { Link } from "react-router-dom";

export function ToDoHome() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
            <div style={{ width: "300px" }} className="d-flex flex-column">
                <Link to="/register" className="btn btn-dark w-100">Register</Link>
                <Link to="/login" className="btn btn-warning w-100 mt-4">Login</Link>
            </div>
        </div>

    )
}