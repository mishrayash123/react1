import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase-config'
import AddTask from './AddTask'

function TaskManager({uid}) {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [date, setdate] = useState("")

  useEffect(() => {
    const taskColRef = query(collection(db,uid), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })
      ))
    })
}, []);

 
  const filt= async () => {
    setTasks(tasks.filter(e=>e.data.Duedate==date));
  }

  return (
    <div className='taskManager'>
      {/* <header>Task Manager</header> */}
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add task +
        </button>
        <label for="start" className='text-center mt-4'>Filter By Due Date:</label>
        <input  type="date" id="date" name="addTask" className='w-50 bg-red-300 mx-auto' onChange={(e) => setdate(e.target.value)} 
          value={date}/>
          <button className='mt-2'
          onClick={() => filt()}>
          Filter
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title} 
              description={task.data.description}
              Created={task.data.created}
              duedate={task.data.Duedate}
              filterdate={date}
              uid={uid}
            />
          ))}

        </div>
      </div>
      {/* duedate={task.data.Duedate} */}
      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager