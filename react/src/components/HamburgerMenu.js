import React, { useContext, useState } from "react";
import "../css/HamburgerMenu.css"; // CSS 파일
import { Link } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
      loginSuccess,
    } = useContext(ProjectContext);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* 어두운 배경 */}
      <div 
        className={`backdrop ${isOpen ? "show" : ""}`} 
        onClick={() => setIsOpen(false)} 
      />
      
      <div className="hamburger-menu">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* 메뉴 슬라이드 */}
        <nav className={`hbgMenu ${isOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/home" onClick={toggleMenu}>Main</Link></li>
            <li><Link to="/entireplan" onClick={toggleMenu}>My Plan</Link></li>
            <li><Link to="/newtrip" onClick={toggleMenu}>New Trip</Link></li>
            <Link className="mypage" to={"/mypage"} onClick={toggleMenu}>MYPAGE</Link>
            {loginSuccess ? (
              <>
                <li>
                  <Link to={"/"} onClick={toggleMenu}>LOGOUT</Link>
                </li>
                <li>
                  <Link className="mypage" to={"/mypage"} onClick={toggleMenu}>MYPAGE</Link>
                </li>
              </>
              ) : (
                <>
                  <li>
                    <Link to={"/login"} onClick={toggleMenu}>LOGIN</Link>
                  </li>
                  <li>
                    <Link to={"/signup"} onClick={toggleMenu}>SIGNUP</Link>
                  </li>
                </>
              )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
