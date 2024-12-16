import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  //회원 토큰 인증을 위한 필수 데이터들
  const token = window.localStorage.getItem("token");

  const logData = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 상태

  const [imagePreview, setImagePreview] = useState(null); //프로필 이미지 url 상태

  const [address , setAddress] = useState();


  // startPoint 출발지
  const [startPoint,setStartPoint] = useState();

  // goalPoint 도착지 
  const [goalPoint, setGoalPoint] = useState();

  
  // wayPoints  경유지
  const [wayPoints , setWaypoints ] = useState([]);

  const [path, setPath] = useState();








  // 로그인한 사용자 정보
  const [userInfo, setUserInfo] = useState(null);
  const setUserData = (data) => {
    setUserInfo(data);
    setLoginSuccess(true);
  };
  //여행 제목,날짜 값
  const [tripTitle, setTripTitle] = useState("");
  const [tripDates, setTripDates] = useState({
    startDate: null,
    endDate: null,
  });
  //체크리스트 input 값
  const [input, setInput] = useState([]);


  const value = {
    loginSuccess,
    setLoginSuccess,
    imagePreview,
    setImagePreview,
    userInfo,
    setUserInfo,
    setUserData,
    token,
    logData,
    tripTitle,
    setTripTitle,
    tripDates,
    setTripDates,
    input,
    setInput,
    address, 
    setAddress,
    startPoint,
    setStartPoint,
    goalPoint,
    setGoalPoint,
    wayPoints,
    setWaypoints,
    path, setPath,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
