import React, { useContext, useEffect, useState } from "react";
import "../css/Header.css";
import "../css/Reset.css";
import logo from "../img/Logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import useModal from "../context/useModal";
import { addDays } from "date-fns";
// import { API_BASE_URL } from "../service/api-config";
// import axios from "axios";
// import { format } from "date-fns";
// import NewTrip from "../screen/NewTrip";

const Header = () => {
  const {
    loginSuccess,
    setLoginSuccess,
    token,
    tripTitle,
    setTripTitle,
    tripDates,
    setTripDates,
  } = useContext(ProjectContext);
  const navigate = useNavigate();

  const [isNewPlanModal, setIsNewPlanModal] = useState(false);
  // const [tripInfo, setTripInfo] = useState({
  //   title: "",
  //   startDate: "",
  //   lastDate: "",
  // });

  //modal창 상태
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (token && !loginSuccess) {
      setLoginSuccess(true);
    }
  }, [token]);

  //로그아웃 버튼 클릭시 함수
  const handleLogout = () => {
    setLoginSuccess(false);
    localStorage.removeItem("token");
    closeModal();
    navigate("/login");
  };

  //로그아웃 전용 모달창
  const openLogoutModal = () => {
    setIsNewPlanModal(false);
    openModal({
      title: "로그아웃",
      message: "로그아웃 하시겠습니까?",
      actions: [
        {
          label: "로그아웃",
          onClick: handleLogout,
          className: "logout-button",
        },
        { label: "취소", onClick: closeModal, className: "cancel-button" },
      ],
    });
  };

  const handleNewPlanSubmit = async () => {
    if (!tripTitle || !tripDates.startDate || !tripDates.endDate) {
      openModal({
        title: "입력 오류",
        message: "여행 제목과 출발, 도착 날짜를 모두 입력해주세요.",
        actions: [{ label: "확인", onClick: closeModal }],
      });
      return;
    }
    try {
      //   const response = await axios.post(
      //     `${API_BASE_URL}/1`,
      //     {
      //       title: tripTitle,
      //       startDate: formattedStartDate,
      //       lastDate: formattedEndDate,
      //     },
      //     logData
      //   );
    } catch (error) {
      console.log("에러결과 : ", error);
    }
    console.log("Trip saved:", {
      title: tripTitle,
      startDate: tripDates.startDate,
      lastDate: tripDates.endDate,
    });

    // setTripTitle("");
    // setTripDates({ startDate: null, endDate: null });
    closeModalWithReset();
  };

  const openNewPlanModal = () => {
    setIsNewPlanModal(true);
    openModal({
      title: "새로운 여행 계획",
      message: "",
      actions: [],
    });
  };

  const closeModalWithReset = () => {
    setIsNewPlanModal(false);
    closeModal();
  };

  //Link to부분은 화면 확인을 위해 임시로 넣은 주소입니다.
  return (
    <div className="header">
      <Link className="logo" to={"/"}>
        <img className="headerLogo" src={logo} alt="Logo" />
      </Link>
      <nav className="menuBar">
        <Link className="menu" to={"/checklist"}>
          CheckList
        </Link>
        <Link className="menu" to={"/entireplan"}>
          My Plan
        </Link>
        <Link className="menu" to={"/newtrip"} onClick={openNewPlanModal}>
          New Plan
        </Link>
      </nav>
      <div className="headerBtn">
        {loginSuccess ? (
          <>
            <div>
              <Link className="logout" onClick={openLogoutModal}>
                LOGOUT
              </Link>
              <Link className="mypage" to={"/mypage"}>
                MYPAGE
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link className="login" to={"/login"}>
              LOGIN
            </Link>
            <Link className="signup" to={"/signup"}>
              SIGNUP
            </Link>
          </>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModalWithReset}
        title={isNewPlanModal ? "새로운 여행 계획" : "로그아웃"}
        className={isNewPlanModal ? "modal-trip-plan" : "modal-default"}
        content={
          isNewPlanModal ? (
            <div className="tripPlan_content">
              <div className="tripTile">
                <label>
                  여행 제목:
                  <input
                    type="text"
                    name="tripTitle"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                  />
                </label>
              </div>
              <div className="tripDates">
                <div className="dateContents">
                  <h3>여행 기간</h3>
                  <DatePicker
                    selected={tripDates.startDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setTripDates({
                        startDate: start,
                        endDate: end,
                      });
                    }}
                    startDate={tripDates.startDate}
                    endDate={tripDates.endDate}
                    minDate={new Date()}
                    maxDate={tripDates.startDate ? addDays(tripDates.startDate, 9) : null}
                    selectsRange
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                    inline
                  />
                  {tripDates.startDate && tripDates.endDate && (
                    <div>
                      <p>여행 이름 : {tripTitle}</p>
                      <p>
                        출발 : {tripDates.startDate.toLocaleDateString("ko-KR")}
                      </p>
                      <p>
                        도착 : {tripDates.endDate.toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>로그아웃 하시겠습니까?</p>
          )
        }
        actions={
          isNewPlanModal
            ? [
                {
                  label: "저장",
                  onClick: handleNewPlanSubmit,
                  className: "save-button",
                },
                {
                  label: "취소",
                  onClick: closeModal,
                  className: "cancel-button",
                },
              ]
            : [
                {
                  label: "로그아웃",
                  onClick: handleLogout,
                  className: "logout-button",
                },
                {
                  label: "취소",
                  onClick: closeModal,
                  className: "cancel-button",
                },
              ]
        }
      />
    </div>
  );
};

export default Header;
