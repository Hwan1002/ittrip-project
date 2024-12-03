import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 상태
  
  return (
    <ProjectContext.Provider value={{ loginSuccess, setLoginSuccess }}>
      {children}
    </ProjectContext.Provider>
  );
};