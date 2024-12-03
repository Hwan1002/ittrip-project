import React from "react";
import '../css/Header.css'
import '../css/Reset.css'
import logo from '../img/logo.svg'
import { Link } from "react-router-dom";

const Header=()=>{
    //Link to부분은 화면 확인을 위해 임시로 넣은 주소입니다.
    return(
        <div className="header">
            <Link className="logo" to={'/'}>
                <img className="headerLogo" src={logo} alt="Logo"/>
            </Link>
            <nav className="menuBar">
                <Link className="menu" to={'/'}>Main</Link>
                <Link className="menu" to={'/entireplan'}>My Plan</Link>
                <Link className="menu" to={'/newtrip'}>New Plan</Link>
            </nav>
            <div className="headerBtn">
                <Link className="login" to={'/login'}>LOGIN</Link>
                <Link className="signup" to={'/signup'}>SIGNUP</Link>
            </div>
        </div>
    )
}

export default Header