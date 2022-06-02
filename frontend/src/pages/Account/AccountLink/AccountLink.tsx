import React, { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";

type PropsType = {
    link: string;
    title: string;
};

const AccountLink: FC<PropsType> = ({ link, title }): ReactElement => {
    return (
        <NavLink to={link} activeClassName="is-active" style={{ display: "block", marginBottom: 8 }}>
            {title}
        </NavLink>
    );
};

export default AccountLink;
