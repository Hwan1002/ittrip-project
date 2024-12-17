import axios from "axios";
import React, { useState, useContext } from "react";
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
    const [searchInput1, setSearchInput1] = useState("");
    const [searchInput2, setSearchInput2] = useState("");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("")
    const [test, setTest] = useState(false);

    //모달창 사용
    const {
        isModalOpen,
        modalTitle,
        modalActions,
        openModal,
        closeModal
    } = useModal();
    //모달끝

    const {setAddress, setPath, wayPoints, startPoint, goalPoint} = useContext(ProjectContext);
    //handler 모음
    const handleCheck = (item) => {
      
        setAddress(item.address);

        if(test){
          setDestination(item.title)
        }else{
          setDeparture(item.title);
        }
        closeModal();
        alert("추가 되었습니다.")
    }


    const departureBtnClicked = async () => {
      const newData = [...data,searchInput1];
      const response = await axios.get(`${API_BASE_URL}/local`, {
        params: {query: searchInput1}
      });
      setRes(response.data.items)
      console.log(res);
      setData(newData);
    }

    const destinateBtnClicked = async () => {
      const newData = [...data,searchInput2];
      const response = await axios.get(`${API_BASE_URL}/local`, {
        params: {query: searchInput2}
      });
      setRes(response.data.items)
      console.log(res);
      setData(newData);
    }

    //좌표저장
    const handlecoordinate = async () => {
      if (wayPoints) {
        const lnglatArray = wayPoints.map((points) => (points._lng + "," + points._lat));
        const lnglatString = lnglatArray.join("|");
        const response = await axios.get(`${API_BASE_URL}/12345`, {
          params: {
            start: `${startPoint._lng},${startPoint._lat}`,
            goal: `${goalPoint._lng},${goalPoint._lat}`,
            waypoints: lnglatString
          }
        });
        setPath(response.data.route.traoptimal[0].path);
      } else {
        const response = await axios.get(`${API_BASE_URL}/1234`, {
          params: {
            start: `${startPoint._lng},${startPoint._lat}`,
            goal: `${goalPoint._lng},${goalPoint._lat}`
          }
        })
        setPath(response.data.route.traoptimal[0].path)
      }
    }

    ////모달창 함수
    //출발지
    const openDepartureModal = () => {
      departureBtnClicked();
      openModal({
          title: "출발지 설정",
          message: "",
          action:""
      });
    };
    //도착지
    const openDestinateModal = () => {
      setTest(true);
      destinateBtnClicked();
      openModal({
        title: "도착지 설정",
        message: "",
        action:"",
      });
    };

    return (
        <div className="addData">
          <div className="departSearch">
          {/* <input
            type="text"
            placeholder="출발지를 검색하세요."
            value={test || (departure ? departure.replace(/<\/?[^>]+(>|$)/g, "") : "")}
            onChange={(e) => setTest(e.target.value)}
          /> */}
            {departure?<input type="text" value={departure.replace(/<\/?[^>]+(>|$)/g, "")} onChange={(e)=> setDeparture(e.target.value)}/> : <input type="text" placeholder="출발지를 검색하세요." onChange={(e) => setSearchInput1(e.target.value)}/>}
            <button className="addDataBtns" type="button" onClick={openDepartureModal}>출발지 검색</button>
          </div>
          <div>
             {destination?<input type="text" value={destination.replace(/<\/?[^>]+(>|$)/g, "")} onChange={(e)=> setDestination(e.target.value)}/> : <input type="text" placeholder="도착지를 검색하세요." onChange={(e) => setSearchInput2(e.target.value)}/>}
            <button className="addDataBtns" type="button" onClick={openDestinateModal}>도착지 설정</button>
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
                                <span className="listNumber">
                                  {index + 1}
                                </span>
                                <p className="listTitle">{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                                <button className="addressBtn" onClick={() => handleCheck(item)}>{item.address}</button>
                                {/* <p className="roadAddress">{item.roadAddress}</p> */}
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

