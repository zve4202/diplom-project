import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import SelectField from "../../../common/form/selectField";
import RadioField from "../../../common/form/radioField";

import PasswordControl from "./passwordControl";
import RoleControl from "./roleControl";

import { getRoles, loadRoles } from "../../../../store/roles";
import {
    getUser,
    getUsersState,
    loadUsers,
    updateUser
} from "../../../../store/users";
import { getAuth } from "../../../../store/auth";
import LoadImage from "../../../common/form/loadImage";

const defaultData = {
    name: "",
    email: "",
    password: "",
    sex: "male",
    role: "user",
    image: ""
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
    },
    role: {
        isRequired: {
            message: "Введите роль пользователя"
        }
    }
};

const UserEditPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { currentUser } = useSelector(getAuth());
    const user = useSelector(getUser(userId));
    const sameUser = currentUser && currentUser._id === userId;

    const { isLoading, isUpdated, error } = useSelector(getUsersState());

    const roles = useSelector(getRoles());
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        if (!user) {
            dispatch(loadUsers(userId));
        }
        if (roles.length === 0) {
            dispatch(loadRoles());
        }
    }, []);

    useEffect(() => {
        if (user) {
            setData({ ...user });
        }
    }, [user]);

    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(updateUser(data));
    };

    useEffect(() => {
        if (!isLoading) {
            validate();
        }
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const changed = JSON.stringify(user) !== JSON.stringify(data);

    const handleShowPassvord = () => {
        setData((prevState) => ({
            ...prevState,
            password: "",
            new_password: true
        }));
    };

    return (
        <>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-auto">
                        <LoadImage
                            data={data}
                            canLoad={sameUser}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                                readOnly={!sameUser}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                                readOnly={!sameUser}
                            />
                            <PasswordControl
                                userId={data._id}
                                onShow={handleShowPassvord}
                                hideIf={isUpdated}
                            >
                                <TextField
                                    label="Новый пароль"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            </PasswordControl>
                            <RoleControl userId={data._id}>
                                <SelectField
                                    label="Роль пользователя"
                                    defaultOption="Выбрать..."
                                    defaultValue={data.role}
                                    options={roles.map((role) => ({
                                        label: role.name,
                                        value: role._id
                                    }))}
                                    onChange={handleChange}
                                    name="role"
                                    value={data.role}
                                    error={errors.role}
                                    readOnly={sameUser}
                                />
                            </RoleControl>
                            <RadioField
                                options={[
                                    { name: "Мужчина", value: "male" },
                                    { name: "Женщина", value: "female" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Пол пользователя"
                                readOnly={!sameUser}
                            />
                            <button
                                type="submit"
                                disabled={!(isValid && changed)}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
                <div className="card-footer mt-3">
                    <span className="me-2">Статус:</span>
                    {changed && (
                        <span className="text-primary">Данные изменены...</span>
                    )}
                    {error && <span className="text-danger">{error}</span>}
                    {isUpdated && (
                        <span className="text-success">
                            Информация сохранена...
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserEditPage;
