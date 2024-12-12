import React, { useState, useContext } from "react";
import "../css/NewTrip.css";
import Plus2 from "../img/plus2.svg";
import AddData from "../components/AddData.js";
import Map from "../components/Map.js";
import { ProjectContext } from "../context/ProjectContext.js";
import CheckList2 from "../components/CheckList.js";
import { API_BASE_URL } from "../service/api-config.js";
import axios from "axios";
import { format } from "date-fns";

const NewTrip = () => {
  // useState
  const [setTripName] = useState(""); // 여행이름 저장
  const [setTripLocal] = useState(""); // 여행 지역 저장
  const [setTripDays] = useState(0); // 여행일정 저장
  const { tripTitle, tripDates, input, token, logData } =
    useContext(ProjectContext);

  const buttonClicked = async () => {
    debugger;
    try {
      const formattedStartDate = format(tripDates.startDate, "yyyy-MM-dd");
      const formattedEndDate = format(tripDates.endDate, "yyyy-MM-dd");
      const response = await axios.post(
        `${API_BASE_URL}/1`,
        {
          title: tripTitle,
          startDate: formattedStartDate,
          lastDate: formattedEndDate,
        },
        logData
      );
    } catch (error) {
      alert("에러 내용:", error);
    }
    ///axios 추가 예정
    try {
      const response = await axios.post(
        `${API_BASE_URL}/3`,
        {
          tripTitle: tripTitle,
          checkList: input,
        },
        logData
      );
    } catch (error) {
      alert("post3 에러");
    }
  };

  return (
    <div className="newTrip">
      <h2 className="title">새로운 여행 하기</h2>

      {/* input 3개 나란히 */}
      {/* <div>
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
                 */}
      {/* 경로설정 부분 */}
      <div id="rootSet">
        <h2 style={{ color: "#706F6F", marginTop: "25px" }}>경로 설정</h2>
        {/* 지도, 경로추가부분 */}
        <div id="locationFrame">
          <div id="newMap">
            <Map />
          </div>
          <div id="addDirectionFrame">
            <AddData width="200px" />
          </div>
        </div>
        <div id="checkAndEnd">
          <CheckList2 />
          {/* <div id="checkListFrame">
            <h2 style={{ color: "#706F6F", marginTop: "30px" }}>체크리스트</h2>
            <div id="checkList">
              <AddData width="300px" />
            </div>
          </div> */}
          <div id="endBtFrame">
            <button id="newEnd" onClick={buttonClicked}>
              새로운 여행 추가
              <img src={Plus2} width="28px" style={{ marginLeft: "25px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;
