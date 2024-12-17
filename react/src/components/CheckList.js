import React, { useContext, useState } from "react";
import "../css/CheckList.css";
import { ProjectContext } from "../context/ProjectContext";
import axios from "axios";
import { API_BASE_URL } from "../service/api-config";

function CheckList() {

  const token = window.localStorage.getItem("token");
  const logData = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const [input, setInput] = useState('');
  // const token = window.localStorage.getItem("token");
  // const [userData, setUserData] = useState({});
  const { input, setInput } = useContext(ProjectContext);
  const { items, setItems} = useContext(ProjectContext);

  //POST API 하기 위해 필요한것 userId
  const addItem = async () => {
    debugger;
    if (input.trim()) {
      const maxId = items.length > 0 
      ? Math.max(...items.map((item) => item.id || 0)) 
      : 0;

    const newItem = { 
      id: maxId + 1, // 가장 큰 id에 1을 더함
      text: input, 
      checked: false 
    };

    // 기존 items 배열에 새 항목 추가
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/3`,
          { checkList: items },
          logData
        );
        console.log(response.data.value);
      } catch (error) {
        console.log("에러 메시지 : ", error);
      }
      // setInput("");
    }
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="checklistAll">
      <h2>체크리스트</h2>
      <div className="checkInput">
        <input
          type="text"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="체크 해야할 것이 있나요?"
        />
        <button onClick={addItem}>추가</button>
      </div>
      <div className="checkContents">
        <ul className="checkUl" style={{ padding: 0 }}>
          {items.map((item) => (

            <li className="checkLi"
                key={item.id}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
              />
              <span
                style={{
                  textDecoration: item.checked ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
              <button type="button" onClick={() => deleteItem(item.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CheckList;
