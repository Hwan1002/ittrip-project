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
  // useState
  // const [setTripName] = useState(""); // 여행이름 저장
  // const [setTripLocal] = useState(""); // 여행 지역 저장
  // const [setTripDays] = useState(0); // 여행일정 저장
  const { tripTitle, tripDates, logData,items,mapObject,initObject,setSelectedDay,dayChecks } = useContext(ProjectContext);

  const buttonClicked = async () => {
    if(mapObject.length!==dayChecks.length){
      const mapConfirm = window.confirm("저장하지 않은 날짜가 있습니다. 저장하시겠습니까?");
      if (!mapConfirm) {
        return;
      }
    }
    try {
      //여행제목, 출발일,도착일 받아서 db 저장 axios 
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
    //map db저장 axios
    
    try {
      const response = await axios.post(`${API_BASE_URL}/2`,
        {
          tripTitle: tripTitle,
          mapObject : mapObject
        },
        logData
      );
       alert("저장 성공");
       initObject();
       setSelectedDay(0);
    } catch (error) {
      console.log(mapObject);
      alert("post2 에러");
      
    }
    

    //체크리스트 db저장 axios
    try {
      const response = await axios.post(`${API_BASE_URL}/3`,
        {
          tripTitle: tripTitle,
          items : items
        },
        logData
      );
       console.log(response.data);
    } catch (error) {
      console.log(items);
      alert("post3 에러");
      
    }
  };

  return (
    <div className="newTrip">
      <h2 >새로운 여행 하기</h2>

      {/* 경로설정 부분 */}
      <div id="rootSet">
        <h3 style={{ color: "#706F6F", marginTop: "25px" }}>경로 설정</h3>
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
          <div>
            <h3 style={{ color: "#706F6F", marginTop: "25px" }}>체크리스트</h3>
            <div id='checkList'>
              <CheckList />
            </div>
          </div>
          <div id="endBtFrame">
            <button id="newEnd" onClick={buttonClicked}>
              새로운 여행 추가
              <img src={Plus2} width="25px" style={{ marginLeft: "15px" }} alt="새로운 여행"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;
