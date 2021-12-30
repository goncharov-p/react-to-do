import React, { useState,useEffect  } from 'react'; 
import axios from 'axios';
import Editing from './Editing';
import './App.scss';
import logo from './images/editing.png';



const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editTask, setEditTask] = useState(null);
  const link = `http://localhost:8000`;
  
  useEffect(async() => {
    await axios.get(`${link}/allTasks`).then(res =>{
      setTasks(res.data.data);
    });
  }, [] )

  const addNewATask = async() =>{
    text?
    await axios.post(`${link}/createTask`, {
      text,
      isCheck: false
    }).then(res => {
      setText('');
      const updatedList = [...tasks, res.data];
      setTasks(updatedList)
    })
    :alert("Поле не может быть пустым!")
  }

const deleteTask = async(id,index) =>{
  await axios.delete(`${link}/deleteTask?id=${id}`).then(res => {
    if (res.status !== 200) {
      alert('Ошибка!')
    } else {
     const deleteTask = tasks.filter((task) => task._id !=id);
     setTasks(deleteTask);
    }
  })

}


const handleChangeCheckbox = async(id,Check) => {
  await axios.patch(`${link}/updateTask`,{
        id:id,
        isCheck:!Check,
        }).then(res => {
          if (res.status !== 200) {
            alert('Ошибка!')
          }else{
            const mas = tasks.map(value => {
              const newValue = {...value};
              if (newValue._id === id) {
                newValue.isCheck = !newValue.isCheck;
              }
              return newValue
            });
            setTasks(mas);
          }
        })

}

const dischargeEditTask = (newText,id) => {
  setEditTask("");
  const mas = tasks.map(value => {
    const newValue = {...value};
    if (newValue._id === id) {
      newValue.text = newText;
    }
    return newValue
  });
  setTasks(mas);
}

  return (
    <div className='main'>
       <h1> To-do list</h1>
       <div className='input-one'>
          <input type='text' value={text} onChange={(e) => setText(e.target.value)}/>
          <button variant="primary" size="lg" onClick={() => addNewATask()}>Add new</button>
       </div>
       <div className='tasks-block'>
          {
            tasks
            .sort((a,b)=>{
              if (a.isCheck === b.isCheck) return 0;
              return (a.isCheck > b.isCheck) ? 1 : -1
              })
            .map((task, index) => (
                <div key={`${task._id}`} className='task'> 
                  <input  className="input-checkbox" type="checkbox" checked={task.isCheck} onChange={()=>handleChangeCheckbox(task._id,task.isCheck)}/>
                  {editTask !== task ? 
                  <div className='text-block'> 
                  {task.isCheck?
                      <span className='text-line'>{task.text}</span>
                      :<span className='text'>{task.text}</span>}  <img src={logo} alt="logo" onClick={() => setEditTask(task)}/> 
                    <button className='button-delete' onClick={() => deleteTask(task._id)}>X</button>   
                  </div> 
                  :(<Editing task={editTask} dischargeEditTask={dischargeEditTask}/>) }           
                </div>
            ))
          }
       </div>
    </div>
  );
}

export default App;
