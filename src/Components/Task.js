import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from './firebase-config'


function Task({id, title, description, completed,Created,duedate,uid}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, uid, id)
    try{
      await updateDoc(taskDocRef, {
        completed: checked
      })
    } catch (err) {
      alert(err)
    }
  }

  /* function to delete a document from firstore */ 
  const handleDelete = async () => {
    const taskDocRef = doc(db, uid, id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={handleChange}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} >Completed</label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description.slice(0, 10)}............</p>
        <p>Created On : {Created}</p>
        <p>Due Date : {duedate}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-zinc-900 via-pink-900 to-zinc-900 border border-light border  border-opacity-10 fixed-bottom mt-5" >
        <div className="w-20 mx-auto ">
      <a className="nav-link hover:text-white" target="_blank"  href="https://github.com/mishrayash123/react1"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-github m-1 mx-4" viewBox="0 0 16 16">
<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg></a>
      </div>
      <div className="mb-1">
    <h5 className=" text-center text-light mt-1 mb-1 italic ">Copyright © 2023 • Yash Kumar Mishra</h5>
      </div>
      
  </div>
      </div>
      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={title} 
          description={description} 
          open={open.view} 
          uid={uid}
          />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditDescription={description} 
          toduedate={duedate} 
          open={open.edit}
          id={id} 
          uid={uid}
          />
      }

    </div>
  )
}

export default Task