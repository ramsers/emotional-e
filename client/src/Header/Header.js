import React from 'react';
import './Header.scss';
import logo from './HeaderAssets/Logo.png';
import logo2 from './HeaderAssets/emotional-e-logo.png';
import {NavLink, Link } from 'react-router-dom';

const Header =() => {
    return(
        <header className="header">
            <div className="header__wrap">
                <Link to="/" className="header__logo">
                    <img src={logo2} className="header__logo-img" alt="emotional-e logo"/>
                </Link>

                <nav className="header__nav">
                    <NavLink to="/journal" className="header__nav-link">
                        Your Notes
                    </NavLink>
                    <NavLink to="/data" className="header__nav-link">
                        Your Data
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header;