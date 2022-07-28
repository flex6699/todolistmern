import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import tick from "./image/tick.png";
function App() {
  const [text, setText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [rerender, setRerender] = useState(false);

  //update
  const updateItem = async (id, check) => {
    try {
      console.log(rerender);
      setRerender(true);
      const res = await axios.put(`http://localhost:5500/api/item/${id}`, {
        isCompleted: check,
      });
      const updateIndex = listItems.findIndex((item) => item._id === id);
      listItems[updateIndex].isCompleted = check;
      setRerender(false);
    } catch (err) {
      console.log(err);
    }
  };

  // delete
  const deleteItems = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
    } catch (err) {
      console.log(err);
    }
  };
  const addItem = async () => {
    try {
      if (text.length === 0) {
        alert("Task is empty");
      } else {
        const res = await axios.post("http://localhost:5500/api/item", {
          item: text,
          isCompleted: false,
        });

        setListItems((prev) => [...prev, res.data]);
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/item");
        console.log(res.data);
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do list</h1>
        <div className="top">
          <label>
            Add a new task in the list
            <div className="add">
              <input
                type="text"
                placeholder="Enter the task here"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={addItem}>Submit</button>
            </div>
          </label>
        </div>
        <div className="main-list">
          <h2>Added task in to-do list</h2>
          <div className="item">
            <div className="text">
              {listItems.map((item, index) => {
                return (
                  <div className="list-item" key={index}>
                    {item.isCompleted && <img src={tick} alt="tick" />}
                    <span>{index + 1}.</span>
                    <div
                      className={
                        !item.isCompleted
                          ? "p-item incomplete"
                          : "p-item complete"
                      }
                    >
                      <p>{item.item}</p>

                      <div className="underline"></div>
                      <div className="end-part">
                        {!item.isCompleted && (
                          <button
                            className="mark"
                            onClick={() => {
                              return updateItem(
                                item._id,
                                item.isCompleted ? false : true
                              );
                            }}
                          >
                            Mark as completed
                          </button>
                        )}
                        {item.isCompleted && (
                          <button
                            className="complete-task"
                            onClick={() => {
                              return updateItem(
                                item._id,
                                item.isCompleted ? false : true
                              );
                            }}
                          >
                            Mark as incomplete
                          </button>
                        )}
                        <button
                          className="delete"
                          onClick={() => {
                            deleteItems(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
