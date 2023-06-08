import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from './firebase-config'

function EditTask({open, onClose, toEditTitle, toEditDescription, id,toduedate}) {

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)
  const [duedate, setduedate] = useState(toduedate)

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await updateDoc(taskDocRef, {
        title: title,
        description: description,
        Duedate:duedate
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
      <label >Title:</label>
        <input type='text' name='title' onChange={(e) => setTitle(e.target.value.toUpperCase())} value={title}/>
        <label for="start">Due Date:</label>
        <input  type="date" id="date" name="addTask" onChange={(e) => setduedate(e.target.value)} 
          value={duedate}/>
          <label >Description:</label>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask