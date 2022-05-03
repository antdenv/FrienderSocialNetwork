import React, { useRef, useContext } from "react";
import "./loginForm.css";
import { NavLink } from "react-router-dom";
import { loginCall } from "../../../apiCalls";
import { AuthContext } from "../../../context/authContext";
import { CircularProgress } from "@material-ui/core";

export const LoginForm = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const loginHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="auth-form">
      <div className="logo">
        <img src={PF + "lightLogo.png"} alt="logo" />
      </div>
      <form onSubmit={loginHandler}>
        <h1>Авторизация</h1>
        <input
          type="email"
          placeholder="Электронная почта"
          id="auth-email"
          autoComplete="off"
          required
          ref={email}
        />
        <input
          type="password"
          placeholder="Пароль"
          id="auth-password"
          required
          minLength="6"
          ref={password}
        />
        <NavLink to="/reset" className="forget-link">
          Забыли пароль?
        </NavLink>
        {isFetching ? (
          <CircularProgress/>
        ) : (
          <button className={`btn btn-primary auth-button`} type="submit" disabled={isFetching}>
            Войти
          </button>
        )}
        <p>
          Ещё нет аккаунта?
          <NavLink to="/register" className="register-link">
            Зарегистрироваться
          </NavLink>
        </p>
      </form>
    </div>
  );
};
