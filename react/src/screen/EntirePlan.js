import React from "react";
import "../css/EntirePlan.css"
import { Link } from "react-router-dom";
import Map from "../components/Map";
import '../css/Reset.css'
import Plus2 from "../img/plus2.svg"

import AddData from "../components/AddData";

const EntirePlan = () => {


    return (
        <div id="entirePlan">
            <div id="mapFrame">
                <Map />
            </div>
            
            <div id="planFrame">
                <Link to="/newTrip"><div id="newTripBt"><p style={{marginLeft:"15px"}}>새로운 여행 추가</p> <img src={Plus2}  width="28px" style={{marginLeft:"15px"}}/></div></Link>
                
            {/* 여행목록 */}
            <p style={{ color: "#F6A354",fontSize:"20px", marginBottom: "5px"}}>여행목록</p>
            <div
                style={{
                    border: "2px solid #DADADA",
                    borderRight: "none",
                    borderLeft: "none",
                    overflowY: "auto",  // 세로 스크롤을 가능하게 함 
                    padding: "10px",  // 내부 여백을 추가 (선택 사항)
                    width:"300px",
                    height:"160px"
                }}
            >
                여행
            </div>

            <p style={{ color: "#F6A354",fontSize:"20px", marginBottom: "5px"}}>여행경로</p>
            <div
                style={{
                    border: "2px solid #DADADA",
                    borderRight: "none",
                    borderLeft: "none",
                    overflowY: "auto",  // 세로 스크롤을 가능하게 함 
                    padding: "10px",  // 내부 여백을 추가 (선택 사항)
                    width:"300px",
                    height:"160px"
                }}
            >
                여행
            </div>

            <p style={{ color: "#F6A354",fontSize:"20px", marginBottom: "5px"}}>체크리스트</p>
            <div
                style={{
                    border: "2px solid #DADADA",
                    borderRight: "none",
                    borderLeft: "none",
                    overflowY: "auto",  // 세로 스크롤을 가능하게 함 
                    padding: "10px",  // 내부 여백을 추가 (선택 사항)
                    width:"300px",
                    height:"160px"
                }}
            >
                여행
            </div>

            </div>
        </div>
    )
}

export default EntirePlan