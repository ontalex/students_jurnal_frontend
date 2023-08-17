import { useNavigate } from "react-router-dom";
import st from "./Login.module.css";

import React from 'react'

export default function Login() {

  let navigate = useNavigate();

  let handlerSubmit = (e) => {
    e.preventDefault();

    alert(`login: ${e.target.login.value};\npassword: ${e.target.password.value};`);

    navigate("/admin/schedule")
  }

  return (
    <>
      <div className={st.container}>
        <div className={st.login_box}>

          <h1>Вход</h1>

          <form action="" className={st.form} onSubmit={(e) => handlerSubmit(e)}>


            <div className={st.label}>
              <span className={st.label__name}>Логин</span>
              <input className={st.label__input} type="text" placeholder="login" name="login" autoComplete="username" autoFocus={true}/>
            </div>



            <div className={st.label}>
              <span className={st.label__name}>Пароль</span>
              <input className={st.label__input} type="password" placeholder="1234" name="password" autoComplete="current-password"/>
            </div>



            <button type="submit" className={st.form_submit}>
              <span>Войти</span>
            </button>

          </form>

        </div>
      </div>
    </>
  )
}
