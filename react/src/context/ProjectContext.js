import React, { createContext, useState } from 'react';

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
  
  // 로그인한 사용자 정보
  const [userInfo, setUserInfo] = useState(null);  
  const setUserData = (data) => {
      setUserInfo(data);
      setLoginSuccess(true);
  };

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
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
