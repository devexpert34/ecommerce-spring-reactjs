import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import ToastShow from "../../component/Toasts/ToastShow";
import {formReset} from "../../redux/thunks/admin-thunks";
import {fetchAccount} from "../../redux/thunks/auth-thunks";

const Account = () => {
    const dispatch = useDispatch();
    const success = useSelector(state => state.admin.success);

    useEffect(() => {
        dispatch(formReset());
        dispatch(fetchAccount());
    }, []);

    return (
        <div className="container">
            <AccountNavbar/>
            <div className="container" style={{"display": success ? "block" : "none"}}>
                <ToastShow showToast={success} message={"Perfume successfully edited!"}/>
            </div>
        </div>
    );
};

export default Account;
