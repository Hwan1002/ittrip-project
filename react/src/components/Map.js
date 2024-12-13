import React,{useEffect,useContext} from "react";
import { ProjectContext } from "../context/ProjectContext";


const Map = () => {
    // 임시 배열
    const dayChacks = ['일정1', '일정2', '일정3'];
    const { address } = useContext(ProjectContext);
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
    
            window.naver.maps.Service.geocode({
              query: (address === undefined ? '서울':address )
            }, (status, response) => {
              if (status === window.naver.maps.Service.Status.ERROR) {
                alert('주소를 찾을 수 없습니다.');
                return;    
              }
    
              // 변환된 좌표 가져오기
              const result = response.v2;
              const latlng = new window.naver.maps.LatLng( result.addresses[0].y ,result.addresses[0].x );
              console.log(latlng)


              

              // 지도에 마커 추가
              new window.naver.maps.Marker({   
                position: latlng,
                map: map
              }); 

    
              // 지도 위치를 마커로 이동
              map.setCenter(latlng);
            });
          }
        };

    
        // 스크립트 로드를 DOM에 추가
        document.body.appendChild(script);
    
        // 컴포넌트가 언마운트될 때 스크립트 제거
        return () => {
          document.body.removeChild(script);
        };
      }, [address]);



    const handleChecks =() =>{
      alert("클릭됨")
    }

    return (
        <div id="mapPlan" style={{
            width: "100%", 
            height: "100%", 
            position: "relative",  
            display: "flex", 
        }}>
            {/* 배경색을 넣어주는 div */}
            <div id="map-container"  style={{
                position: 'absolute',
                width: "100%",
                height: "100%",
                backgroundColor: '#A3A3A3',
                // zIndex: -1  // 배경을 다른 내용보다 뒤로 보이게 하기 위해 z-index를 설정
            }}></div>

            {/* Day 요소들 배치 */}
            <div id="dayFrame" style={{
                display: 'flex',    // flexbox로 Day들을 가로로 나열
        
                position: 'absolute',  // 부모 div에 맞게 절대 위치 설정
                top: '10px',   // 부모 div의 위에서 20px 떨어지게 설정
                left: "14px",
            }}>
                {/* dayChacks 배열의 항목에 따라 DayN 요소 생성 */}
                {dayChacks.map((day, index) => (
                    <div style={{
                        textAlign: "center",
                        width: 62,   // 각 Day 요소의 너비
                        height: 30,  // 각 Day 요소의 높이
                        backgroundColor: "#F6A354", 
                        color: "#fff", 
                        borderRadius: 18, 
                        padding: "4px 6px 2px 4px", 
                        margin: "20px 10px", // 요소들 사이의 여백
                    }} key={index}>Day {index + 1}</div>
                ))}
            </div>
        </div>
    );
}

export default Map;