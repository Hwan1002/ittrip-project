import "../css/Map.css";
import React, { useEffect, useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import useModal from "../context/useModal";
import Modal from "./Modal";

const Map = () => {
  const {
    tripDates, address, path, setPath, startPoint, setStartPoint, goalPoint, setGoalPoint, wayPoints, setWaypoints,
    stopOverList, setStopOverList, mapObject, setMapObject, departure, setDeparture, destination, setDestination, selectedDay, setSelectedDay,
    dayChecks, setDayChecks
  } = useContext(ProjectContext);

  const { isModalOpen, openModal, closeModal, modalTitle, modalMessage, modalActions } = useModal();

   const [dayBoolean,setDayBoolean] = useState([]);
   const [dayMapData, setDayMapData] = useState({}); // 각 날짜에 대한 마커와 폴리라인 데이터를 저장

 

  useEffect(()=>{
    console.log("dayBoolean: "+JSON.stringify(dayBoolean));
  },[dayBoolean])

  // const [selectedDay, setSelectedDay] = useState(0);  // 선택된 날짜를 저장할 상태
   

  useEffect(() => {
    console.log("mapObject updated:", JSON.stringify(mapObject));
  }, [mapObject]);

  useEffect(() => {
    if (tripDates && tripDates.startDate && tripDates.endDate) {
      const startDate = new Date(tripDates.startDate);
      const endDate = new Date(tripDates.endDate);

      const diffTime = endDate - startDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      const daysArray = Array.from({ length: diffDays }, (_, index) => `Day ${index + 1}`);
      const booleanArray = new Array(daysArray.length).fill(false);
      setDayBoolean([...booleanArray]);
      setDayChecks([...daysArray]);
    }
  }, [tripDates]);

  useEffect(() => {
    if (selectedDay != null) {
      setStartPoint(null);
      setGoalPoint(null);
      setWaypoints([]);
    }
  }, [selectedDay, setStartPoint, setGoalPoint, setWaypoints]);


  useEffect(() => {
    const foundData = mapObject.find(data => data.days === selectedDay + 1);
    if (foundData) {
      setDeparture({ title: foundData.startPlace, address: foundData.startAddress });
      setStopOverList([...foundData.wayPoints]);
      setDestination({ title: foundData.goalPlace, address: foundData.goalAddress });
    }
  }, [selectedDay]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wz3pjcepky&submodules=geocoder";
    script.async = true;
    script.onload = () => {
      if (window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map('map-container', {
          center: new window.naver.maps.LatLng(37.5665, 126.9780),
          zoom: 15
        });


        const clearMapData = () => {
          // 이전 날짜의 마커와 폴리라인 삭제
          if (dayMapData[selectedDay]) {
            dayMapData[selectedDay].markers.forEach(marker => marker.setMap(null));
            dayMapData[selectedDay].polylines.forEach(polyline => polyline.setMap(null));
          }
        };

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


        if (address) {
          window.naver.maps.Service.geocode({
            query: address
          }, (status, response) => {
            if (status === window.naver.maps.Service.Status.ERROR) {
              openModal({
                title: "주소 오류",
                message: "주소를 찾을 수 없습니다.",
              });
              return;
            }

            const result = response.v2;
            const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);

            if (!startPoint) {
              setStartPoint(latlng);
            } else if (startPoint && !goalPoint) {
              setGoalPoint(latlng);
            } else if (!wayPoints.some(point => point.equals(latlng)) && !goalPoint.equals(latlng)) {
              setWaypoints(prevWaypoints => [...prevWaypoints, latlng]);
            }

            map.setCenter(latlng);
            const bounds = new window.naver.maps.LatLngBounds();
            

            const selectedData = mapObject.find(data => data.days === selectedDay + 1); // selectedDay에 맞는 데이터 찾기
            if (selectedData) {
              const {startAddress, goalAddress, wayPoints, path } = selectedData;

              clearMapData(); // 이전 날짜의 마커와 폴리라인을 삭제

              let markers = [];
              let polylines = [];

              if (startAddress) {

                window.naver.maps.Service.geocode({
                  query: startAddress
                }, (status, response) => {
                  if (status === window.naver.maps.Service.Status.ERROR) {
                    openModal({
                      title: "주소 오류",
                      message: "주소를 찾을 수 없습니다.",
                    });
                    return;
                  }
                  const result = response.v2;
                  const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);

                  const startMarker = new window.naver.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: createMarkerIcon('S')
                  });
                  markers.push(startMarker);
                  bounds.extend(startMarker.getPosition());
                })
              }

              if (goalAddress) {
                window.naver.maps.Service.geocode({
                  query: goalAddress
                }, (status, response) => {
                  if (status === window.naver.maps.Service.Status.ERROR) {
                    openModal({
                      title: "주소 오류",
                      message: "주소를 찾을 수 없습니다.",
                    });
                    return;
                  }
                  const result = response.v2;
                  const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);

                  const goalMarker = new window.naver.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: createMarkerIcon('G')
                  });
                  markers.push(goalMarker);
                  bounds.extend(goalMarker.getPosition());
                })
              }

              if (wayPoints && wayPoints.length > 0) {
                wayPoints.forEach((point, index) => {
                  const address = point.address;  // address를 사용하여 geocode 호출
                  
                  window.naver.maps.Service.geocode({
                    query: address
                  }, (status, response) => {
                    if (status === window.naver.maps.Service.Status.ERROR) {
                      openModal({
                        title: "주소 오류",
                        message: `${address}를 찾을 수 없습니다.`,
                      });
                      return;
                    }
                    const result = response.v2;
                    const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);
              
                    const waypointMarker = new window.naver.maps.Marker({
                      position: latlng,
                      map: map,
                      icon: createMarkerIcon(`${index + 1}`)
                    });
                    markers.push(waypointMarker);
                    bounds.extend(waypointMarker.getPosition());
                  });
                });
              }

              if (path) {
                const pathCoordinates = path.map(([longitude, latitude]) => new window.naver.maps.LatLng(latitude, longitude));
                const polyline = new window.naver.maps.Polyline({
                  path: pathCoordinates,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1,
                  strokeWeight: 3
                });

                polyline.setMap(map);
                polylines.push(polyline);
                pathCoordinates.forEach(coord => bounds.extend(coord));
              }

              map.fitBounds(bounds);
              map.setZoom(map.getZoom() - 1);


               // 날짜별로 마커와 폴리라인 저장
               setDayMapData(prevData => ({
                ...prevData,
                [selectedDay]: { markers, polylines }
              }));

            }
          });
        }
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [address, path, selectedDay]);

  // Day 클릭 시, 해당 날짜에 맞는 지도 업데이트
  const handleDayClick = (day) => {  
    if(!mapObject.find(data=>data.days === selectedDay+1)){
      const userConfirm = window.confirm("저장 안 했는데 넘어갈 거야?");
    if (userConfirm) {
      alert("넘어갈게");
      setDeparture({title:'',address:''});
      setStopOverList([]);
      setDestination({ title: '', address: '' });
      closeModal();
      setSelectedDay(day);
      setDayBoolean(prev => {
        const updatedDayBoolean = [...prev];
        updatedDayBoolean[selectedDay] = false;
        updatedDayBoolean[day] = true;
        return updatedDayBoolean;
      });
    } else {
      alert("그래 저장해");
    }
    }else{
      setDeparture({title:'',address:''});
      setStopOverList([]);
      setDestination({ title: '', address: '' });
      setSelectedDay(day);
      setDayBoolean(prev => {
        const updatedDayBoolean = [...prev];
        updatedDayBoolean[selectedDay] = false;
        updatedDayBoolean[day] = true;
        return updatedDayBoolean;
      });
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
      <div id="map-container"></div>
      <div id="dayFrame">
        {/* dayChecks 배열의 항목에 따라 DayN 요소 생성 */}
        {dayChecks.map((item,index) => (
          <div id="dayChecks" 
           key={index}>
            <input
              type="button"
              disabled={dayBoolean[index]}
              onClick={()=>handleDayClick(index)}
              value={item}
            />
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
};

export default Map;
