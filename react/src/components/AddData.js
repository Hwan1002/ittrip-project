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
    
    //context 활용
    const {
      setAddress,
      setPath,
      wayPoints, 
      startPoint, 
      goalPoint,
      departure, setDeparture,
      stopOverList, setStopOverList,
      destination, setDestination,
      selectedDay,setSelectedDay,
      mapObject,setMapObject
    } = useContext(ProjectContext);

    //모달창 사용
    const {
        isModalOpen,
        modalTitle,
        modalActions,
        modalMessage,
        openModal,
        closeModal
    } = useModal();
    

    const putObject = () => {         //Day를 옮길 때(selectedDay 값이 바뀌기 전에 작동)              //4444
      const foundData = mapObject.find(data=> data.days === selectedDay+1);
      if(foundData){
      if(foundData.StartAddress!== departure.address || JSON.stringify(foundData.wayPoints) !== JSON.stringify(stopOverList) || foundData.goalAddress !== destination.address){
        const newArr = mapObject.filter(data => data.days !== selectedDay+1);
        setMapObject([...newArr]);
      }
    }
      setMapObject((prevMapObject) => [
        ...prevMapObject,
        {
          days: selectedDay + 1,
          startPlace: departure?.title || "", // 방어적으로 title 확인
          startAddress: departure?.address || "",
          goalPlace: destination?.title || "",
          goalAddress: destination?.address || "",
          wayPoints: stopOverList || [],
        },
      ]);

      alert(`Day${selectedDay+1} 저장 완료`);
    }

    // const initObject= () => {   //출발,경유,목적 상태 초기화                  //5555
    //   setDeparture({title:'',address:''});
    //   setStopOverList([]);
    //   setDestination({title:'',address:''});
    // }

    useEffect(()=>{
      console.log("검색 결과 업데이트 됨 :" , res);
    },[res])

    //출발,도착,경유 타입에 따라서 저장 방식 달라짐
    const handleCheck = (item,type) => {
      setAddress(item.address);
      switch(type) {
        case "departure":
          setDeparture({title: item.title, address: item.address});
          break;
        case "destination": 
          setDestination({title:item.title, address:item.address});
          break; 
        case "stopOver": 
        setStopOverList((prevList) => [
          ...prevList.slice(0,-1), // 기존의 stopOverList에 추가
          { id: Date.now(), value: item.title, address : item.address } // 새로운 아이템 강제로 추가
        ]);
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
      putObject();
    }
    
    const handleSearch = async(value, updateState, modalTitle) => {
      if(!value){
        setRes([]);
        openModal({
          message:`${modalTitle}를 입력해주세요.`,
          actions: [{ label:"확인", onClick:closeModal, className:"cancel-button"}],
        })
        return;
      }else{
        try {
          const newData = [...data,value];
          const response = await axios.get(`${API_BASE_URL}/local`,{
            params:{query : value}
          });
          setRes(response.data.items);
          setData(newData)
          updateState(value);
          openModal({
            title:modalTitle,
            message:"재검색 해주세요."
          });
          
        } catch (error) {
          console.error(`검색 handleSearch 쪽 오류 : ${error}`);
          alert("handleSearch 검색 오류");
        }
      }
      
    }

    //경유지 추가 버튼
    const plusBtnClicked = () => {
      setStopOverList([...stopOverList, {id:Date.now(),value:""}]);
      
    }

    const handleStopOverChange = (id, value) => {
      setStopOverList(
        stopOverList.map((stopOver) => stopOver.id === id? {...stopOver, value} : stopOver)
      )
    }

    //경유지 삭제 버튼
    const removeStopOver = (id) => {
      console.log(id);
      setStopOverList(stopOverList.filter((stopOver)=>stopOver.id!==id))
    }

    return (
        <div className="addData">
          {/* 출발지 input */}
          <div className="departSearch">
              <input type="text" placeholder="출발지를 검색하세요." value={departure.title?.replace(/<\/?[^>]+(>|$)/g, "") || ""} onChange={(e) => setDeparture((prev) => ({ ...prev, title: e.target.value}))}/>
              <button className="addDataBtns" type="button" onClick={()=>handleSearch(departure.title,setDeparture,"출발지")}>출발</button>
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
                경유
              </button>
              <button className="removeBtn" type="button" onClick={()=>removeStopOver(stopOver.id)}>삭제</button>
            </div>
            ))
          }
          {/* plus 경유지 추가 버튼  */}
          {departure.title && destination.title && (
            <div className="plusBtn">
              <button type="button" onClick={plusBtnClicked}>경유지 추가</button>
            </div>
          )}
          {/* 도착지 input */}
          <div className="destinateSearch">
            {/* {destination?
              <input type="text" onChange={(e)=> setDestination(e.target.value)} value={destination.replace(/<\/?[^>]+(>|$)/g, "")}/> : <input type="text" placeholder="도착지를 검색하세요." onChange={(e) => setSearchInput2(e.target.value)}/>
            } */}
            <input type="text" placeholder="도착지를 검색하세요." value={destination.title?.replace(/<\/?[^>]+(>|$)/g, "") || ""} onChange={(e) => setDestination((prev) => ({...prev, title: e.target.value}))}/> 
              <button className="addDataBtns" type="button" onClick={()=>handleSearch(destination.title,setDestination,"도착지")}>도착</button>
          </div>
          <button className="saveBtn" type="button" onClick={handlecoordinate}>경로 저장하기</button>
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
                    modalMessage
                  )
                  }
                </div>
              }
              actions={modalActions}
          />
        </div>
    );
}
export default AddData;

