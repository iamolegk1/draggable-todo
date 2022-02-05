import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor(),
        defaultPosition: {
          x: 500,
          y: -700,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      alert("enter");
      setItem("");
    }
  };

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePosition = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPosition = { x: data.x, y: data.y };
    setItems(newArray);
  };

  const keyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      newItem();
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={item}
          className="input"
          onKeyPress={(e) => keyPress(e)}
          type="text"
          placeholder="Enter"
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <button className="enter" onClick={newItem}>
          ENTER
        </button>
      </div>

      {items.map((item, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={item.defaultPosition}
            onStop={(e, data) => {
              updatePosition(data, index);
            }}
          >
            <div className="todoItem" style={{ backgroundColor: item.color }}>
              {`${item.item}`}
              <button className="delete" onClick={() => deleteNode(item.id)}>
                X
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
