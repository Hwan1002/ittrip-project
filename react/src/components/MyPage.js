import React, { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";
const MyPage = () => {
    const { loginSuccess, setLoginSuccess } = useContext(ProjectContext);
    const navigate = useNavigate();
    return(
        <div>
            <p>마이페이지 화면 구현</p>
        </div>
    )
}

export default MyPage;