import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 상태

  const [userInfo, setUserInfo] = useState(null);  // 로그인한 사용자 정보

    const setUserData = (data) => {
        setUserInfo(data);
        setLoginSuccess(true);
    };

  
  return (
    <ProjectContext.Provider value={{ loginSuccess, setLoginSuccess ,userInfo,setUserData}}>

      {children}
    </ProjectContext.Provider>
  );
};