import React, {useEffect, useState} from 'react';
import ShopService from "../../../services/ShopService";
import {Redirect} from "react-router-dom";

function Login(props) {
    const [logged, setLogged] = useState(false)
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")

    const onClickSignIn = (event) => {
        event.preventDefault();

        const data = {email, password};

        ShopService.login(data)
            .then((response) => {
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userRole", response.data.userRole);
                localStorage.setItem("isLoggedIn", true);

                setLogged(true)
                props.setLoggedIn(true);
            });
    }

    if (logged) {
        return <Redirect to="/rest/account"/>
    }

    return (
        <div className="container mt-5">
            <h4>Вход в личный кабинет</h4>
            <hr align="left" width="550"/>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Электронная почта: </label>
                <div className="col-sm-4">
                    <input className="form-control" type="email" name="email" value={email}
                           onChange={(event) => setEmail(event.target.value)}/>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Пароль: </label>
                <div className="col-sm-4">
                    <input className="form-control" type="password" name="password" value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>
            </div>

            <div className="form-group row">
                <button className="btn btn-dark mx-3" onClick={onClickSignIn}>Вход</button>
            </div>
        </div>
    );
}

export default Login;