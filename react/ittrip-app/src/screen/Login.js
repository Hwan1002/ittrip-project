import React, { useState } from "react";
import "../css/Login.css"
import '../css/Reset.css'
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import axios from "axios";
// import { signin } from "../service/ApiService";


const Login = () => {
    //useState
    const [logData, setLogData] = useState({
        userId : '',
        password : '',
    })
    // const [id,setId]=useState('')
    // const [pw,setPw]=useState('')
    // const logInfo = {
    //     "userId" : id,
    //     "password" : pw,
    // }

    //navigate
    const navigate = useNavigate();
    
    
    const handleChange = (e) => {
        setLogData({ ...logData, [e.target.name] : e.target.value});
    }

    const handleLogin = async(e) => {

        e.preventDefault();
        try {
            debugger;
            const response = await axios.post('http://localhost:9090/signin',logData);
            console.log('로그인 응답 데이터:', response.data);
            console.log()
            if(response.data){
                alert("로그인 성공");
                navigate("/");
            }else{
                alert("로그인 실패: 서버에서 올바른 데이터를 못받음");
            }
        } catch (error) {
            if(error.response){
                console.log("로그인 실패 결과 : ", error.response.data);
                alert("로그인 실패 결과 : ", error.response.data);
            }else{
                console.log("뭔 오류인지 모름")
                alert("뭔 오류인지 모름")
            }
            
        }
        console.log("로그인 데이터 : " , logData);
        
    }

    return (
        <div id="login">
            <div className="logoImg">
                <Logo/>
            </div>
            <div className="login_container container">
                <div className="login_contents">
                <form onSubmit={handleLogin}>
                    <h2 className="title">로그인</h2>
                    <div>
                        <input name="userId" type="text" onChange={handleChange} placeholder="아이디"/>
                    </div>
                    <div>
                        <input name="password" type="password" onChange={handleChange} placeholder="비밀번호" />
                    </div>
                    <div>
                        <button id="loginBt" type="submit">로그인하기</button>
                    </div>
                    <div>
                        <button id="kakaoBt">카카오로 로그인하기</button>
                    </div>
                    <div>
                        <button id="naverBt">네이버로 로그인하기</button>
                    </div>
                    <div>
                        <button id="googleBt">구글로 로그인하기</button>
                    </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
export default Login;