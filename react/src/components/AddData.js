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
  const [departure, setDeparture] = useState(false);

  //모달창 사용
  const {
    isModalOpen,
    modalTitle,
    modalMessage,
    modalActions,
    openModal,
    closeModal
  } = useModal();
  const [isNewPlanModal, setIsNewPlanModal] = useState(false);
  //모달끝

  const { setAddress, setPath, wayPoints, startPoint, goalPoint } = useContext(ProjectContext);

  const lnglatArray = wayPoints.map((points) => (points._lng + "," + points._lat));
  const lnglatString = lnglatArray.join("|");




  const handleCheck = (item) => {
    setAddress(item)
  }

  // input 값이 변경되었을 때
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;  // 해당 인덱스의 input 값 업데이트
    setInputs(newInputs);
  };

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


  // bt1 버튼 클릭 시
  const handleBt1Click = async (index) => {
    // 현재 input 값(data)에 추가
    const newData = [...data, inputs[index].value];


    // 입력받은 주소값을 지역검색 API에 요청후 response에 반환받은 객체 저장
    const response = await axios.get(`${API_BASE_URL}/local`, {
      params: {
        query: inputs[index].value,  // 현재 input의 값을 query 파라미터로 전송
      },
    });


    setRes(response.data.items)
    setData(newData);

    // 새로운 input과 bt1을 추가
    const newInputs = [...inputs];
    newInputs.push({ value: "" });  // 새로운 빈 input을 추가
    setInputs(newInputs);
  };


  //좌표저장
  const handlecoordinate = async () => {
    console.log(startPoint, goalPoint, wayPoints)
    if (wayPoints) {
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


  //모달창 함수
  const openDepartureModal = () => {
    setIsNewPlanModal(true);
    openModal({
      title: "출발지 설정",
      message: "시발",
      actions: [
        {
          label: "확인",
          onClick: closeModal
        }
      ]
    });
  };

  const openDestinateModal = () => {
    setIsNewPlanModal(true);
    openModal({
      title: "도착지 설정",
      message: "시발",
      actions: [
        {
          label: "확인",
          onClick: closeModal
        }
      ]
    });
  };


  return (
    <div className="addData">
      <button className="addDataBtns" onClick={openDepartureModal}>출발지 설정</button>
      <button className="addDataBtns" onClick={openDestinateModal}>도착지 설정</button>
      <Modal
        className="newTripModal"
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={<div className="ntModalContents" > <input
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

