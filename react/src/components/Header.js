import React, { useContext,useEffect,useState } from "react";
import '../css/Header.css'
import '../css/Reset.css'

import logo from '../img/Logo/logo.svg'





import { Link, useNavigate } from "react-router-dom";

import Modal from "./Modal";

import { ProjectContext} from "../context/ProjectContext";


import useModal from "../context/useModal";

const Header=()=>{
    
    const { loginSuccess, setLoginSuccess } = useContext(ProjectContext);
    const navigate = useNavigate();

    const [tripTitle, setTripTitle] = useState("");
    const [tripDates, setTripDates] = useState({startDate : "" , endDate: ""});
    const [isNewPlanModal, setIsNewPlanModal] = useState(false);

    
     //modal창 상태
     const {
        isModalOpen,
        modalTitle,
        modalMessage,
        modalActions,
        openModal,
        closeModal,
    } = useModal();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !loginSuccess) {
            setLoginSuccess(true);
        }
    }, [setLoginSuccess, loginSuccess]);

    //로그아웃 버튼 클릭시 함수
    const handleLogout = () => {
        setLoginSuccess(false);
        localStorage.removeItem("token");
        alert("로그아웃 성공");
        closeModal();
        navigate("/login");
    };
    //로그아웃 전용 모달창
    const openLogoutModal = () => {
        setIsNewPlanModal(false);
        openModal({
            title:"로그아웃",
            message:"로그아웃 하시겠습니까?",
            actions : [{
                label : "로그아웃",
                onClick : handleLogout,
                className : "logout-button",
            },
            {
                label : "취소",
                onClick : closeModal,
                className : "cancel-button",
            },
        ]
        });
    };

    //날짜 받는 input handle
    const handleTripInput = (e) => {
        const {name, value} = e.target;
        setTripDates((prev) => ({...prev,[name]:value}));
    };
    
    const handleNewPlanSubmit = () => {
        if(!tripDates.startDate || !tripDates.endDate){
            openModal({
                title: "입력 오류",
                message:"출발 날짜와 도착 날짜를 모두 입력해주세요.",
                actions : [{label : "확인", onClick: closeModal}],
            })
            //DB에 저장할 함수 추가 하는 걸로
            setTripDates(tripDates.startDate, tripDates.endDate);
            return;
        }
        setTripDates({startDate:"", endDate:""});
        closeModalWithReset();
    }

    const openNewPlanModal = () => {
        setIsNewPlanModal(true);
        openModal({
            title: "새로운 여행 계획",
            message:"",
            actions : [],
        })
    };

   const closeModalWithReset = () => {
        setIsNewPlanModal(false);
        closeModal();
   }
    

    //Link to부분은 화면 확인을 위해 임시로 넣은 주소입니다.
    return(
        <div className="header">
            <Link className="logo" to={'/'}>
                <img className="headerLogo" src={logo} alt="Logo"/>
            </Link>
            <nav className="menuBar">
                <Link className="menu" to={'/'}>Main</Link>
                <Link className="menu" to={'/entireplan'}>My Plan</Link>
                <Link className="menu" to={'/mypage'}>Main page</Link>
                <Link className="menu" to={'/newtrip'} onClick={openNewPlanModal}>New Plan</Link>


            </nav>
            <div className="headerBtn">
                {loginSuccess ? (
                    <>
                        <Link className="logout" onClick={openLogoutModal}>LOGOUT</Link>
                        <Link className="mypage" to={'/mypage'}>MYPAGE</Link>
                    </>
                ):(
                    <>
                        <Link className="login" to={'/login'}>LOGIN</Link>
                        <Link className="signup" to={'/signup'}>SIGNUP</Link>
                    </>
                )}
            </div>
            {/* <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="로그아웃"
                    content={<p>로그아웃 하시겠습니까?</p>}
                    actions={[
                        {label: "로그아웃", onClick: handleLogout, className:"logout-button"},
                        {label: "취소", onClick: closeModal, className:"cancel-button"},
                    ]}
            /> */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModalWithReset}
                title={isNewPlanModal ? "새로운 여행 계획" : "로그아웃"}
                content={
                    isNewPlanModal ? (
                        <div className="tripPlan_content" >
                            <label>
                                여행 제목:
                                <input
                                    type="text"
                                    name="tripTitle"
                                    value={tripTitle}
                                    onChange={handleTripInput}
                                />
                            </label>
                            <label>
                                출발 날짜:{" "}
                                <input
                                    type="date"
                                    name="startDate"
                                    value={tripDates.startDate}
                                    onChange={handleTripInput}
                                />
                            </label>
                            <label>
                                도착 날짜:{" "}
                                <input
                                    type="date"
                                    name="endDate"
                                    value={tripDates.endDate}
                                    onChange={handleTripInput}
                                />
                            </label>
                        </div>
                    ) : (
                        <p>로그아웃 하시겠습니까?</p>
                    )
                }
                actions={
                    isNewPlanModal
                        ? [
                              { label: "저장", onClick: handleNewPlanSubmit, className: "save-button" },
                              { label: "취소", onClick: closeModal, className: "cancel-button" },
                          ]
                        : [
                              { label: "로그아웃", onClick: handleLogout, className: "logout-button" },
                              { label: "취소", onClick: closeModal, className: "cancel-button" },
                          ]
                }
            />
        </div>
    )
}

export default Header