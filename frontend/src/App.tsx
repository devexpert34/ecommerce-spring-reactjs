import React, { FC, ReactElement, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Menu from "./pages/Menu/Menu";
import Contacts from "./pages/Contacts/Contacts";
import Footer from "./component/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./component/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Account from "./pages/Account/Account";
import Order from "./pages/Order/Order";
import OrderFinalize from "./pages/Order/OrderFinalize/OrderFinalize";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import OAuth2RedirectHandler from "./utils/oauth2/OAuth2RedirectHandler";
import {
    ACCOUNT,
    ACTIVATE,
    BASE,
    CART,
    CONTACTS,
    FORGOT,
    LOGIN,
    MENU,
    OAUTH2_REDIRECT,
    ORDER,
    ORDER_FINALIZE,
    PRODUCT,
    REGISTRATION,
    RESET
} from "./constants/routeConstants";
import { fetchCart } from "./redux-toolkit/cart/cart-thunks";
import { fetchUserInfo } from "./redux-toolkit/user/user-thunks";
import Login2 from "./refactor/pages/Login/Login2";
import Registration2 from "./refactor/pages/Registration/Registration2";
import ForgotPassword2 from "./refactor/pages/ForgotPassword/ForgotPassword";
import "./App.css";
import Menu2 from "./refactor/pages/Menu/Menu2";
import Contacts2 from "./refactor/pages/Contacts/Contacts2";
import Cart2 from "./refactor/pages/Cart/Cart2";
import Order2 from "./refactor/pages/Order/Order2";
import Home from "./refactor/pages/Home/Home";
import Product2 from "./refactor/pages/Product/Product2";

const App: FC = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        const perfumesFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("perfumes") as string)
        );
        dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));

        if (localStorage.getItem("token")) {
            dispatch(fetchUserInfo());
        }
    }, []);

    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path={BASE} component={HomePage} />
                {/*<Route exact path={BASE} component={Home} />*/}
                <Route exact path={LOGIN} component={Login} />
                {/*<Route exact path={LOGIN} component={Login2} />*/}
                <Route exact path={REGISTRATION} component={Registration} />
                {/*<Route exact path={REGISTRATION} component={Registration2} />*/}
                <Route exact path={FORGOT} component={ForgotPassword} />
                {/*<Route exact path={FORGOT} component={ForgotPassword2} />*/}
                <Route exact path={`${RESET}/:code`} component={ResetPassword} />
                <Route exact path={`${ACTIVATE}/:code`} component={Login} />
                <Route exact path={MENU} component={Menu} />
                {/*<Route exact path={MENU} component={Menu2} />*/}
                <Route exact path={`${PRODUCT}/:id`} component={Product} />
                {/*<Route exact path={`${PRODUCT}/:id`} component={Product2} />*/}
                <Route exact path={CONTACTS} component={Contacts} />
                {/*<Route exact path={CONTACTS} component={Contacts2} />*/}
                <Route exact path={CART} component={Cart} />
                {/*<Route exact path={CART} component={Cart2} />*/}
                <Route exact path={ORDER} component={Order} />
                {/*<Route exact path={ORDER} component={Order2} />*/}
                <Route exact path={ORDER_FINALIZE} component={OrderFinalize} />
                <Route path={OAUTH2_REDIRECT} component={OAuth2RedirectHandler} />
                <Route
                    path={ACCOUNT}
                    render={() =>
                        localStorage.getItem("token") ? <Route component={Account} /> : <Route component={HomePage} />
                    }
                />
                <Route path="*" component={HomePage} />
            </Switch>
            <Footer />
        </>
    );
};

export default App;
