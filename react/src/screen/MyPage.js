import React, { useContext, useEffect, useState } from "react";
import '../css/MyPage.css'
import { API_BASE_URL } from "../service/api-config";
import { ProjectContext } from "../context/ProjectContext";
import axios from "axios";

const MyPage = () => {


    const [userInfo, setUserInfo] = useState('');

    useEffect(()=>{
        const response = axios.get(`${API_BASE_URL}/userinfo`)
        userInfo =  response.data.value
    },[])

    return (
        <div className="container">
            <div id="myPage">
                <div id="profileFrame">
                    <div >
                    <img src={userInfo.profilePhoto.indexOf('http') !=-1 ? `${userInfo.profilePhoto}`:`http://localhost:8080${userInfo.profilePhoto}`}/>

                    </div>
                    <button>프로필 변경</button>
                </div>

                <div id="myInfoFrame">
                    <button>내정보 수정</button>
                    <div id="myInfo">
                    <p>아이디  |  {userInfo ? userInfo.id : "Loading..."}</p>
                        <p>이름 | {userInfo ? userInfo.userName : "Loading..."}</p>
                        <p>이메일 | {userInfo ? userInfo.email : "Loading..."}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MyPage;