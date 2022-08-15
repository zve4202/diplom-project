import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavTabs from "../components/common/wrappers/navTabs";
import LoginForm from "../components/ui/login/loginForm";
import RegisterForm from "../components/ui/login/registerForm";

const pages = { login: "Вход", register: "Регистрация" };
const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (value) => {
        setFormType(value);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    <NavTabs
                        maket={pages}
                        selectedTab={formType}
                        onSelect={toggleFormType}
                    >
                        {formType === "register" ? (
                            <RegisterForm />
                        ) : (
                            <LoginForm />
                        )}
                    </NavTabs>
                </div>
            </div>
        </div>
    );
};

export default Login;
