import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../service/api-config";

const MapWithData = ( ) => {
  // 상태 변수
  const [data, setData] = useState([]); // 입력된 데이터를 저장하는 배열
  const [inputs, setInputs] = useState([{ value: "" }]); // 여러 개의 input 관리 배열
  const [res, setRes] = useState([]); // API 응답 저장
  const [address, setAddress] = useState(''); // address를 상태로 관리
  const dayChecks = ['일정1', '일정2', '일정3']; // 일정 샘플 배열

  const [lat1,setLat1] = useState();
  const [lng1,setLng1] = useState();

  const [lat2,setLat2] = useState();
  const [lng2,setLng2] = useState();

  // Naver 지도 API 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wz3pjcepky&submodules=geocoder"; // 네이버 지도 API
    script.async = true;

    script.onload = () => {
      if (window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map('map-container', {
          center: new window.naver.maps.LatLng(37.5665, 126.9780), // 기본 위치: 서울
          zoom: 15
        });

        window.naver.maps.Service.geocode({
          query: address || '서울' // 주소가 없으면 서울을 기본으로 설정
        }, (status, response) => {
          if (status === window.naver.maps.Service.Status.ERROR) {
            alert('주소를 찾을 수 없습니다.');
            return;
          }

          const result = response.v2;
          const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);

            // 첫 번째 좌표 저장
            if (!lat1 && !lng1) {
                setLat1(result.addresses[0].y);
                setLng1(result.addresses[0].x);
                new window.naver.maps.Marker({
                  position: latlng,
                  map: map
                });
              } else if (lat1 && lng1 && !lat2 && !lng2) {
                setLat2(result.addresses[0].y);
                setLng2(result.addresses[0].x);
                new window.naver.maps.Marker({
                  position: latlng,
                  map: map
                });
              }

          map.setCenter(latlng); // 마커 위치로 지도 중앙 이동
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [address]);


  //좌표저장
  const handlecoordinate =() =>{
    console.log(lng1,lat1,lng2,lat2)
        const response = axios.get(`${API_BASE_URL}/1234`,{
            params:{
                start:`${lng1},${lat1}`,
                goal:`${lng2},${lat2}`
            }
        })

        console.log(response)
  }




  // 입력 값 변경 처리
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  // 추가 버튼 클릭 시 처리
  const handleBt1Click = async (index) => {
    const newData = [...data, inputs[index].value]; // 새로운 데이터 추가

    const response = await axios.get(`${API_BASE_URL}/local`, {
      params: { query: inputs[index].value }, // 입력값으로 API 호출
    });

    setRes(response.data.items); // API 응답 결과 저장
    setData(newData); // 데이터 업데이트

    const newInputs = [...inputs, { value: "" }]; // 새로운 빈 input 추가
    setInputs(newInputs);
  };

  // 삭제 버튼 클릭 시 처리
  const handleBt2Click = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // 해당 input 삭제
    setInputs(newInputs);

    const newData = data.filter((item, idx) => idx !== index); // 해당 데이터 삭제
    setData(newData);
  };

  // 수정 버튼 클릭 시 처리
  const handleBt3Click = (index) => {
    const updatedData = [...data];
    updatedData[index] = inputs[index].value; // 해당 값 수정
    setData(updatedData);
  };

  // 주소 선택 처리
  const handleCheck = (item) => {
    setAddress(item); // 주소 클릭 시 주소 업데이트
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* 지도 */}
      <div id="mapPlan" style={{
        width: "70%", // 지도 영역을 70%로 설정
        height: "500px",
        position: "relative",
        display: "flex",
      }}>
        {/* 지도 배경 */}
        <div id="map-container" style={{
          position: 'absolute',
          width: "100%",
          height: "100%",
          backgroundColor: '#A3A3A3',
        }}></div>

        {/* Day 요소들 배치 */}
        <div id="dayFrame" style={{
          display: 'flex',
          position: 'absolute',
          top: '10px',
          left: "14px",
        }}>
          {dayChecks.map((day, index) => (
            <div style={{
              textAlign: "center",
              width: 62,
              height: 30,
              backgroundColor: "#F6A354",
              color: "#fff",
              borderRadius: 18,
              padding: "4px 6px 2px 4px",
              margin: "20px 10px",
            }} key={index}>
              Day {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 입력폼 */}
      <div style={{
        width: "60%", // 입력폼 영역을 30%로 설정
        paddingLeft: "20px", // 지도와 입력폼 사이에 여백을 추가
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}>
        {inputs.map((input, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="text"
              value={input.value}
              onChange={(event) => handleInputChange(index, event)} // input 값 변경 처리
              style={{
                width: "100%",
                height: "34px",
                borderRadius: "18px",
                textAlign: "center",
                fontSize: "17px",
              }}
            />
            {index === inputs.length - 1 ? (
              <button
                onClick={() => handleBt1Click(index)} // 추가 버튼 클릭 처리
                style={{
                  width: "55px",
                  height: "40px",
                  borderColor: "#DADADA",
                  borderRadius: "20px",
                  backgroundColor: "#F6A354",
                  border: "none",
                  fontSize: "15px",
                  color: "#fff",
                  marginLeft: "10px"
                }}
              >
                추가
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleBt2Click(index)} // 삭제 버튼 클릭 처리
                  style={{
                    width: "55px",
                    height: "40px",
                    borderRadius: "20px",
                    backgroundColor: "#878787",
                    border: "none",
                    fontSize: "15px",
                    marginRight: "7px",
                    color: "#fff",
                  }}
                >
                  삭제
                </button>
                <button
                  onClick={() => handleBt3Click(index)} // 수정 버튼 클릭 처리
                  style={{
                    width: "55px",
                    height: "40px",
                    borderColor: "#DADADA",
                    borderRadius: "20px",
                    backgroundColor: "#F6A354",
                    border: "none",
                    fontSize: "15px",
                    color: "#fff",
                  }}
                >
                  수정
                </button>
              </>
            )}
          </div>
        ))}


        <button
                  onClick={()=>handlecoordinate()} // 수정 버튼 클릭 처리
                  style={{
                    width: "55px",
                    height: "40px",
                    borderColor: "#DADADA",
                    borderRadius: "20px",
                    backgroundColor: "#F6A354",
                    border: "none",
                    fontSize: "15px",
                    color: "#fff",
                  }}
                >
                  저장
                </button>

        {/* 검색 결과 리스트 출력 */}
        <ul>
          {res.map((item) => (
            <li key={item.title}>
              <p>{item.title}</p>
              <button onClick={() => handleCheck(item.address)}>{item.address}</button>
              <p>{item.roadAddress}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapWithData;
