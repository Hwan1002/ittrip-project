import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 상태

  // 로그인한 사용자 정보const [userInfo, setUserInfo] = useState(null);  

  const [imagePreview, setImagePreview] = useState(null); //프로필 이미지 url 상태

    const setUserData = (data) => {
        // setUserInfo(data);
        setLoginSuccess(true);
    };
  
  return (
    <ProjectContext.Provider value={{ loginSuccess, setLoginSuccess, imagePreview, setImagePreview}}>
      {children}
    </ProjectContext.Provider>
  );
};