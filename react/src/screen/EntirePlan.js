import React from "react";
import "../css/EntirePlan.css"
import { Link } from "react-router-dom";
import Map from "../components/Map";
import '../css/Reset.css'
import Plus2 from "../img/plus2.svg"
import Scroll from "../components/Scroll";
import AddData from "../components/AddData";

const EntirePlan = () => {
    //임시 여행리스트
    const tripList = ["여행1", "여행2", "여행3", "여행", "여행", "여행", "여행", "여행", "여행", "여행", "여행"]

    return (
        <div id="entirePlan">
            <div id="mapFrame">
                <Map />
            </div>
            <div id="planFrame">
                <Link to="/newTrip"><div id="newTripBt"><p style={{marginLeft:"15px"}}>새로운 여행 추가</p> <img src={Plus2}  width="28px" style={{marginLeft:"15px"}}/></div></Link>
                <Scroll title="여행목록" style={{width:"300px",height:"160px"}} list={tripList}/>
                <Scroll title="여행경로" style={{width:"300px",height:"160px"}} list={tripList}/>
                <Scroll title="체크리스트" style={{width:"300px",height:"160px"}} list={tripList}/>
            </div>
        </div>
    )
}

export default EntirePlan