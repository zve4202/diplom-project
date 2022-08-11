import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import { validator } from "../../../utils/validator";

import { getAuth, getAuthError, signUp } from "../../../store/auth";

const defaultData = {
    name: "",
    email: "",
    password: "",
    sex: "male",
    role: "user"
};

const RegisterForm = () => {
    const { currentUser } = useSelector(getAuth());
    const error = useSelector(getAuthError());
    const dispatch = useDispatch();

    const history = useHistory();
    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser) {
            history.push("/");
        } else if (error) {
            setErrors({
                email: error
            });
        }
    }, [currentUser, error]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        name: {
            isRequired: {
                message: "Введите имя пользователя"
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(signUp(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя пользователя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
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
            <RadioField
                options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />

            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Зарегистрировать
            </button>
        </form>
    );
};

export default RegisterForm;
