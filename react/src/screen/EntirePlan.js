import React from "react";
import "../css/EntirePlan.css"
import { Link } from "react-router-dom";
import Map from "../components/Map";
import '../css/Reset.css'
import Plus2 from "../img/plus2.svg"

import AddData from "../components/AddData";

const EntirePlan = () => {


    return (
        <div id='entirePlan'>
            <h2 style={{textAlign:'center', marginBottom:0}}>내일정 보기</h2>
        <div id="mapPlanContain">
            <div id="mapFrame">
                <Map />
            </div>
            
            <div id="planFrame">
            {/* 여행목록 */}
            <p className="entireTitle">여행목록</p>
            <div className="entireScroll">
                <Link to="/newTrip"><div id="newTripBt"><p style={{marginLeft:"15px"}}>새로운 여행 추가</p> <img src={Plus2}  width="28px" style={{marginLeft:"15px"}}/></div></Link>
            </div>

            <p className="entireTitle" >여행경로</p>
            <div className="entireScroll">
                
            </div>

            <p className="entireTitle">체크리스트</p>
            <div className="entireScroll">
                
            </div>

            </div>
        </div>
        </div>
    )
}

export default EntirePlan