import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from './firebase-config'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import React, {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase-config";

function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [Duedate, setDuedate] = useState('')
  const [uid, setuid] = useState("hfhjgvhb");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setuid(user.uid);

            
        } else {
            setuid("");

        }
    });

}, [auth.currentUser]);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, uid), {
        title: title,
        description: description,
        completed: false,
        Duedate:Duedate,
        created: new Date((Date.now())).toDateString()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
          <label for="start">Due Date:</label>
        <input  type="date" id="date" name="addTask" onChange={(e) => setDuedate(e.target.value)} 
          value={Duedate}/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask