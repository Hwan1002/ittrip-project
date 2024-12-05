import React, { useContext,useEffect, useState } from "react";
import '../css/Header.css'
import '../css/Reset.css'

import logo from '../img/Logo/logo.svg'





import { Link, useNavigate } from "react-router-dom";

import Modal from "./Modal";

import { ProjectContext} from "../context/ProjectContext";


const Header=()=>{
    
    const { loginSuccess, setLoginSuccess } = useContext(ProjectContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !loginSuccess) {
            setLoginSuccess(true);
        }
    }, [setLoginSuccess, loginSuccess]);

    const handleLogout = () => {
        setLoginSuccess(false);
        localStorage.removeItem("token");
        alert("로그아웃 성공");
        closeModal();
        return navigate("/login");
    };

    //modal창 구현 영역
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);



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
                <Link className="menu" to={'/mypage'}>Main page</Link>
                <Link className="menu" to={'/mainlocal'}>Test</Link>
            </nav>
            <div className="headerBtn">
                {loginSuccess ? (
                    <>
                        <Link className="logout" onClick={openModal}>LOGOUT</Link>
                        <Link className="mypage" to={'/mypage'}>MYPAGE</Link>
                    </>
                ):(
                    <>
                        <Link className="login" to={'/login'}>LOGIN</Link>
                        <Link className="signup" to={'/signup'}>SIGNUP</Link>
                    </>
                )}
            </div>
            <Modal 
                isOpen={isModalOpen}
                onClose={closeModal}
                content={
                    <div>
                        <p>로그아웃 하시겠습니까?</p>
                    </div>
                }
                title="로그아웃"
                actions={[
                    {label: "로그아웃", onClick: handleLogout, className:"logout-button"},
                    {label: "취소", onClick: closeModal, className:"cancel-button"},
                ]}
            />
            
        </div>
    )
}

export default Header