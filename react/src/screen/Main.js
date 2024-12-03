import React, { useEffect, useState } from "react";
import local1 from "../img/local1.gif";
import local2 from "../img/local2.gif";
import local3 from "../img/local3.gif";
import local4 from "../img/local4.gif";
import local5 from "../img/local5.gif";
import local6 from "../img/local6.gif";
import local7 from "../img/local7.gif";
import local8 from "../img/local8.png";
import "../css/Main.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navi=useNavigate()

    const [whiteBox, setWhiteBox] = useState(false);  // 흰 배경 박스를 띄우는 것을 조절하는 state
    const [select, setSelect] = useState(''); // 어떤 지역을 선택했는지 알려주는 state
    const [content, setContent] = useState(''); // 표출할 내용을 저장하는 state

    // select가 변경될 때마다 content를 업데이트
    useEffect(() => {
        const contentEvent = () => {
            switch (select) {
                case "서울":
                    setContent("서울에 대한 설명입니다");
                    break;
                case "경기":
                    setContent("경기에 대한 설명입니다");
                    break;
                case "인천":
                    setContent("인천에 대한 설명입니다");
                    break;
                case "강원":
                    setContent("강원에 대한 설명입니다");
                    break;
                case "충청":
                    setContent("충청에 대한 설명입니다");
                    break;
                case "전라":
                    setContent("전라에 대한 설명입니다");
                    break;
                case "경상":
                    setContent("경상에 대한 설명입니다");
                    break;
                case "제주":
                    setContent("제주에 대한 설명입니다");
                    break;
                default:
                    setContent(""); // select가 비어 있을 경우 content 초기화
            }
        };
        contentEvent(); // `select` 값이 변경될 때마다 `contentEvent` 실행
    }, [select]); // `select`가 변경될 때마다 실행

    return (
        <div id="main">
            {/* 큰 배너 */}
            <div id="bigbanner"></div>

            {/* 지역 4개 */}
            <div className="localSet">
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("서울");
                }}>
                    <div className="localName">
                        <p className="localEnglish">SEOUL</p> <p className="localKorea">서울</p>
                    </div>
                    <img src={local1} />
                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("경기");
                }}>
                    <div>
                        <p className="localEnglish">GYEONGGI</p> <p className="localKorea">경기</p>
                    </div>
                    <img src={local2} />
                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("인천");
                }}>
                    <div>
                        <p className="localEnglish">INCHEON</p> <p className="localKorea">인천</p>
                    </div>
                    <img src={local3} />
                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("강원");
                }}>
                    <div>
                        <p className="localEnglish">GANGWON</p> <p className="localKorea">강원</p>
                    </div>
                    <img src={local4} />
                </div>
            </div>

            {/* 지역 4개 */}
            <div className="localSet">
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("충청");
                }}>
                    <div>
                        <p className="localEnglish">CHUNCHEONG</p> <p className="localKorea">충청</p>
                    </div>
                    <img src={local5} />
                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("전라");
                }}>
                    <div>
                        <p className="localEnglish">JEOLLA</p> <p className="localKorea">전라</p>
                    </div>
                    <img src={local6} />
                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("경상");
                }}>
                    <div>
                        <p className="localEnglish">GYEONGSANG</p> <p className="localKorea">경상</p>
                    </div>
                    <img src={local7} />
                </div>
                <div className="localtrip" onClick={() => {
                    setWhiteBox(true);
                    setSelect("제주");
                }}>
                    <div>
                        <p className="localEnglish">JEJU</p> <p className="localKorea">제주</p>
                    </div>
                    <img src={local8} />
                </div>
            </div>

            {/* 클릭시 팝업 페이지 */}
            {whiteBox && (
                <div className="overlay">
                    <div className="boxContent">
                        <p style={{fontSize:"25px" , color:"#706F6F"}}>{content}</p>
                        <div>
                        <button id="mainBackBt" onClick={() => setWhiteBox(false)}>돌아가기</button>
                        <button id="mainNewBt" onClick={()=>{navi("/newtrip")}}>일정 만들기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;