import React, { useState } from "react";
import Logo from "../components/Logo";
import '../css/NewTrip.css'

import Map from "../components/Map.js"
import Plus2 from "../img/plus2.svg"
import AddData from "../components/AddData.js";

import AddRoot from "../components/AddRoot.js";


const NewTrip = () => {
    // useState
    const [tripName, setTripName] = useState(''); // 여행이름 저장
    const [tripLocal, setTripLocal] = useState(''); // 여행 지역 저장
    const [tripDays, setTripDays] = useState(0);  // 여행일정 저장

    return (
        <div className="newTrip">



                <h2 className="title">새로운 여행 하기</h2>

                {/* input 3개 나란히 */}
                <div>
                    <input
                        className="bigPlan"
                        placeholder="여행 이름을 입력해 주세요"
                        onChange={(e) => {
                            setTripName(e.target.value)
                        }} />
                    <input
                        className="bigPlan"
                        placeholder="여행 지역을 입력해 주세요"
                        onChange={(e) => {
                            setTripLocal(e.target.value)
                        }} />
                    <input
                        className="bigPlan"
                        placeholder="몇 일 일정인가요? (숫자입력)"
                        onChange={(e) => {
                            setTripDays(Number(e.target.value))
                        }} />
                </div>
                
                {/* 경로설정 부분 */}
                <div id="rootSet">
                    <h2 style={{ color: "#706F6F", marginTop:"25px"}}>경로 설정</h2>

                   
                    
                    {/* 지도, 경로추가부분 */}
                    <div id="locationFrame">
                        <div id="newMap"><Map/></div>
                        <div id="addDirectionFrame">

                            <AddData width="200px"/>


                        </div>
                    </div >
                    <div id="checkAndEnd">
                        <div id="checkListFrame">
                            <h2 style={{ color: "#706F6F", marginTop:"30px"}}>체크리스트</h2>
                            <div id="checkList" >
                                <AddData width="300px"/>
                            </div>
                        </div>
                        <div id="endBtFrame">
                            <button  id="newEnd"><p style={{marginLeft:"40px"}} onClick={()=>{alert("새로운 여행이 추가되었습니다")}}>새로운 여행 추가</p> <img src={Plus2}   style={{marginLeft:"25px", width:"28px"}}/></button>

                    
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NewTrip;
