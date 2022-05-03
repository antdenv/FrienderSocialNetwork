import React from "react";
import './forgetPasswordForm.css';
import {NavLink} from 'react-router-dom';

export const ForgetPasswordForm = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="forget-form">
            <div className="logo">
                <img src={PF + "lightLogo.png"} alt="logo" />
            </div>
            <form>
                <h1>Восстановление пароля</h1>
                <input
                    type="text"
                    placeholder="Логин"
                    id="forgot-login"
                    autoComplete="off"
                    required
                />
                <input
                    type="email"
                    placeholder="Электронная почта"
                    id="forgot-email"
                    autoComplete="off"
                    required
                />
                <button
                    className={`btn btn-primary auth-button`}
                    type="submit"
                >
                    Восстановить
                </button>
                <p>Вернуться на страницу <NavLink to='/login' className="register-link">авторизации</NavLink></p>
            </form>
        </div>
    );
}