import "../css/Map.css";
import React, { useEffect, useContext, useState ,useRef} from "react";
import { ProjectContext } from "../context/ProjectContext";
import useModal from "../context/useModal";
import Modal from "./Modal";
import { AiOutlineSmallDash } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "../service/api-config";

const Map = () => {
  const {
    tripDates, address, path, setPath, routeType,
    stopOverList, setStopOverList, mapObject, setMapObject, departure, setDeparture, destination, setDestination, selectedDay, setSelectedDay,
    dayChecks, setDayChecks, stopOverCount,isReadOnly

  } = useContext(ProjectContext);

  const { isModalOpen, openModal, closeModal, modalTitle, modalMessage, modalActions } = useModal();

  const [dayBoolean, setDayBoolean] = useState([]);
  
  const [distance , setDistance] = useState(0)
  const [duration, setDuration] = useState(0);
  const [tollFare,setTollFare] = useState(0);
  const [fuelPrice,setFuelPrice] = useState(0);
  

  function formatDuration(milliseconds) {
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return `${hours}시 ${minutes}분 ${seconds}초`;
  }

  function formatDistance(meters) {
    if (meters >= 1000) {
      const kilometers = (meters / 1000).toFixed(1);
      return `${kilometers}km`;
    } else {
      return `${meters}m`;
    }
  }

  useEffect(() => {
    console.log("ct", stopOverCount)

    const convertXY = () => {
      switch (routeType) {
        case "departure":
          window.naver.maps.Service.geocode(
            {
              query: departure.address,
            },
            (status, response) => {
              if (status === window.naver.maps.Service.Status.ERROR) {
                openModal({
                  title: "주소 오류",
                  message: "주소를 찾을 수 없습니다.",
                });
                return;
              }
              const result = response.v2;
              const latlng = `${result.addresses[0].x},${result.addresses[0].y}`;
              setDeparture((prev) => ({
                ...prev,
                latlng: latlng, // 원하는 latlng 값
              }));
            }
          );
          break;

        case "destination":
          window.naver.maps.Service.geocode(
            {
              query: destination.address,
            },
            (status, response) => {
              if (status === window.naver.maps.Service.Status.ERROR) {
                openModal({
                  title: "주소 오류",
                  message: "주소를 찾을 수 없습니다.",
                });
                return;
              }
              const result = response.v2;
              const latlng = `${result.addresses[0].x},${result.addresses[0].y}`;
              setDestination((prev) => ({
                ...prev,
                latlng: latlng, // 원하는 latlng 값
              }));
            }
          );
          break;

        case "stopOver":
          if (stopOverList.length > 0) {
            const num = stopOverList.length - 1;
            console.log("num" + num);
            console.log("stopOverlen" + stopOverList.length)
            window.naver.maps.Service.geocode(
              {
                query: stopOverList[num].address,
              },
              (status, response) => {
                if (status === window.naver.maps.Service.Status.ERROR) {
                  openModal({
                    title: "주소 오류",
                    message: "주소를 찾을 수 없습니다.",
                  });
                  return;
                }
                const result = response.v2;
                const latlng = `${result.addresses[0].x},${result.addresses[0].y}`;
                setStopOverList((prev) =>
                  prev.map((item, index) =>
                    index === num ? { ...item, latlng: latlng } : item
                  )
                );
                console.log("stopOver : " + JSON.stringify(stopOverList))
              }
            );
          }
          break;

        default:
          break;
      }
    };
    convertXY();
  }, [routeType, stopOverCount]);

  

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
      booleanArray[0] = true;
      setDayBoolean([...booleanArray]);
      setDayChecks([...daysArray]);
    }
  }, [tripDates]);

  useEffect(() => {
    const foundData = mapObject.find(data => data.days === selectedDay + 1);
    console.log(foundData);
    if (foundData) {
      setDeparture({ title: foundData.startPlace, address: foundData.startAddress, latlng: foundData.startPoint });
      setStopOverList([...foundData.wayPoints]);
      setDestination({ title: foundData.goalPlace, address: foundData.goalAddress, latlng: foundData.goalPoint });
    }
  }, [selectedDay]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=wz3pjcepky&submodules=geocoder";
    script.async = true;
    script.onload = () => {
      if (window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map("map-container", {
          center: new window.naver.maps.LatLng(37.5665, 126.9780),
          zoom: 11,
        });
        
        const infoWindow = new window.naver.maps.InfoWindow({
          anchorSkew: true,
          pixelOffset: new window.naver.maps.Point(10, -10),
        });

        const createMarker = (latlng, text, obj,data) => {
          const icon = {
            content: `
              <div style="width: 30px; height: 30px; background-color: white; color: black; text-align: center; border-radius: 50%; line-height: 30px; font-size: 14px; font-weight: bold; position: relative; border: 3px solid #F6A354;">
                ${text}
                <div style="content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #F6A354;"></div>
              </div>
            `,
            size: new window.naver.maps.Size(30, 30),
            anchor: new window.naver.maps.Point(15, 15),
          };

          // 마커 객체 생성
          const marker = new window.naver.maps.Marker({
            position: latlng,
            icon: icon,
            map: map,
          });

          // 마커 클릭 이벤트 등록
          window.naver.maps.Event.addListener(marker, "click", () => {

            if(infoWindow.getMap()){
              infoWindow.close();
            }else{
              if(data.startPoint === obj){
                const place = data.startPlace;
                const address = data.startAddress;
                infoWindow.setContent(`<div style="padding:10px;">
                  <h2>${place} </h2>
                  <h5>주소:${address} </h5>
                   </div>`);
                infoWindow.open(map, marker);
              }else if(data.goalPoint === obj){
                const place = data.goalPlace;
                const address = data.goalAddress;
                infoWindow.setContent(`<div style="padding:10px;">
                  <h2>${place} </h2>
                  <h5>주소:${address} </h5>
                   </div>`);
                infoWindow.open(map, marker);
              }else if(data.address === obj){
                const place = data.value;
                const address = obj;
                infoWindow.setContent(`<div style="padding:10px;">
                  <h2>${place} </h2>
                  <h5>주소:${address} </h5>
                   </div>`);
                infoWindow.open(map, marker);
              }
            }
  
          });

          return marker;
        };

        // 날짜가 변경될 때마다 마커와 폴리라인 업데이트
        const updateMapForDay = () => {
          const selectedData = mapObject.find(data => data.days === selectedDay + 1); // selectedDay에 맞는 데이터 찾기
          if (selectedData) {
            const { startPoint, goalPoint, wayPoints } = selectedData;

            let markers = [];
            

            // 출발지 마커 추가
            const departureLatLng = new window.naver.maps.LatLng(startPoint.split(",")[1], startPoint.split(",")[0]);
            markers.push(createMarker(departureLatLng, "출발",selectedData.startPoint,selectedData));

            // 도착지 마커 추가
            const destinationLatLng = new window.naver.maps.LatLng(goalPoint.split(",")[1], goalPoint.split(",")[0]);
            markers.push(createMarker(destinationLatLng, "도착",selectedData.goalPoint,selectedData));

            // 경유지 마커 추가
            if (wayPoints && wayPoints.length > 0) {
              wayPoints.forEach((wayPoint, index) => {
                const wayPointLatLng = new window.naver.maps.LatLng(wayPoint.latlng.split(",")[1], wayPoint.latlng.split(",")[0]);
                markers.push(createMarker(wayPointLatLng, `${index + 1}`,wayPoint.address,wayPoint));
              });
            }
            

            // path.setPatternImage(
            //   new window.naver.maps.OverlayImage.fromResource('./img/Icon/arrow.png') // 실제 이미지 경로
            // );
            // path.setPatternInterval(10);

            const pathCoordinates = path.map(([longitude, latitude]) => new window.naver.maps.LatLng(latitude, longitude));
            const polyline = new window.naver.maps.Polyline({
              path: pathCoordinates, // 경로 (LatLng 객체 배열)
              strokeColor: 'blue', // 폴리라인 색상
              strokeWeight: 4, // 선 두께
              strokeOpacity: 0.8, // 선의 불투명도
            });
            
            polyline.setMap(map);

            map.setCenter(departureLatLng)
           

          }
        };

        updateMapForDay();
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [selectedDay, departure, destination, stopOverList, mapObject,path]);

 
 useEffect(()=>{
        
  if(mapObject){
    const foundObject = mapObject.find((data)=>data.days === selectedDay+1);
    console.log("foundObject" + JSON.stringify(foundObject))
    // console.log("waypoint" + JSON.stringify(foundObject.wayPoints))
        const dirReq = async () => {
          debugger;
        if(foundObject){
          if (foundObject.wayPoints) {  
          try {
                  const latlngArray = foundObject.wayPoints.map(prev => {return prev.latlng});
                  const lnglatString = latlngArray.join("|");
                  const response = await axios.get(`${API_BASE_URL}/12345`, {
                    params: {
                      start: foundObject.startPoint,
                      goal: foundObject.goalPoint,
                      waypoints: lnglatString,
                    },
                  })
                  setPath(response.data.route.traoptimal[0].path);
                  setDuration(formatDuration(response.data.route.traoptimal[0].summary.duration));
                  setDistance(formatDistance(response.data.route.traoptimal[0].summary.distance));
                  
                }catch (error) {
                  alert("경유지있는 디렉션 에러");
                }
                
               } else {
                try {
                  const response = await axios.get(`${API_BASE_URL}/1234`, {
                    params: {
                      start: foundObject.startPoint,
                      goal: foundObject.goalPoint,
                    },
                  }
                )
                setPath(response.data.route.traoptimal[0].path);
                setDuration(formatDuration(response.data.route.traoptimal[0].summary.duration));
                setDistance(formatDistance(response.data.route.traoptimal[0].summary.distance));
                } catch (error) {
                  alert("경유지없는 디렉션 에러");
                }
                  
                }
         
              } 
        } 
        
        dirReq();
      }
        

    },[mapObject,selectedDay])
  

  const handleDayClick = (day) => {
    if (!isReadOnly && !mapObject.find(data => data.days === selectedDay + 1)) {
      const userConfirm = window.confirm("저장 안 했는데 넘어갈 거야?");
      if (userConfirm) {
        alert("넘어갈게");
        setDeparture({ title: "", address: "" });
        setStopOverList([]);
        setDestination({ title: "", address: "" });
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
    } else {
      setDeparture({ title: "", address: "" });
      setStopOverList([]);
      setDestination({ title: "", address: "" });
      setSelectedDay(day);
      setDayBoolean(prev => {
        const updatedDayBoolean = [...prev];
        updatedDayBoolean[selectedDay] = false;
        updatedDayBoolean[day] = true;
        return updatedDayBoolean;
      });
    }
  };

  return (
    <div id="mapPlan">
      <div id="map-container"></div>
      <div id="dayFrame">
        {dayChecks.map((item, index) => (
          <div id="dayChecks" key={index}>
            <input
              type="button"
              disabled={dayBoolean[index]}
              onClick={() => handleDayClick(index)}
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
          { label: "확인", onClick: closeModal, className: "confirm-button" },
          { label: "뒤로가기", onClick: closeModal, className: "cancel-button" },
        ]}
      />
    </div>
  );
};

export default Map;
