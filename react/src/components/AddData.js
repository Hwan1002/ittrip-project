import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { API_BASE_URL } from "../service/api-config";
import { ProjectContext } from "../context/ProjectContext";
import Modal from "./Modal";
import useModal from "../context/useModal";
import '../css/AddData.css';


const AddData = ({width}) => {
    //입력된 데이터를 저장할 배열
    const [data, setData] = useState([]); 
    //여러 개의 input을 관리하는 배열
    const [res, setRes] = useState([]);
    //입력값을 각각 따로 저장하기 위해 만든 state
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("")
    const [stopOverList, setStopOverList] = useState([]);
    //context 활용
    const {setAddress, setPath, wayPoints, startPoint, goalPoint} = useContext(ProjectContext);
    //모달창 사용
    const {
        isModalOpen,
        modalTitle,
        modalActions,
        openModal,
        closeModal
    } = useModal();


    //출발,도착,경유 타입에 따라서 저장 방식 달라짐
    const handleCheck = (item,type) => {
      console.log("핸들체크 item : ",item,"타입 : ",type);
      setAddress(item.address);
      switch(type) {
        case "departure":
          setDeparture(item.title);
          break;
        case "destination": 
          setDestination(item.title);
          break; 
        case "stopOver": 
        debugger;
        setStopOverList((prevList) => [
          ...prevList, // 기존의 stopOverList에 추가
          { id: Date.now(), value: item.title } // 새로운 아이템 강제로 추가
        ]);
          // setStopOverList((prevList) =>
          // prevList.map((stopOver) =>
          // stopOver.id === item.id? { ...stopOver, value: item.title}: stopOver)
          // );
        break;
        default: 
          console.log("handleCheck switch 케이스 쪽 오류");
      }
      closeModal();
      alert(`${type === "stopOver"? "경유지가" : type === "departure"? "출발지가" : "도착지가"} 추가되었습니다.`)
    }

    //좌표저장 (효용)
    const handlecoordinate = async () => {
      if (wayPoints) {
        const lnglatArray = wayPoints.map((points) => (points._lng + "," + points._lat));
        const lnglatString = lnglatArray.join("|");
        console.log("waypoint 있음", wayPoints)
        const response = await axios.get(`${API_BASE_URL}/12345`, {
          params: {
            start: `${startPoint._lng},${startPoint._lat}`,
            goal: `${goalPoint._lng},${goalPoint._lat}`,
            waypoints: lnglatString
          }
        });
        setPath(response.data.route.traoptimal[0].path);
      } else {
        console.log("waypoint 없음", wayPoints)
        const response = await axios.get(`${API_BASE_URL}/1234`, {
          params: {
            start: `${startPoint._lng},${startPoint._lat}`,
            goal: `${goalPoint._lng},${goalPoint._lat}`
          }
        })
        setPath(response.data.route.traoptimal[0].path)
      }
    }
    
    const handleSearch = async(value, updateState, modalTitle) => {
      if(!value){
        alert(`${modalTitle}를 입력해주세요.`);
        return;
      }
      try {
        const newData = [...data,value];
        const response = await axios.get(`${API_BASE_URL}/local`,{
          params:{query : value}
        });
        setRes(response.data.items);
        setData(newData)
        updateState(value);
        openModal({title:modalTitle});
        
      } catch (error) {
        console.error(`검색 handleSearch 쪽 오류 : ${error}`);
        alert("handleSearch 검색 오류");
      }
    }
    
    //경유지 추가 버튼
    const plusBtnClicked = () => {
      setStopOverList([...stopOverList, {id:Date.now(), value:""}]);
    }

    const handleStopOverChange = (id, value) => {
      setStopOverList(
        stopOverList.map((stopOver) => stopOver.id === id? {...stopOver, value} : stopOver)
      )
    }

    //경유지 삭제 버튼
    const removeStopOver = (id) => {
      setStopOverList(stopOverList.filter((stopOver)=>stopOver.id!==id))
    }

    return (
        <div className="addData">
          {/* 출발지 input */}
          <div className="departSearch">
              <input type="text" placeholder="출발지를 검색하세요." value={departure.replace(/<\/?[^>]+(>|$)/g, "")} onChange={(e) => setDeparture(e.target.value)}/>
              <button className="addDataBtns" type="button" onClick={()=>handleSearch(departure,setDeparture,"출발지")}>출발지 검색</button>
          </div>
          {/* 경유지 input */}
          {stopOverList.map((stopOver) => (
            <div className="stopOverSearch" key={stopOver.id}>
              <input type="text" placeholder="경유지를 입력하세요." value={stopOver.value.replace(/<\/?[^>]+(>|$)/g, "")} onChange={(e)=>handleStopOverChange(stopOver.id,e.target.value)}/>
              <button className="addDataBtns" type="button"
                onClick={() => handleSearch(stopOver.value,
                  (value) =>setStopOverList((prevList) =>
                    prevList.map((item) =>
                      item.id === stopOver.id ? { ...item, value } : item)), "경유지")
                }
              >
                경유지 검색
              </button>
              <button button className="removeBtn" type="button" onClick={()=> removeStopOver(stopOver.id)}>삭제</button>
            </div>
            ))
          }
          {/* plus 경유지 추가 버튼  */}
          {departure && destination && (
            <div className="plusBtn">
              <button type="button" onClick={plusBtnClicked}>+</button>
            </div>
          )}
          {/* 도착지 input */}
          <div className="destinateSearch">
            {/* {destination?
              <input type="text" onChange={(e)=> setDestination(e.target.value)} value={destination.replace(/<\/?[^>]+(>|$)/g, "")}/> : <input type="text" placeholder="도착지를 검색하세요." onChange={(e) => setSearchInput2(e.target.value)}/>
            } */}
              <input type="text" placeholder="도착지를 검색하세요." value={destination.replace(/<\/?[^>]+(>|$)/g, "")} onChange={(e) => setDestination(e.target.value)}/>
              <button className="addDataBtns" type="button" onClick={()=>handleSearch(destination,setDestination,"도착지")}>도착지 검색</button>
          </div>
          <button className="addDataBtns" type="button" onClick={handlecoordinate}>저장</button>
          <Modal
              className="newTripModal"
              isOpen={isModalOpen}
              onClose={closeModal}
              title={modalTitle}
              content={
                <div className="searchList">
                  {res.length > 0 ? (
                    <ul>
                        {res.map((item, index) => 
                          <li key={item.title}>
                              <span className="listNumber">{index + 1}</span>
                              <p className="listTitle">{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                              {/* <button className="addressBtn" onClick={() => handleCheck(item)}>{item.address}</button> */}
                              {modalTitle === "출발지" &&(
                                  <button className="addressBtn" onClick={() => handleCheck(item, "departure")}>
                                    {item.address}
                                  </button>
                                )
                              }
                              {modalTitle === "도착지" && (
                                  <button className="addressBtn" onClick={() => handleCheck(item, "destination")}>
                                    {item.address}
                                  </button>
                                )
                              }
                              {modalTitle === "경유지" && (
                                <button className="addressBtn" onClick={() => handleCheck(item, "stopOver")}>
                                  {item.address}
                                </button>
                              )}
                          </li>
                        )}
                    </ul>
                  ) : (
                    <p>검색 결과가 없습니다.</p>
                  )}
                </div>
              }
              actions={modalActions}
          />
        </div>
    );
}
export default AddData;

