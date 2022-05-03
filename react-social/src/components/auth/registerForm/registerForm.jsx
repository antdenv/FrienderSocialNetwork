import React, {useRef} from 'react';
import './registerForm.css';
import {NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

export const RegisterForm = () => {
    const username = useRef();
    const login = useRef();
    const email = useRef();
    const password = useRef();
    const repeatPassword = useRef();
    const navigate = useNavigate();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const registerHandle = async (e) => {
        e.preventDefault();
        if (password.current.value !== repeatPassword.current.value) {
            repeatPassword.current.setCustomValidity("Пароли не совпадают");
        } else {
            const user = {
                username: username.current.value,
                login: login.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                await axios.post('/auth/register', user);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="register-form">
            <div className="logo">
                <img src={PF + "lightLogo.png"} alt="logo" />
            </div>
            <form onSubmit={registerHandle}>
                <h1>Регистрация</h1>
                <input
                    type="text"
                    placeholder="Имя Фамилия"
                    id="register-username"
                    autoComplete="off"
                    required
                    ref={username}
                />
                <input
                    type="text"
                    placeholder="Логин"
                    id="register-login"
                    autoComplete="off"
                    required
                    ref={login}
                />
                <input
                    type="email"
                    placeholder="Электронная почта"
                    id="register-email"
                    autoComplete="off"
                    required
                    ref={email}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    id="register-password"
                    required
                    ref={password}
                    minLength="6"
                />
                <input
                    type="password"
                    placeholder="Повторите пароль"
                    id="register-password-repeat"
                    required
                    ref={repeatPassword}
                    minLength="6"
                />
                <button
                    className={`btn btn-primary auth-button`}
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <p>Уже есть аккаунт? <NavLink to='/login' className="auth-link">Войти</NavLink></p>
            </form>
        </div>
    );
}