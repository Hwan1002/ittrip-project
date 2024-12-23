import React, { useContext, useState, useEffect } from "react";
import "../css/EntirePlan.css"
import { Link } from "react-router-dom";
import Map from "../components/Map";
import '../css/Reset.css'
import Plus2 from "../img/plus2.svg"
import { API_BASE_URL } from "../service/api-config";
import AddData from "../components/AddData";
import { ProjectContext } from "../context/ProjectContext";
import axios from "axios";


const EntirePlan = () => {

    const { logData, selectedDay } = useContext(ProjectContext);

    const [trips, setTrips] = useState([]);  //{idx,title,startDate,lastDate} 
    const [maps, setMaps] = useState([]);    //{days,startPlace,startAddress,goalPlace,goalAddress,wayPoints} 
    const [checkList, setCheckList] = useState([]);     //{id,text,checked} 

    const [isUpdating, setIsUpdating] = useState(true);


    useEffect(() => {
        console.log("trip객체: " + JSON.stringify(trips));
        console.log("map객체: " + JSON.stringify(maps));
        console.log("checkList객체 : " + JSON.stringify(checkList))
    }, [trips, maps, checkList])


    useEffect(() => {
        // API 호출
        const fetchTrips = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/3`, {
                    headers: logData.headers                        //getMapping에선 header와 param을 명시해줘야한다고 함. (logData만 쓰니 인식 못 함)
                });
                console.log("response:" + JSON.stringify(response.data.data));
                setTrips(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrips();
    }, []);


    const fetchMapCheck = async (trip) => {
        try {
            setMaps([]);
            const response = await axios.get(`${API_BASE_URL}/4`, {
                headers: logData.headers,
                params: {
                    tripTitle: trip.title
                },
            });
            console.log("response:", response.data[0].mapObject);
            response.data.map((trip) => setMaps((prev) => [...prev, trip.mapObject]));
            //   setMaps(response.data.mapObject);
            console.log("maps: " + JSON.stringify(maps))
        } catch (err) {
            alert("get Map 에러");
        }

        try {
            setCheckList([]);
            const response = await axios.get(`${API_BASE_URL}/5`, {
                headers: logData.headers,
                params: {
                    tripTitle: trip.title
                },
            });
            setCheckList(() => (response.data.items));
        } catch (err) {
            alert("get CheckList 에러");
        }
    }





    return (
        <div id="entirePlan">
            <div id="mapFrame">
                <Map />
            </div>

            <div id="planFrame">
                <div id="newTripBt">
                    <p
                        style={{ marginLeft: "10px" }}
                        onClick={() => setIsUpdating(!isUpdating)}
                    >수정</p></div>

                {/* 여행목록 */}
                <p style={{ color: "#F6A354", fontSize: "20px", marginBottom: "5px" }}>여행목록</p>
                <div
                    style={{
                        border: "2px solid #DADADA",
                        borderRight: "none",
                        borderLeft: "none",
                        overflowY: "auto",  // 세로 스크롤을 가능하게 함 
                        padding: "10px",  // 내부 여백을 추가 (선택 사항)
                        width: "300px",
                        height: "160px"
                    }}
                >
                    {/* axios로 가져온 title 목록 띄워주는 곳곳 */}
                    <ul>
                        {trips.map(trip => (
                            <li
                                key={trip.idx}
                            >
                                <input
                                    /* 해당 title로 map을 띄워주는 get요청을 onclick에 담을 것 , 해당 title의 end-start 로 day갯수도 띄워줘야함함*/
                                    readOnly={isUpdating}
                                    onClick={() => fetchMapCheck(trip)}
                                    value={trip.title}
                                >
                                </input>
                            </li>
                        ))}
                    </ul>


                </div>

                <p style={{ color: "#F6A354", fontSize: "20px", marginBottom: "5px" }}>여행경로</p>
                <div
                    style={{
                        border: "2px solid #DADADA",
                        borderRight: "none",
                        borderLeft: "none",
                        overflowY: "auto",  // 세로 스크롤을 가능하게 함 
                        padding: "10px",  // 내부 여백을 추가 (선택 사항)
                        width: "300px",
                        height: "160px"
                    }}
                >
                    {/* map의 경로 출발지와 waypoint들 목적지 띄워주는 곳 */}
                    <div>
                        {maps && maps.length > 0 &&
                            <>
                                <input
                                    readOnly={isUpdating}
                                    value={maps[0][selectedDay]?.startPlace}
                                />
                                <ul>
                                    {maps[0][selectedDay].wayPoints.map((point) => (
                                        <li key={point.id}>
                                            <input
                                                readOnly={isUpdating}
                                                value={point.value}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <input
                                    readOnly={isUpdating}
                                    value={maps[0][selectedDay]?.goalPlace}
                                />
                            </>
                        }
                    </div>
                </div>

                <p style={{ color: "#F6A354", fontSize: "20px", marginBottom: "5px", }}>체크리스트</p>
                <div
                    style={{
                        border: "2px solid #DADADA",
                        borderRight: "none",
                        borderLeft: "none",
                        overflowY: "auto",  // 세로 스크롤을 가능하게 함 
                        padding: "10px",  // 내부 여백을 추가 (선택 사항)
                        width: "300px",
                        height: "160px"
                    }}
                >
                    {/*체크리스트 나열해주는 곳 */}
                    <ul>
                        {checkList.map((list) => (
                            <li
                                key={list.id}
                            >
                                <input
                                    type="checkbox"
                                    checked={list.checked}  // 상태 값에 따라 체크 여부 결정
                                    
                                />
                                <input
                                    readOnly
                                    value={list.text}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default EntirePlan