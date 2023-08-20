import { useLocation, useNavigate } from "react-router-dom";
import st from "./Login.module.css";

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from "../../hooks/useAuth";

export default function Login() {

  

  const navigate = useNavigate();
  const location = useLocation();
  const { signin, check } = useAuth();

  const fromPage = location.state?.from?.pathname || "/admin/schedule";

  let [error, setError] = useState(false);

  const handlerSubmit = (e) => {

    e.preventDefault();

    const user = {
      password: e.target.password.value,
      login: e.target.login.value,
    }

    signin(user, () => {
      setError(false)
      navigate(fromPage, { relative: true })
    }, () => setError(true));

  }

  useEffect(() => {
    check(() => {
      // setError(false)
      navigate(fromPage, { relative: true })
    });
  });

  return (
    <>
      <div className={st.container}>
        <div className={st.login_box}>

          <h1>Вход</h1>

          {error ? <span class={st.login_error}>Ошибка логина\пароля</span> : null}

          <form action="" className={st.form} onSubmit={(e) => handlerSubmit(e)}>


            <div className={st.label}>
              <span className={st.label__name}>Логин</span>
              <input className={st.label__input} type="text" placeholder="login" name="login" autoComplete="username" autoFocus={true} />
            </div>



            <div className={st.label}>
              <span className={st.label__name}>Пароль</span>
              <input className={st.label__input} type="password" placeholder="1234" name="password" autoComplete="current-password" />
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
