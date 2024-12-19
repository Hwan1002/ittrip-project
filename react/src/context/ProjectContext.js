import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

  //회원 토큰 인증을 위한 필수 데이터들
  const token = window.localStorage.getItem("token");
  //axios시 헤더에 토큰을 같이 보내서 인증을 거쳐야함
  const logData = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //로그인 상태
  const [loginSuccess, setLoginSuccess] = useState(false); 
  //프로필 이미지 url 상태
  const [imagePreview, setImagePreview] = useState(null); 

  //newtrip에서 출발,경유,도착지 주소 저장
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
  
  //로그인하게 되면 상태값 전환
  const setUserData = (data) => {
    setUserInfo(data);
    setLoginSuccess(true);
  };

  //여행 제목,날짜, 저장값 눌렀을때 상태 값들
  const [tripTitle, setTripTitle] = useState("");
  const [tripDates, setTripDates] = useState({
    startDate: null,
    endDate: null,
  });

  // const [mapObject, setMapObject] = useState([]);
  const [mapObject, setMapObject] = useState([]);

  //addData (newTrip 페이지)
  //출발지 객체 상태 관리
  const [departure, setDeparture] = useState({
    title: '',
    address :'',
  });
  //경유지 배열 상태 관리
  const [stopOverList, setStopOverList] = useState([]);
  //도착지 객체 상태 관리
  const [destination, setDestination] = useState({
    title:'',
    address:'',
  })



  //체크리스트 input 값
  const [input, setInput] = useState("");
  //체크리스트 배열
  const [items,setItems] = useState([]);

  const [markers,setMarkers] = useState([]);

  const [signguNm , setSignguNm]  =useState([]) ;


  const value = {
    loginSuccess,setLoginSuccess,
    imagePreview,setImagePreview,
    userInfo,setUserInfo,
    setUserData,
    token,logData,
    tripTitle,setTripTitle,
    tripDates,setTripDates,
    input,setInput,
    items,setItems,
    address,setAddress,
    startPoint,setStartPoint,
    goalPoint,setGoalPoint,
    wayPoints,setWaypoints,
    path, setPath,
    markers,setMarkers,
    signguNm , setSignguNm,
    mapObject,setMapObject,
    departure, setDeparture,
    stopOverList, setStopOverList,
    destination, setDestination
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
