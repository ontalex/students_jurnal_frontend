import "./AdminProfile.css";

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { authUpdate } from "../../services/auth.service";
import {ReactComponent as LogoutIcon} from "../../pic/logout_icon.svg";

export default function AdminProfile() {
    const { user, signout } = useAuth();
    let navigate = useNavigate();

    let { mutate, isLoading, isError } = useMutation({
        mutationFn: (data) => authUpdate(data),
    });

    let handlerSubmit = (e) => {
        e.preventDefault();
        mutate({
            userID: user.userID,
            login: e.target.login.value,
            password: e.target.password.value,
        });
    };

    return (
        <div className="profile">

            {isError ? <span className="profile__alert profile__error">ошибка обновления</span> : null}
            {isLoading ? <span className="profile__alert profile__loading">... загрузка ...</span> : null}

            <form className="profile__form" onSubmit={handlerSubmit}>
                <input
                    className="profile__input profile__input--login"
                    placeholder="Новый логин"
                    defaultValue={user.login}
                    type="text"
                    name="login"
                    id="profile_login"
                    autoComplete="username"
                    autoFocus={true}
                />

                <input
                    className="profile__input profile__input--password"
                    placeholder="Новый пароль"
                    type="password"
                    name="password"
                    id="profile_password"
                    autoComplete="new-password"
                />
                <button className="profile__change"><span>Сменить</span></button>
            </form>

        </div>
    );
}
