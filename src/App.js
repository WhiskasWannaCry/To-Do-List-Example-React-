import React, { useState, useEffect } from "react";
// import React, { useEffect } from "react";
import "./App.css";

let countId = 0;

function App() {
  const [todoArr,setTodoArr] = useState([])
  const [inputValue,setInputValue] = useState('')
  const [selectValue,setSelectValue] = useState('active')
  const reg = new RegExp(/([^\s])/);
  
  function handlerForInputNewTodo(e) {
    setInputValue(e.target.value)
  }
    
  function clickHandlerForAddNewTodo() {
    if(inputValue && inputValue.match(reg)) {
      const todoObj = {
        id: countId,
        text: inputValue,
        status: "active"
      }
      countId+=1
      setInputValue("")
      setSelectValue("active")
      setTodoArr(prev => {
        prev.push(todoObj)
        return [...prev];
      })
    }
    else alert("Некорректный Тудус")
  }
    
  function changeHandlerForSelect(e) {
    setSelectValue(e.target.value)
  }
      
  function clickHandlerForDeleteButton(id) {
    let copy = todoArr.slice()
    let idx = copy.findIndex(elem => elem.id === id)
    copy[idx].status = "deleted"
    setTodoArr(copy)
  }

  function clickHandlerForDoneButton(id) {
    let copy = todoArr.slice()
    let idx = copy.findIndex(elem => elem.id === id)
    copy[idx].status = "isDone"
    setTodoArr(copy)
  }
  return (
        <div className="container">
          <div className="input_and_button_container">
            <input className="input_new_todo"
            value={inputValue}
            onChange={handlerForInputNewTodo}>
            </input>
            <button className="add_new_todo" onClick={clickHandlerForAddNewTodo}>Add</button>
            <select onChange={changeHandlerForSelect}>
              <option value="active">Active</option>
              <option value="isDone">Doned</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
          <div className="output_todos">{
            todoArr.filter(elem => elem.status === selectValue).map(oneTodo => {
              if(oneTodo.status === "active") {
                return (
                  <div key={oneTodo.id} className="todo_container_active">
                    <div className="todo_text">{oneTodo.text}</div>
                    <div className="delete_and_done_buttons_container">
                      <button className="done_todo" onClick={() => clickHandlerForDoneButton(oneTodo.id)}></button>
                      <button value={oneTodo.id} className="delete_todo" onClick={() => clickHandlerForDeleteButton(oneTodo.id)}></button>
                    </div>
                  </div>)
              }
              else if(oneTodo.status === "deleted") {
                return (
                  <div key={oneTodo.id} className="todo_container_deleted">
                    <div className="todo_text">{oneTodo.text}</div>
                  </div>)
              }
              else if(oneTodo.status === "isDone") {
                return (
                  <div key={oneTodo.id} className="todo_container_doned">
                    <div className="todo_text">{oneTodo.text}</div>
                  </div>)
              }
            } )
          }
          </div>
        </div>
      );
}

export default App;