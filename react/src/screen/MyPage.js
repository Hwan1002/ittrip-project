import React, { useContext, useState, useEffect } from "react";
import '../css/MyPage.css'

import { ProjectContext } from "../context/ProjectContext";
import { API_BASE_URL } from "../service/api-config";
import axios from "axios";

const MyPage = () => {

    const {userInfo, setUserInfo} = useState({});
    const token = window.localStorage.getItem("token");

    const header = new Headers({
        "Authorization": `Bearer ${token}`
    });
    useEffect(()=>{
        try {
            const getUserInfo = async() => {
                const response = await axios.get(`${API_BASE_URL}/mypage`,header);
                setUserInfo(response.data.value);
            }
        } catch (error) {
            
        }
        
    },[])

    

    return (
        <div className="container">
            <div id="myPage">
                <div id="profileFrame">
                    <div >
                        {/* <img src={userInfo.profilePhoto.indexOf('http') !=-1 ? `${userInfo.profilePhoto}`:`http://localhost:8080${userInfo.profilePhoto}`}/> */}
                    </div>
                    <button>프로필 변경</button>
                </div>

                <div id="myInfoFrame">
                    <button type="button">내정보 수정</button>
                    <div id="myInfo">
                        <label>
                            ID :
                            {/* <input value={userInfo.id}/> */}
                        </label>
                        <label>
                            이름 :
                            {/* <input value={userInfo.userName}/> */}
                        </label>
                        <label>
                            이메일 :
                            {/* <input value={userInfo.email}/> */}
                        </label>
                        
                        {/* <p>아이디  |  {userInfo ? userInfo.id : "Loading..."}</p>
                        <p>이름 | {userInfo ? userInfo.userName : "Loading..."}</p>
                        <p>이메일 | {userInfo ? userInfo.email : "Loading..."}</p> */}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MyPage;