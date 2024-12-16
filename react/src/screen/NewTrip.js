import React, { useContext } from "react";
import "../css/NewTrip.css";
import Plus2 from "../img/plus2.svg";
import AddData from "../components/AddData.js";
import Map from "../components/Map.js";
import { ProjectContext } from "../context/ProjectContext.js";
import CheckList from "../components/CheckList.js";
import { API_BASE_URL } from "../service/api-config.js";
import axios from "axios";
import { format } from "date-fns";


const NewTrip = () => {
  //context에서 필요한 상태값들 가져오기
  const { tripTitle, tripDates, input, logData } = useContext(ProjectContext);

  const buttonClicked = async () => {
    try {
      //모달에서 기입했던 날짜를 가져와서 형태 포맷
      const formattedStartDate = format(tripDates.startDate, "yyyy-MM-dd");
      const formattedEndDate = format(tripDates.endDate, "yyyy-MM-dd");
      const response = await axios.post(`${API_BASE_URL}/1`,
        {
          title: tripTitle,
          startDate: formattedStartDate,
          lastDate: formattedEndDate,
        },
        logData
      );
      console.log(response.data.value);
    } catch (error) {
      alert("에러 내용:", error);
    }
    //axios 추가
    try {
      const response = await axios.post(`${API_BASE_URL}/3`,
        {
          tripTitle: tripTitle,
          checkList: input,
        },
        logData
      );
      console.log(response.data.value);
    } catch (error) {
      alert("post3 에러");
    }
  };

  return (
    <div className="newTrip">
      <h2 className="title">새로운 여행 하기</h2>
      {/* 경로설정 부분 */}
      <div id="rootSet">
        <h2 style={{ color: "#706F6F", marginTop: "25px" }}>경로 설정</h2>
        {/* 지도, 경로추가부분 */}
        <div id="locationFrame">
          <div id="newMap">
            <Map/>
          </div>
          <div id="addDirectionFrame">
            <AddData width="200px"/>
            {/* <MapWithData /> */}
          </div>


        </div>
        <div id="checkAndEnd">
          <CheckList/>
          <div id="endBtFrame">
            <button id="newEnd" onClick={buttonClicked}>
              새로운 여행 추가
              <img src={Plus2} width="28px" style={{ marginLeft: "25px" }} alt="새로운 여행"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;
