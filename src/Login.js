import {useState} from "react";
import axios from "axios";

const Login = () => {
    const [form, setForm] = useState({
        email: 'admin@admin.com',
        password: '12345678', // default credentials.
    });

    const handleClick = () => {
        axios.post('http://localhost:8080/api/v1/auth/', {
            ...form,
        }).then(res => {
            localStorage.setItem("token", res.data.token);
            window.open('/customers');
        }).catch(error => {
            console.log(error);
            alert('Invalid login.');
        })
    }

    const handleOnChange = (e) => {
        if (!e) {
            return
        }

        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email:</label>
                                <input name="email"
                                       className="form-control"
                                       onChange={handleOnChange}
                                       value={form.email} placeholder="Employee email" required/>
                            </div>

                            <div className="form-group">
                                <label>Password:</label>
                                <input name="password"
                                       className="form-control"
                                       onChange={handleOnChange}
                                       value={form.password} placeholder="Employee password" required/>
                            </div>

                            <div className="form-group mt-3">
                                <button className="btn btn-primary" type="button" onClick={handleClick}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}


export default Login;