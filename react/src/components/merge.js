  useEffect(() => {
    if (mapRef.current && address) {
      const map = mapRef.current;

      window.naver.maps.Service.geocode(
        { query: address },
        (status, response) => {
          if (status === window.naver.maps.Service.Status.ERROR) {
            alert("주소를 찾을 수 없습니다.");
            return;
          }

          const result = response.v2;
          const latlng = new window.naver.maps.LatLng(result.addresses[0].y, result.addresses[0].x);

          // 출발지 및 목적지 설정
          if (!startPoint) {
            setStartPoint(latlng);
          } else if (startPoint && !goalPoint) {
            setGoalPoint(latlng);
          } else if (!wayPoints.some((point) => point.equals(latlng)) && !goalPoint.equals(latlng)) {
            setWaypoints((prevWaypoints) => [...prevWaypoints, latlng]);
          }

          map.setCenter(latlng);

          const bounds = new window.naver.maps.LatLngBounds();
          const createMarkerIcon = (text) => ({
            content: `
              <div style="width: 30px; height: 30px; background-color: white; color: black; text-align: center; border-radius: 50%; line-height: 30px; font-size: 14px; font-weight: bold; position: relative; border: 3px solid #F6A354;">
                ${text}
                <div style="content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #F6A354;"></div>
              </div>
            `,
            size: new window.naver.maps.Size(30, 30),
            anchor: new window.naver.maps.Point(15, 15),
          });

          // 마커를 제거하고 새로 추가
          markersRef.current.forEach((marker) => marker.setMap(null));
          markersRef.current = [];

          // 출발지 마커
          if (startPoint) {
            console.log("startPoint ; "+startPoint)
            const startMarker = new window.naver.maps.Marker({
              position: startPoint,
              map: map,
              icon: createMarkerIcon("S"),
            });
            markersRef.current.push(startMarker);
            bounds.extend(startMarker.getPosition());
          }

          // 목적지 마커
          if (goalPoint) {
            console.log("goalPoint : "+goalPoint)
            const goalMarker = new window.naver.maps.Marker({
              position: goalPoint,
              map: map,
              icon: createMarkerIcon("G"),
            });
            markersRef.current.push(goalMarker);
            bounds.extend(goalMarker.getPosition());
          }

          // 경유지 마커
          if (wayPoints && wayPoints.length > 0) {
            console.log("wayPoint : "+wayPoints)
            wayPoints.forEach((point, index) => {
              const waypointMarker = new window.naver.maps.Marker({
                position: point,
                map: map,
                icon: createMarkerIcon(`${index + 1}`),
              });
              markersRef.current.push(waypointMarker);
              bounds.extend(waypointMarker.getPosition());
            });
          }

          // 경로 표시
          if (path) {
            const pathCoordinates = path.map(([longitude, latitude]) => new window.naver.maps.LatLng(latitude, longitude));
            polylineRef.current = new window.naver.maps.Polyline({
              path: pathCoordinates,
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 3,
            });
            polylineRef.current.setMap(map);
            pathCoordinates.forEach((coord) => bounds.extend(coord));
          }

          map.fitBounds(bounds);
          map.setZoom(map.getZoom() - 1);
        }
      );
    }
  }, [address, path, startPoint, goalPoint, wayPoints]);

  const resetMapElements = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (mapRef.current) {
      mapRef.current.setZoom(15);
      mapRef.current.setCenter(new window.naver.maps.LatLng(37.5665, 126.9780));
    }
  }