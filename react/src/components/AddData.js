import React, { useState } from "react";

const AddData = ({width}) => {
  const [data, setData] = useState([]);  // 입력된 데이터를 저장할 배열
  const [inputs, setInputs] = useState([{ value: "" }]);  // 여러 개의 input을 관리하는 배열

  // input 값이 변경되었을 때
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;  // 해당 인덱스의 input 값 업데이트
    setInputs(newInputs);
  };

  // bt1 버튼 클릭 시
  const handleBt1Click = (index) => {
    // 현재 input 값(data)에 추가
    const newData = [...data, inputs[index].value];
    setData(newData);

    // 새로운 input과 bt1을 추가
    const newInputs = [...inputs];
    newInputs.push({ value: "" });  // 새로운 빈 input을 추가
    setInputs(newInputs);
  };

  // bt2 버튼 클릭 시
  const handleBt2Click = (index) => {
    // 해당 input과 bt2를 삭제
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);

    // 해당 input의 값을 data에서 제거
    const newData = data.filter((item, idx) => idx !== index);
    setData(newData);
  };

  // bt3 버튼 클릭 시
  const handleBt3Click = (index) => {
    // 해당 줄의 input 값을 수정 (data에서 해당 인덱스의 값을 수정)
    const updatedData = [...data];
    updatedData[index] = inputs[index].value;  // 해당 index의 값을 input의 값으로 수정
    setData(updatedData);
  };

  return (
    <div >
      {inputs.map((input, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", }}>
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}  // input 값 변경 처리
            style={{
              width: width,
              height: "34px",
              borderRadius: "18px",
              textAlign: "center",
              fontSize: "17px",
            }}
          />
          {index === inputs.length - 1 ? (
            // 마지막 input에만 bt1 버튼을 표시
            <button
              onClick={() => handleBt1Click(index)}  // bt1 클릭 시 동작
              style={{
                width: "55px",
                height: "40px",
                borderColor: "#DADADA",
                borderRadius: "20px",
                backgroundColor: "#F6A354",
                border: "none",
                fontSize:"15px",
                color:"#fff"
              }}
            >
              추가
            </button>
          ) : (
            // bt2는 bt1이 없는 곳에만 표시
            <>
              <button
                onClick={() => handleBt2Click(index)}  // bt2 클릭 시 동작
                style={{
                  width: "55px",
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#878787",
                  border: "none",
                  fontSize:"15px",
                  marginRight:"7px",
                  color:"#fff"
                }}
              >
                삭제
              </button>
              <button
                onClick={() => handleBt3Click(index)}  // bt3 클릭 시 동작
                style={{
                  width: "55px",
                  height: "40px",
                  borderColor: "#DADADA",
                  borderRadius: "20px",
                  backgroundColor: "#F6A354",
                  border: "none",
                  fontSize:"15px",
                  color:"#fff"
                }}
              >
                수정
              </button>
            </>
          )}
        </div>
      ))}

     
    </div>
  );
};

export default AddData;