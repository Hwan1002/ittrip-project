import React, { useContext, useEffect, useState } from "react";
import '../css/MyPage.css'



import { API_BASE_URL } from "../service/api-config";
import axios from "axios";

const MyPage = () => {



    const [userData, setUserData] = useState({}); // 사용자 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태


    useEffect(() => {
        // 마운트 시 또는 의존성이 변경될 때 실행되는 함수
        const fetchUserInfo = async () => {
            try {
                setLoading(true); // 로딩 시작
                const token = localStorage.getItem("token"); // Authorization 토큰 가져오기
                const logData = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                // API 호출
                const response = await axios.get(`${API_BASE_URL}/userinfo`, logData);

                console.log(response)
                // 응답 데이터 상태에 저장
                setUserData(response.data.value); // ResponseDTO의 value에 담긴 UserDTO 데이터
            } catch (err) {
                console.error("Error fetching user info:", err);
                setError(err); // 에러 상태 업데이트
            } finally {
                setLoading(false); // 로딩 종료
            }
        };
        fetchUserInfo();
    }, [])



    useEffect(()=>{
        const response = axios.get(`${API_BASE_URL}/userinfo`)
        userInfo =  response.data.value
    },[])

    return (
        <div className="container">
            <div id="myPage">
                <div id="profileFrame">
                    <div className="UserImg">
                        <img src={ `http://localhost:8080${userData.profilePhoto}`} />
                    </div>
                    <button>프로필 변경</button>
                </div>

                <div id="myInfoFrame">

                    <div id="myInfo">
                        <p>아이디  |  {userData ? userData.id : "Loading..."}</p>
                        <p>이름 | {userData ? userData.userName : "Loading..."}</p>
                        <p>이메일 | {userData ? userData.email : "Loading..."}</p>
                        {userData.authProvider !== null ?
                            (<p></p>) : (<input />)
                        }


                    </div>
                    <button>내정보 수정</button>
                    <button>회원 탈퇴</button> 
                </div>
            </div>

        </div>
    )
}
export default MyPage;