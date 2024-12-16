import axios from "axios";
import React, { useState, useContext } from "react";
import { API_BASE_URL } from "../service/api-config";
import { ProjectContext } from "../context/ProjectContext";
import Modal from "./Modal";
import useModal from "../context/useModal";
import '../css/AddData.css';

const AddData = ({ width }) => {

  const [data, setData] = useState([]);  // 입력된 데이터를 저장할 배열
  const [inputs, setInputs] = useState([{ value: "" }]);  // 여러 개의 input을 관리하는 배열
  const [res, setRes] = useState([]);
  const [departure, setDeparture] = useState();

  //모달창 사용
  const {
    isModalOpen,
    modalTitle,
    modalMessage,
    modalActions,
    openModal,
    closeModal
  } = useModal();
  //모달끝

  const { setAddress, setPath, wayPoints,startPoint,goalPoint  } = useContext(ProjectContext);

  const lnglatArray = wayPoints.map((points) => (points._lng + "," + points._lat));
  const lnglatString = lnglatArray.join("|");



  const handleCheck = (item) => {
    setAddress(item);
    closeModal();
  }

  const handleBtnClicked = async () => {
    const newData = [
      ...data,
      departure
    ];
    const response = await axios.get(`${API_BASE_URL}/local`, {
      params: {
        query: departure
      }
    });
    setRes(response.data.items)
    setData(newData);
  }

  //좌표저장
  const handlecoordinate = async () => {
    if (wayPoints) {
      const lnglatArray = wayPoints.map((points) => (points._lng + "," + points._lat));
      const lnglatString = lnglatArray.join("|");
      console.log("waypoint 있음", wayPoints)
      const response = await axios.get(`${API_BASE_URL}/12345`, {
        params: {
          start: `${startPoint._lng},${startPoint._lat}`,
          goal: `${goalPoint._lng},${goalPoint._lat}`,
          waypoints : lnglatString 
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


  //모달창 함수
  const openDepartureModal = () => {
    openModal({
      title: "출발지 설정",
      message: "시발",
      actions: [
        {
          label: "확인",
          onClick:
            closeModal
        }
      ]
    });
  };

  const openDestinateModal = () => {

    openModal({
      title: "도착지 설정",
      message: "시발",
      actions: [
        {
          label: "확인",
          onClick:
            closeModal
        }
      ]
    });
  };



  return (
    <div className="addData">
      <button className="addDataBtns" onClick={openDepartureModal}>출발지 설정</button>
      <button className="addDataBtns" onClick={openDestinateModal}>도착지 설정</button>
      <button className="addDataBtns" onClick={handlecoordinate}>저장</button>
      <Modal
        className="newTripModal"
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={<div className="ntModalContents" > 
        <input
          type="text"
          onChange={(e) => setDeparture(e.target.value)}
          value={departure} />
          <button onClick={handleBtnClicked}>검색</button>
          <div className="searchList">
            <ul>
              {
                res.map((item, index) =>
                  <li key={item.title}>
                    <span className="listNumber">
                      {index + 1}
                    </span>
                    <p className="listTitle">{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    <button className="addressBtn" onClick={() => handleCheck(item.address)}>{item.address}</button>
                    {/* <p className="roadAddress">{item.roadAddress}</p> */}
                  </li>
                )
              }
            </ul>
          </div>
        </div>}
        actions={modalActions} />
    </div>
  );
}
export default AddData;

