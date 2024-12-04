import React, { useState } from "react";
import "../css/Login.css"
import '../css/Reset.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Logo from "../components/Logo";
import kakao from "../img/kakaotalk.png";
import axios from "axios";
import { ProjectContext } from "../context/ProjectContext";
import { API_BASE_URL } from "../service/api-config";

const Login = () => {
    
    //useState
    const { setLoginSuccess } = useContext(ProjectContext);
    const [logData, setLogData] = useState({ id : '', password : ''});

    //navigate
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogData({ ...logData, [e.target.name]: e.target.value });
    }

    // 소셜로그인
    const socialLogin = (e,provider) => {
        e.preventDefault();
        window.location.href = API_BASE_URL + "/auth/authorize/" + provider + "?redirect_url=" + window.location.origin;
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/signin`, logData);
            if (response.data && response.data.value.token) {
                const token = response.data.value.token;
                localStorage.setItem("token", token);
                setLoginSuccess(true);
                alert("로그인 성공");
                navigate("/");
            } else {
                alert("로그인 실패: 서버에서 올바른 데이터를 못받음");
            }
        } catch (error) {
            if (error.response) {
                alert("로그인 실패");
            } else {
                alert("뭔 오류인지 모름")
            }
        }
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
                                <img src={kakao} alt="kakao" style={{width:"20px"}} />
                                카카오로 로그인
                            </button>
                            <button className="naverBt socialBtn" type="button" onClick={ (e) => socialLogin(e,"naver")}>네이버로 로그인</button>
                            <button className="googleBt socialBtn" type="button" onClick={ (e) => socialLogin(e,"google")}>구글로 로그인</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;