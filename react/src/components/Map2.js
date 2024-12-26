import "../css/Map.css";
import React, { useEffect, useState } from "react";

const Map2 = ({ maps, selectedDay }) => {
  const [activeDay, setActiveDay] = useState(null);  // 선택된 날짜 추적
  const [markers, setMarkers] = useState([]);  // 지도에 표시된 모든 마커를 추적

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

        const createMarker = (latlng, text) => {
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

          return new window.naver.maps.Marker({
            position: latlng,
            icon: icon,
            map: map,
          });
        };

        // 마커 데이터 초기화
        const newMarkers = [];

        console.log(maps)

        // 각 day's 데이터에 대해 마커 추가
        maps.forEach((mapItem, dayIndex) => {
          if (mapItem.startPoint) {
            const departureLatLng = new window.naver.maps.LatLng(
              mapItem.startPoint.split(",")[1], // 위도
              mapItem.startPoint.split(",")[0]  // 경도
            );
            newMarkers.push({ day: dayIndex, marker: createMarker(departureLatLng, "출발") });
          }

          if (mapItem.goalPoint) {
            const destinationLatLng = new window.naver.maps.LatLng(
              mapItem.goalPoint.split(",")[1], // 위도
              mapItem.goalPoint.split(",")[0]  // 경도
            );
            newMarkers.push({ day: dayIndex, marker: createMarker(destinationLatLng, "도착") });
          }

          // `wayPoints` 처리
          if (mapItem.wayPoints && mapItem.wayPoints.length > 0) {
            mapItem.wayPoints.forEach((wayPoint, index) => {
              if (wayPoint.latlng) {
                const wayPointLatLng = new window.naver.maps.LatLng(
                  wayPoint.latlng.split(",")[1], // 위도
                  wayPoint.latlng.split(",")[0]  // 경도
                );
                console.log(`Adding waypoint ${index + 1}:`, wayPointLatLng); // wayPointLatLng 로그 출력
                newMarkers.push({ day: dayIndex, marker: createMarker(wayPointLatLng, `${index + 1}`) });
              }
            });
          }
        });

        // 마커 상태 업데이트
        setMarkers(newMarkers);

        // 선택된 day에 맞는 마커만 표시
        const updateMarkersVisibility = (day) => {
          newMarkers.forEach(({ day: markerDay, marker }) => {
            marker.setMap(markerDay === day ? map : null);
          });
        };

        // 처음 로드 시 첫 번째 day에 맞는 마커만 표시 (옵션)
        if (maps.length > 0) {
          updateMarkersVisibility(0);
        }

        // 버튼 클릭 시 마커 업데이트
        const dayButtons = document.querySelectorAll("#dayChecks input");
        dayButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const dayIndex = parseInt(button.value.replace("day", ""))-1;
            setActiveDay(dayIndex); // 선택된 day 상태 업데이트
            updateMarkersVisibility(dayIndex); // 해당 day에 맞는 마커만 보이도록 업데이트
          });
        });
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [maps]);

  return (
    <div id="mapPlan">
      <div id="map-container"></div>
      <div id="dayFrame">
        {maps.map((item, index) => (
          <div id="dayChecks" key={index}>
            <input
              type="button"
              value={"day" + `${index+1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map2;
