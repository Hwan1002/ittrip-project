import React, { useContext } from "react";
import '../css/Header.css'
import '../css/Reset.css'
import logoWhite from '../img/logoWhite.svg'
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext} from "../context/ProjectContext";


const Header=()=>{

    const { loginSuccess, setLoginSuccess } = useContext(ProjectContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        setLoginSuccess(false);
        alert("로그아웃 성공");
        navigate('/login');
      };

    //Link to부분은 화면 확인을 위해 임시로 넣은 주소입니다.
    return(
        <div className="header">
            <Link className="logo" to={'/'}>
                <img className="headerLogo" src={logoWhite} alt="Logo"/>
            </Link>
            <nav className="menuBar">
                <Link className="menu" to={'/entireplan'}>Menu1</Link>
                <Link className="menu" to={'/login'}>Menu2</Link>
                <Link className="menu" to={'/map'}>Menu3</Link>
                <Link className="menu" to={'/'}>Menu4</Link>
            </nav>
            <div className="headerBtn">
                {loginSuccess ? (
                    <>
                        <Link className="logout" onClick={handleLogout}>LOGOUT</Link>
                        <Link className="mypage" to={'/mypage'}>MYPAGE</Link>
                    </>
                    ):(
                        <>
                            <Link className="login" to={'/login'}>LOGIN</Link>
                            <Link className="signup" to={'/signup'}>SIGNUP</Link>
                        </>
                    )
                }
                
            </div>
        </div>
    )
}

export default Header