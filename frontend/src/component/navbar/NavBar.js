import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {logout} from "../../actions/auth-actions";
import {fetchCart} from "../../actions/cart-actions";
import "./NavBar.css";
import {faSignInAlt, faSignOutAlt, faUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";

class NavBar extends Component {
    componentDidMount() {
        this.props.fetchCart();
    }

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const {cartItems} = this.props.cart;
        let links;
        let signOut;

        if (localStorage.getItem("isLoggedIn")) {
            links = (
                <li className="nav-item">
                    <Link to={"/account"}><span className="nav-link pl-5 pr-5">
                         <FontAwesomeIcon className="mr-2" icon={faUser}/>ЛИЧНЫЙ КАБИНЕТ</span></Link>
                </li>
            );

            signOut = (
                <div>
                    <Link to={"/"} onClick={this.handleLogout}>
                        <button className="btn btn-dark mr-3" style={{color: "white"}}>
                            <FontAwesomeIcon className="mr-2" icon={faSignOutAlt}/>Выход</button>
                    </Link>
                </div>
            );

        } else {
            links = (
                <>
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link pl-5 pr-3">
                            <FontAwesomeIcon className="mr-2" icon={faSignInAlt}/>ВХОД</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/registration"} className="nav-link">
                            <FontAwesomeIcon className="mr-2" icon={faUserPlus}/>РЕГИСТРАЦИЯ</Link>
                    </li>
                </>
            );
        }

        return (
            <div>
                <div id="header" className="container-fluid header-top d-none d-md-block pb-5 pt-5">
                    <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block"/>
                </div>
                <div className="container-fluid bg-black">
                    <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                         style={{fontSize: "18px"}}>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto ">
                                <li className="nav-item">
                                    <Link to={"/"}><span className="nav-link pl-5 pr-5">ГЛАВНАЯ</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{pathname: "/menu", state: {id: "all"}}}>
                                        <span className="nav-link pl-5 pr-5">ПАРФЮМЕРИЯ</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/contacts"}><span className="nav-link pl-5 pr-5">КОНТАКТЫ</span></Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/cart"}>
                                        <i className="fas fa-shopping-cart fa-lg pl-5" style={{color: "white"}}></i>
                                        {cartItems !== null ?
                                            <h5 className="d-inline"
                                                style={{position: "relative", right: "15px", bottom: "8px"}}>
                                                <span className="badge badge-success">{cartItems.length}</span>
                                            </h5> : null
                                        }
                                    </Link>
                                </li>
                                {links}
                            </ul>
                            {signOut}
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cart: state.cart
});

export default connect(mapStateToProps, {fetchCart, logout})(NavBar);
