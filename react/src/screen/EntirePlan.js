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

    const { logData, setDeparture, setStopOverList, setDestination, dayChecks, setDayChecks, selectedDay ,departure,destination,stopOverList} = useContext(ProjectContext);



    const [trips, setTrips] = useState([]);  //{idx,title,startDate,lastDate} 
    const [maps, setMaps] = useState([]);    //{days,startPlace,startAddress,goalPlace,goalAddress,wayPoints} 
    const [checkList, setCheckList] = useState([]);     //{id,text,checked} 

    const [isUpdating, setIsUpdating] = useState(true);

    const [currentTitle, setCurrentTitle] = useState(null);

    useEffect(() => {
        if (!isUpdating) {
            alert("수정 모드")
        }
    }, [isUpdating])


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
        setCurrentTitle(trip.title);
        try {
            
            const response = await axios.get(`${API_BASE_URL}/4/${trip.title}`, {
                headers: logData.headers
                
            });

            const startDate = new Date(trip.startDate);
            const endDate = new Date(trip.lastDate);

            const diffTime = endDate - startDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            const daysArray = Array.from({ length: diffDays }, (_, index) => `Day ${index + 1}`);

            setDayChecks([...daysArray]);

            console.log("Mapresponse:", JSON.stringify(response.data[0].mapObject));
             
            // setMaps(response.data.map(item=>item.mapObject))
            const flatMapObjects = response.data.map(item => item.mapObject).flat();
            setMaps(flatMapObjects);
            
            setDeparture({ title: response.data[0].mapObject[selectedDay].startPlace, address: response.data[0].mapObject[selectedDay].startAddress, latlng:response.data[0].mapObject[selectedDay].startPoint })
            setDestination({ title: response.data[0].mapObject[selectedDay].goalPlace, address: response.data[0].mapObject[selectedDay].goalAddress, latlng:response.data[0].mapObject[selectedDay].goalPoint})
            setStopOverList([...response.data[0].mapObject[selectedDay].wayPoints])


            // setStopOverList({title: ,address:})
            // setDestination({title: ,address:})
            //   setMaps(response.data.mapObject);
            
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
            alert("checkList 추가를 안 해놔서 axios에러는 뜨지만 문제 x ");
        }
    }

    const putMapCheck = async () => {
        //maps put
        debugger;
        try {
            const response = await axios.put(
                `${API_BASE_URL}/2`,
                {
                    tripTitle: currentTitle,
                    mapObject: maps
                },
                {
                    headers: logData.headers
                }
            );
        } catch (err) {
            alert("put Map 에러");
        }

        //checkList put
        try {
            const response = await axios.put(
                `${API_BASE_URL}/3`,
                {
                    tripTitle: currentTitle,
                    items: checkList
                },
                {
                    headers: logData.headers
                }
            );
        } catch (err) {
            alert("put CheckList 에러");
        }
        setIsUpdating(() => !isUpdating)
    }

    const deleteTrip = async (idx) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/1/${idx}`)
            setTrips((prevTrips) => prevTrips.filter((trip) => trip.idx !== idx));
            alert("삭제 완료")
        } catch (err) {
            alert("삭제 실패");
        }
    }

    const handleTripTitleChange = (e, trip) => {
        setTrips((prevTrips) =>
            prevTrips.map((t) =>
                t.idx === trip.idx ? { ...t, title: e.target.value } : t
            )
        );
    };

    const handleCheckboxChange = (id) => {
        setCheckList((prevCheckList) =>
            prevCheckList.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleCheckListTextChange = (id, value) => {
        setCheckList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, text: value } : item
            )
        );
    };

    const addCheckList = () => {
        setCheckList((prev) =>
            [...prev, { id: Date.now(), text: '', checked: false }])
    }

    const deleteCheckList = (id) => {
        setCheckList((prev) =>
            prev.filter((item) =>
                item.id !== id
            )
        )
    }

    return (
        <div id='entirePlan'>
            <h2 style={{textAlign:'center', marginBottom:0}}>내일정 보기</h2>
        <div id="mapPlanContain">
            <div id="mapFrame">
                <Map />
            </div>
            <div id="planFrame">
                <div id="newTripBt">
                    {isUpdating ? (<p
                        style={{ marginLeft: "10px" }}
                        onClick={() => setIsUpdating(!isUpdating)}
                    >수정하기
                    </p>) : <p
                        style={{ marginLeft: "10px" }}
                        onClick={() => putMapCheck()}
                    >수정완료
                    </p>
                    }
                </div>

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
                                    onChange={(e) => handleTripTitleChange(e, trip)}
                                    value={trip.title}
                                >
                                </input>
                                <button
                                    onClick={() => deleteTrip(trip.idx)}
                                >삭제
                                </button>
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
                        {isUpdating ? maps && maps.length > 0 &&
                            <>
                                <input
                                    readOnly={isUpdating}
                                    value={departure.title}
                                />
                                <ul>
                                    {stopOverList.map((point) => (
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
                                    value={destination.title}
                                />
                            </> : <AddData />}


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
                            <li key={list.id}>
                                <input
                                    type="checkbox"
                                    checked={list.checked} // 상태 값에 따라 체크 여부 결정
                                    readOnly={isUpdating} // 수정 가능 여부
                                    onChange={() => handleCheckboxChange(list.id)} // 체크 상태 변경
                                />
                                <input
                                    value={list.text}
                                    readOnly={isUpdating} // 수정 가능 여부
                                    onChange={(e) => handleCheckListTextChange(list.id, e.target.value)} // 텍스트 변경
                                />
                                <button
                                    onClick={() => deleteCheckList(list.id)}
                                >삭제
                                </button>

                            </li>
                        ))}

                    </ul>
                    {!isUpdating && <button
                        onClick={() => addCheckList()}
                    >추가
                    </button>
                    }
                </div>

            </div>
        </div>
        </div>
    )
}

export default EntirePlan;