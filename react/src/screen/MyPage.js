import React, { useContext,useState, useEffect, useRef } from "react";
import '../css/MyPage.css'
import { API_BASE_URL } from "../service/api-config";
import axios from "axios";
import Modal from "../components/Modal";
import useModal from "../context/useModal";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";

const MyPage = () => {
    //state
    const token = window.localStorage.getItem("token");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 에러 상태
    const [passwordConfirm, setPasswordConfirm] = useState(''); //비밀번호 확인 상태만 따로 저장 (비교용도)
    const [socialImgPreview, setSocialImgPreview] = useState(userData.profilePhoto); //소셜로그인 프로필 사진
    const [ImgPreview, setImgPreview] = useState(`http://localhost:8080${userData.profilePhoto}`); //그냥로그인 프로필
    //ref
    const inputImgRef = useRef(null);
    //context
    const { loginSuccess, setLoginSuccess } = useContext(ProjectContext);
    //navigate
    const navigate = useNavigate();
    //modal 사용
    const {
        isModalOpen,
        modalTitle,
        modalMessage,
        modalActions,
        openModal,
        closeModal,
    } = useModal();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true); // 로딩 시작
                const token = localStorage.getItem("token"); // Authorization 토큰 가져오기
                const logData = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${API_BASE_URL}/mypage`, logData);
                setUserData(response.data.value);
                console.log("useEffect 초기 상태 :", response.data.value);
                setSocialImgPreview(response.data.value.profilePhoto);
                setImgPreview(`http://localhost:8080${response.data.value.profilePhoto}`);
            } catch (error) {
                console.error("Error fetching user info:", error);
                setError(error); 
            } finally {
                setLoading(false); // 로딩 종료
            }
        };
        fetchUserInfo();
    }, [])

    //회원 삭제
    const handleDeleteAccount = async () => {
        if (window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?")) {
          try {
            const response = await axios.delete(`${API_BASE_URL}`, {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            });
            window.localStorage.removeItem("token");
            setLoginSuccess(false);
            openModal({
                title: "회원탈퇴",
                message:"탈퇴 되었습니다.",
                actions : [{label : "확인", onClick: () => {closeModal(); setTimeout(() => navigate("/login"), 500)}}],
            })
            
          } catch (error) {
            console.error("회원 삭제 실패:", error);
            alert("회원 삭제 중 오류가 발생했습니다.");
          }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleProfileClick = () => {
        if (inputImgRef.current) {
            inputImgRef.current.click();
        }
    };

    const ImageUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setUserData((prev) => ({
                ...prev,
                profilePhoto: file,
            }));
            const reader = new FileReader();
            reader.onload = () => {
                // userData.authProvider === null? (setImgPreview(reader.result)) : (setSocialImgPreview(reader.result));
                setSocialImgPreview(reader.result);
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    //회원 수정
    const modify = async(e) => {
        e.preventDefault();
        const emptyValue = Object.keys(userData).find((key) => {
            const value = userData[key];
            return typeof value === 'string' && value.trim() === '';
        });

        if(emptyValue){
            openModal({
                title:"입력오류",
                message:"빈값이 존재합니다. 확인 후 다시 시도하세요.",
                actions:[{label: "확인", onClick:closeModal}],
            })
            return;
        }
        if (userData.authProvider === null && userData.password !== passwordConfirm) {
            openModal({
                title: "비밀번호 오류",
                message: "비밀번호가 일치하지 않습니다.",
                actions: [{ label: "확인", onClick: () => closeModal() }],
            });
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append("id",userData.id);
            formData.append("userName", userData.userName);
            formData.append("email", userData.email);
            formData.append("password",userData.password);
          
            if(userData.profilePhoto instanceof File){
                formData.append("profilePhoto", userData.profilePhoto);
            }else if(userData.profilePhoto){
                formData.append("profilePhoto", userData.profilePhoto);
            }
            
            const response = await axios.put(`${API_BASE_URL}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            if(response.status===200){
                openModal({
                    title: "수정 성공",
                    message: "정보가 수정되었습니다.",
                    actions : [{label : "확인", onClick: () => {closeModal(); setTimeout(() => navigate("/"))}}],
                })
            }
        } catch (error) {
            if(error.response){
                const {message, status} = error.response.data;
                openModal({
                    title: "수정 실패",
                    message: `실패함 상태 : ${status} : ${message}`,
                    actions : [{label : "확인", onClick: () => {closeModal(); setTimeout(() => navigate("/mypage"))}}],
                })
            }else{
                openModal({
                    title:"연결 오류",
                    message:"스프링 연결 상태를 확인하세요.",
                    actions:[{label: "확인", onClick:closeModal}],
                })
            }
            
        }
    }

    return (
        <div className="container">
            <div id="myPage">
                <h2>마이 페이지</h2>
                <div className="myPageContents">
                    <div id="profileFrame">
                        <div className="UserImg">
                            {userData.authProvider? 
                                <img src={String(userData.authProvider) !== -1? socialImgPreview : ImgPreview} alt="프로필 사진"/>:
                                <img src={String(userData.profilePhoto).indexOf("http") !== -1? socialImgPreview : ImgPreview} alt="프로필 사진"/>
                            }
                        </div>
                        <button type="button" className='profileChangeBtn' onClick={handleProfileClick}>프로필 사진</button>
                        <input name="profilePhoto" type="file" accept="image/*" ref={inputImgRef} onChange={ImageUpload}/>
                    </div>
                    <div id="myInfoFrame">
                        <form onSubmit={(e)=>modify(e)}>
                            <div id="myInfo">
                                <div className="infoInput">
                                    <label for="userId">ID :</label>
                                    <input name="id" id="userId" value={userData.id} readOnly/>
                                </div>
                                {userData.authProvider !== null? '': (
                                    <>
                                        <div className="infoInput">
                                            <label for="pwd">비밀번호 :</label>
                                            <input name="password" id="pwd" type="password" value={userData.password} onChange={handleInputChange} />
                                        </div>
                                        <div className="infoInput">
                                            <label for="pwdcf">비밀번호 확인 :</label>
                                            <input id="pwdcf" type="password" onChange={(e)=>setPasswordConfirm(e.target.value)} value={passwordConfirm}/>
                                        </div>
                                    </>
                                    
                                )}
                                <div className="infoInput">
                                    <label for="name">이름 :</label>
                                    <input name="userName" id="name" value={userData.userName} onChange={handleInputChange}/>
                                </div>
                                <div className="infoInput">
                                    <label for="userEmail">이메일 :</label>
                                    <input name="email" id="userEmail" value={userData.email} onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="myPageBtns">
                                <button type="submit">내정보 수정</button>
                                <button type="button" onClick={handleDeleteAccount}>회원 탈퇴</button> 
                            </div>
                        </form>
                    </div>
                </div>
                
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
export default MyPage;