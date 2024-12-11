import React from "react";

const Map = () => {
    // 임시 배열
    const dayChacks = ['일정1', '일정2', '일정3'];
    return (
        <div id="mapPlan" style={{
            width: "100%", 
            height: "100%", 
            position: "relative", 
            display: "flex", 

        }}>
            {/* 배경색을 넣어주는 div */}
            <div id="map" style={{
                position: 'absolute',
                width: "100%",
                height: "100%",
                backgroundColor: '#A3A3A3',
                zIndex: -1  // 배경을 다른 내용보다 뒤로 보이게 하기 위해 z-index를 설정
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