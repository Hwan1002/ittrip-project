import React, { useState } from "react";
import "../css/Login.css"
import '../css/Reset.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Logo from "../components/Logo";
import Kakao from "../img/Logo/kakao.png";
import Naver from '../img/Logo/naver.svg'
import Google from '../img/Logo/google.svg'
import axios from "axios";
import { ProjectContext } from "../context/ProjectContext";
import { API_BASE_URL } from "../service/api-config";
import Modal from "../components/Modal";
import useModal from "../context/useModal";

const Login = () => {
    
    //useState
    const { setLoginSuccess } = useContext(ProjectContext);
    const [logData, setLogData] = useState({ id : '', password : ''});

    const {
        isModalOpen,
        modalTitle,
        modalMessage,
        modalActions,
        openModal,
        closeModal,
    } = useModal();

    //navigate
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogData({ ...logData, [e.target.name]: e.target.value });
    }

    // 소셜로그인
    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`${API_BASE_URL}/signin`, logData);
            setLoginSuccess(true);
            if (response.data && response.data.value.token) {
                const token = response.data.value.token;
                localStorage.setItem("token", token);
                openModal({
                    title: "로그인 성공",
                    message:"환영합니다.",
                    actions : [{label : "확인", onClick: () => {closeModal(); navigate("/")} }],
                })
                

            } else {
                openModal({
                    title: "",
                    message: "로그인 실패: 서버에서 올바른 데이터를 못받음",
                    actions : [{label : "확인", onClick: closeModal}],
                })
                return;
            }
        } catch (error) {
            if (error.response) {
                openModal({
                    title: "",
                    message: "로그인 실패: 서버에서 올바른 데이터를 못받음2",
                    actions : [{label : "확인", onClick: closeModal}],
                })
                return;
            } 
        }
    }

    const socialLogin = (e, provider) => {
        e.preventDefault();
        // window.localStorage.origin : 현재웹페이지의 origin --> origin  : http://localhost:5000 ----프로토콜, 도메인, 포트번호 를 합친것을 origin이라고 한다.
        window.location.href = API_BASE_URL + "/auth/authorize/" + provider + "?redirect_url=" + window.location.origin;

    }
    return (
        <div id="login">
            <div className="logoImg">
                <Logo />
            </div>
            <div className="login_container container">
                <form onSubmit={handleLogin}>
                    <div className="login_contents">
                        <h2 className="title">로그인</h2>
                        <div>
                            <input name="id" type="text" onChange={handleChange} placeholder="아이디"/>
                        </div>
                        <div>
                            <input name="password" type="password" onChange={handleChange} placeholder="비밀번호" />
                        </div>
                        <div>
                            <button className="loginBt" type="submit">로그인</button>
                            <button className="kakaoBt socialBtn" type="button" onClick={ (e) => socialLogin(e,"kakao")}>
                                <img src={Kakao} alt="kakao" style={{width:"25px", marginRight:"5px"}} />
                                카카오로 로그인
                            </button>
                            <button className="naverBt socialBtn" type="button" onClick={ (e) => socialLogin(e,"naver")}>
                                <img src={Naver} alt="kakao" style={{width:"18px", marginRight:"10px"}} />
                                네이버로 로그인
                            </button>
                            <button className="googleBt socialBtn" type="button" onClick={ (e) => socialLogin(e,"google")}>
                                <img src={Google} alt="kakao" style={{width:"20px",marginRight:"18px"}} />구글로 로그인
                            </button>
                        </div>
                    </div>

                </form>
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={modalTitle}
                    content={<p>{modalMessage}</p>}
                    actions={modalActions}
                />
            </div>
        </div>
    )
}
export default Login;