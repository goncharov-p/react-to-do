import React, { useState } from "react";
import axios from 'axios';

const Editing = ({task, dischargeEditTask}) => {
    const [text, setText] = useState(task.text);

    const updateTaskText = async() => {
      text?
        await axios.patch(`http://localhost:8000/updateTask`,{
        id:task._id,
        text:text
        }).then(res => {
          if (res.status !== 200) {
            alert('Ошибка!')
          }else{
            dischargeEditTask(text,task._id)
          }
        })
        :alert("Поле не может быть пустым!")
    }
    return (
        <div>
       <input type='text' value={text} onChange = {(e) => setText(e.target.value)}/>
       <button onClick={() => updateTaskText()}>Добавить изменение</button>
        </div>
    )
}

export default Editing;