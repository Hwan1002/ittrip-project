import "../css/Map.css";
import React, { useEffect, useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import useModal from "../context/useModal";
import Modal from "./Modal";

const Map = () => {

  const { tripDates, address, path, startPoint, setStartPoint, goalPoint, setGoalPoint, wayPoints, setWaypoints,
    stopOverList,setStopOverList,mapObject,setMapObject,departure,setDeparture,destination,setDestination,selectedDay,setSelectedDay,
    dayChecks,setDayChecks} = useContext(ProjectContext);

    const { isModalOpen, openModal, closeModal, modalTitle, modalMessage, modalActions } = useModal();
   
  useEffect(() => {
    console.log("mapObject updated:", JSON.stringify(mapObject));
  }, [mapObject]);
  
  useEffect(() => {
    if (tripDates && tripDates.startDate && tripDates.endDate) {                //1111
      const startDate = new Date(tripDates.startDate);
      const endDate = new Date(tripDates.endDate);

      // 출발일자와 도착일자 간의 차이를 계산 (밀리초 단위)
      const diffTime = endDate - startDate;

      // 차이를 일수로 변환
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1일은 시작일도 포함

      // dayChecks 배열 업데이트
      const daysArray = Array.from({ length: diffDays }, (_, index) => `Day ${index + 1}`);
      setDayChecks([...daysArray]);
    }
  }, [tripDates]);

 
  useEffect(()=>{
    const foundData = mapObject.find(data => data.days === selectedDay+1);
    if(foundData){
      setDeparture({title:foundData.startPlace, address:foundData.startAddress})
      setStopOverList([...foundData.wayPoints])
      setDestination({title:foundData.goalPlace, address:foundData.goalAddress})
    }
      
    
  },[selectedDay])

  useEffect(() => {
    // Naver 지도 API 스크립트 로드
    const script = document.createElement('script');
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wz3pjcepky&submodules=geocoder"; // YOUR_CLIENT_ID를 실제 클라이언트 ID로 교체
    script.async = true;
    script.onload = () => {
      // Naver 지도 API가 로드된 후 실행되는 코드
      if (window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map('map-container', {
          center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울의 중심 좌표
          zoom: 15
        });


        // LatLngBounds 객체 생성: 모든 마커를 포함할 범위 계산
        const bounds = new window.naver.maps.LatLngBounds();


        if (address) {
          window.naver.maps.Service.geocode({
            query: address
          }, (status, response) => {
            if (status === window.naver.maps.Service.Status.ERROR) {
              // alert('주소를 찾을 수 없습니다.');
              openModal({
                title:"주소 오류",
                message:"주소를 찾을 수 없습니다.",
              })
              return;
            }

            // 변환된 좌표 가져오기
            const result = response.v2;
            const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);


            if (!startPoint) {
              setStartPoint(latlng)

            } else if (startPoint && !goalPoint) {
              setGoalPoint(latlng)
            } 
            else if (!wayPoints.some(point => point.equals(latlng)) && !goalPoint.equals(latlng)) {
              setWaypoints(prevWaypoints => [...prevWaypoints, latlng]);
            }

            // 지도 좌표로 이동
            map.setCenter(latlng);

            // 마커를 모두 추가하기
            const markers = [];

            //마커모양 교체
            const createMarkerIcon = (text) => {
              return {
                content: `
                    <div style="width: 30px; height: 30px; background-color: white; color: black; text-align: center; border-radius: 50%; line-height: 30px; font-size: 14px; font-weight: bold; position: relative; border: 3px solid #F6A354;">
                      ${text}
                      <div style="content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #F6A354;"></div>
                    </div>
                  `,
                size: new window.naver.maps.Size(30, 30),
                anchor: new window.naver.maps.Point(15, 15),
              };
            };




            // 시작 지점 마커 추가
            if (startPoint) {
              const startMarker = new window.naver.maps.Marker({
                position: startPoint,
                map: map,
                icon: createMarkerIcon('S')
              });
              markers.push(startMarker);
              bounds.extend(startMarker.getPosition()); // 시작 지점 위치 추가
            }

            // 목표 지점 마커 추가
            if (goalPoint) {
              const goalMarker = new window.naver.maps.Marker({
                position: goalPoint,
                map: map,
                icon: createMarkerIcon('G')
              });
              markers.push(goalMarker);
              bounds.extend(goalMarker.getPosition()); // 목표 지점 위치 추가
            }

            // 경유지 마커 추가
            if (wayPoints && wayPoints.length > 0) {
              wayPoints.forEach((point, index) => {
                const waypointMarker = new window.naver.maps.Marker({
                  position: point,
                  map: map,
                  icon: createMarkerIcon(`${index + 1}`)
                });
                markers.push(waypointMarker);
                bounds.extend(waypointMarker.getPosition()); // 경유지 위치 추가
              });
            }

            // 경로 표시하기 
            if (path) {
              const pathCoordinates = path.map(([longitude, latitude]) => new window.naver.maps.LatLng(latitude, longitude))


              const polyline = new window.naver.maps.Polyline({
                path: pathCoordinates,  // 경로를 정의
                strokeColor: '#FF0000',  // 선 색
                strokeOpacity: 1,        // 선의 투명도
                strokeWeight: 3          // 선의 두께
              });

              polyline.setMap(map);  // 지도에 폴리라인을 표시
              pathCoordinates.forEach(coord => bounds.extend(coord));// 경로 좌표도 범위에 추가
            }
            // 모든 마커와 경로를 포함하는 범위로 지도를 자동으로 조정

            map.fitBounds(bounds)
            map.setZoom(map.getZoom() - 1); // 한 단계 더 줌 아웃해서 여유를 줍니다.
          });
        }
      }
    };
    // 스크립트 로드를 DOM에 추가
    document.body.appendChild(script);

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, [address, path]);

  // Day 클릭 시, 해당 날짜에 맞는 지도 업데이트
  const handleDayClick = (day) => {  
    if(!mapObject.find(data=>data.days === selectedDay+1)){
      // const userConfirm = window.confirm("저장 안 했는데 넘어갈 거야?");
      openModal({
        title:"주의",
        message: "저장 안했는데 넘어갈거야?",
      })
      setDeparture({title:'',address:''});
      setStopOverList([]);
      setDestination({title:'',address:''});
      setSelectedDay(day);
    // if (userConfirm) {
    //   alert("넘어갈게");
    //   openModal({
    //     title:"",
    //     message:"넘어갈게",
    //   })
    //   // setDeparture({title:'',address:''});
    //   // setStopOverList([]);
    //   // setDestination({title:'',address:''});
    //   // setSelectedDay(day);
    // } else {
    //   alert("그래 저장해");
    // }
    }
    // else{
    //   setDeparture({title:'',address:''});
    //   setStopOverList([]);
    //   setDestination({title:'',address:''});
    //   setSelectedDay(day);
    // }
    
  };

  return (
    <div id="mapPlan">
      {/* 배경색을 넣어주는 div */}
      <div id="map-container"></div>
      {/* Day 요소들 배치 */}
      <div id="dayFrame">
        {/* dayChecks 배열의 항목에 따라 DayN 요소 생성 */}
        {dayChecks.map((item,index) => (
          <div id="dayChecks" onClick={()=>handleDayClick(index)} key={index}>
            {item}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalMessage}
        actions={[
          {label: "확인", onClick: closeModal, className: "confirm-button",},
          {label: "뒤로가기", onClick: closeModal, className: "cancel-button",}
        ]}
      />
    </div>
  );
}

export default Map;