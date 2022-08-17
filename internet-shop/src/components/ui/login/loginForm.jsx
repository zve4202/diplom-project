import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../utils/history";

import TextField from "../../common/form/textField";
import CheckBoxField from "../../common/form/checkBoxField";
import { validator } from "../../../utils/validator";
import {
    // getAuth,
    getAuthError,
    signIn
} from "../../../store/auth";
import BackButton from "../../common/backButton";

const LoginForm = () => {
    // const { currentUser } = useSelector(getAuth());
    const error = useSelector(getAuthError());

    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    useEffect(() => {
        // if (currentUser) {
        //     history.push("/");
        // } else
        if (error) {
            setEnterError(error);
        }
    }, [
        // currentUser,
        error
    ]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(signIn({ ...data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <div className="btn-group w-100 mx-auto" role="group">
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!isValid}
                    title="Войти в систему"
                >
                    Войти
                </button>
                <BackButton tooltip="Не входить в систему" caption="Назад" />
            </div>
        </form>
    );
};

export default LoginForm;
