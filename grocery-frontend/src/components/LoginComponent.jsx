import React, { useState } from "react"
import { useFormik } from "formik"
import "../css/LoginRegisterComponent.css"
import { loginAPI, saveLoggedInUser, storeToken } from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginComponent() {

    const [showPassword, setShowPassword] = useState();

    const initialValues = {
        usernameOrEmail: "",
        password: "",
    };

    function togglePasswordVisibility(){
        setShowPassword(!showPassword);
    }

    const navigator = useNavigate();

    const onSubmit = async (values) => {
        await loginAPI(values).then((response) => {

            const token = 'Basic ' + window.btoa(values.usernameOrEmail + ':' + values.password);

            storeToken(token);
            saveLoggedInUser(values.usernameOrEmail);
            
            navigator("/grocery-items");
        }).catch((error) => {
            console.log(error);
            alert("Login Failed, invalid Credentials");
        });
    };

    const validate = (values) => {
        let errors = {};
        if (!values.usernameOrEmail) {
            errors.usernameOrEmail = "Username or Email is required"; 
        } else if (!values.password) {
            errors.password = "XXXXXXXX is required";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validate: validate,
        validateOnBlur: true,
    });

    return (
        <div className="container">
            <br /> <br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card" style={{marginBottom: "40px"}}>
                        <div className="card-header">
                            <h3 className="text-center">User Login Form</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">UserName / Email</label>
                                    <div className="col-md-9">
                                        <input
                                        placeholder="Enter Username or Email"
                                        type="text"
                                        className="form-control"
                                        id="usernameOrEmail"
                                        name="usernameOrEmail"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.usernameOrEmail}
                                        />
                                        {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? (
                                            <div className="alert alert-danger mt-2">
                                                {formik.errors.usernameOrEmail}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9">
                                        <input
                                        placeholder="Enter your password"
                                        type={showPassword ? "test" : "password"}
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="alert alert-danger mt-2">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                        <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            right: '20px',
                                            top: '52%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <br /> <br />
                                <a href="/register" className="text-center">New Customer? Register!</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default LoginComponent;