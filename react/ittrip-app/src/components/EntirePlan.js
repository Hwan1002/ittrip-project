import React from "react";
import "../css/EntirePlan.css"
import { Link } from "react-router-dom";
import Map from "./Map";
const EntirePlan = () => {
    

    return (
        <div id="entirePlan">
            <div id="mapFrame">
            <Map />
            </div>
            <div id="plan">
                <Link ><div id="newPlan">새로운 여행 추가 <img src="" /></div></Link>
            </div>
        </div>
    )
}

export default EntirePlan