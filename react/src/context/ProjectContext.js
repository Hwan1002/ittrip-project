import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false); // 로그인 상태
  const [imagePreview, setImagePreview] = useState(null); //프로필 이미지 url 상태
  return (
    <ProjectContext.Provider value={{ loginSuccess, setLoginSuccess, imagePreview, setImagePreview }}>
      {children}
    </ProjectContext.Provider>
  );
};