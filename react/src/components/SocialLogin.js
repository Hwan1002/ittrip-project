import  { useContext, useEffect } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {setLoginSuccess } = useContext(ProjectContext);
    const navigate = useNavigate();


    useEffect(()=>{
        const getUrlParameter = (name) => {
            //window.location.search : URL에서 퀴리스트링을 가져오는 속성
            let search = window.location.search;
            let params = new URLSearchParams(search);
            return params.get(name);
        };
        
        const token = getUrlParameter("token");
        console.log('토큰 파싱 : ' + token);
        
        if(token){
            localStorage.setItem("token",token);
            setLoginSuccess(true);
            alert("SocialLogin.js 쪽 :로그인 성공");
            
        }else{
            alert("로그인 할 수 없습니다.")
            navigate("/login");
        }
    },[navigate, setLoginSuccess]);

    return navigate("/"); 
}

export default SocialLogin;