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

        let markers = [];
        let polylines = [];

        const clearMapData = () => {
          markers.forEach(marker => marker.setMap(null)); // 기존 마커 제거
          polylines.forEach(polyline => polyline.setMap(null)); // 기존 폴리라인 제거
          markers = [];
          polylines = [];
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

            clearMapData(); // 기존 마커와 폴리라인 지우기

            const selectedData = mapObject.find(data => data.days === selectedDay + 1); // selectedDay에 맞는 데이터 찾기
            if (selectedData) {
              const { startPlace, startAddress, goalPlace, goalAddress, wayPoints } = selectedData;

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
                  const waypointMarker = new window.naver.maps.Marker({
                    position: point,
                    map: map,
                    icon: createMarkerIcon(`${index + 1}`)
                  });
                  markers.push(waypointMarker);
                  bounds.extend(waypointMarker.getPosition());
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

  const handleDayClick = (day) => {
    const handleSubmit = () => {
      setDeparture({ title: '', address: '' });
      setStopOverList([]);
      setDestination({ title: '', address: '' });
      closeModal();
      setSelectedDay(day);
    };

    if (!mapObject.find(data => data.days === selectedDay + 1)) {
      openModal({
        title: "주의",
        message: "저장 안했는데 넘어갈거야?",
        actions: [
          { label: "확인", onClick: handleSubmit, className: "confirm-btn" },
          { label: "돌아가기", onClick: closeModal, className: "cancel-btn" },
        ],
      });
    } else {
      setDeparture({ title: '', address: '' });
      setStopOverList([]);
      setDestination({ title: '', address: '' });
      setSelectedDay(day);
    }
  };

  return (
    <div id="mapPlan">
      <div id="map-container"></div>
      <div id="dayFrame">
        {dayChecks.map((item, index) => (
          <div id="dayChecks" onClick={() => handleDayClick(index)} key={index}>
            {item}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalMessage}
        actions={modalActions}
      />
    </div>
  );
};

export default Map;
