import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faSync, faUndo} from "@fortawesome/free-solid-svg-icons";

import {fetchResetPasswordCode, formReset, resetPassword} from "../../actions/auth-actions";

const ResetPassword = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const errors = useSelector(state => state.auth.errors);
    const {passwordError, password2Error} = errors;

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    useEffect(() => {
        dispatch(formReset());

        if (props.match.params.code) {
            dispatch(fetchResetPasswordCode(props.match.params.code));
        }
    }, []);

    const onClickReset = (event) => {
        event.preventDefault();
        dispatch(resetPassword({email: user.email, password, password2}, props.history));
    };

    return (
        <div className="container mt-5">
            <h4><FontAwesomeIcon className="mr-2" icon={faSync}/> RESET PASSWORD</h4>
            <hr align="left" width="550"/>
            {error ?
                <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
            <form onSubmit={onClickReset}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className={passwordError ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setPassword(event.target.value)}/>
                        <div className="invalid-feedback">{passwordError}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Confirm password: </label>
                    <FontAwesomeIcon style={{position: "relative", top: "8px"}} icon={faLock}/>
                    <div className="col-sm-4">
                        <input
                            type="password"
                            name="password2"
                            value={password2}
                            className={password2Error ? "form-control is-invalid" : "form-control"}
                            onChange={(event) => setPassword2(event.target.value)}/>
                        <div className="invalid-feedback">{password2Error}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-dark mx-3">
                        <FontAwesomeIcon className="mr-3" icon={faUndo}/>Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
