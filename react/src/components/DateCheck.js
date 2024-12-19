import React, {useContext} from "react";
import DatePicker from "react-datepicker";
import {ProjectContext} from "../context/ProjectContext";
import {addDays} from "date-fns";
import {ko} from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";

const DateCheck = () => {

    //전역상태 관리
    const {tripDates, setTripDates, tripTitle, setTripTitle, savedBtnClicked} = useContext(ProjectContext);
   
    return (
        <div className="tripPlan_content">
                      <div className="tripTitle">
                        <label>
                          여행 제목
                          <input
                            type="text"
                            name="tripTitle"
                            value={tripTitle}
                            onChange={(e) => setTripTitle(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="tripDates">
                        <div className="dateContents">
                          <h3>여행 기간</h3>
                          <DatePicker
                            selected={tripDates.startDate}
                            onChange={(dates) => {
                              const [start, end] = dates;
                              setTripDates({
                                startDate: start,
                                endDate: end,
                              });
                            }}
                            startDate={tripDates.startDate}
                            endDate={tripDates.endDate}
                            minDate={new Date()}
                            maxDate={tripDates.startDate ? addDays(tripDates.startDate, 9) : null}
                            selectsRange
                            dateFormat="yyyy-MM-dd"
                            locale={ko}
                            inline
                          />
                          {tripDates.startDate && tripDates.endDate && (
                            <div>
                              <p>여행 이름 : {tripTitle}</p>
                              <p>
                                출발 : {tripDates.startDate.toLocaleDateString("ko-KR")}
                            </p>
                            <p>
                                도착 : {tripDates.endDate.toLocaleDateString("ko-KR")}
                            </p>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DateCheck;