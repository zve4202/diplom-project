import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../utils/history";

import TextEdit from "../../common/form/textEdit";
import RadioEdit from "../../common/form/radioEdit";
import { validator } from "../../../utils/validator";

import { getAuth, getAuthError, signUp } from "../../../store/auth";
import CheckBoxEdit from "../../common/form/checkBoxEdit";
import BackButton from "../../common/backButton";

const defaultData = {
    name: "",
    email: "",
    password: "",
    sex: "male",
    role: "user",
    stayOn: false
};

const RegisterForm = () => {
    const { authUser } = useSelector(getAuth());
    const error = useSelector(getAuthError());
    const dispatch = useDispatch();

    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (authUser) {
            history.push("/");
        } else if (error) {
            setErrors({
                email: error
            });
        }
    }, [authUser, error]);

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
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(signUp({ ...data, redirect }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextEdit
                label="Имя пользователя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextEdit
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextEdit
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <RadioEdit
                options={[
                    { name: "Мужчина", value: "male" },
                    { name: "Женщина", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Укажите ваш пол"
            />
            <CheckBoxEdit
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxEdit>

            <div className="btn-group w-100 mx-auto" role="group">
                <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={!isValid}
                    title="Зарегистрироваться в системе"
                >
                    Зарегистрировать
                </button>
                <BackButton tooltip="Не регистрироваться" caption="Назад" />
            </div>
        </form>
    );
};

export default RegisterForm;
