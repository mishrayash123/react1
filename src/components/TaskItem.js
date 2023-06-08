import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, title, description}) {

  return (
    <Modal modalLable='Task' onClose={onClose} open={open}>
      <div className='taskItem'>
      <label >Title:</label>
        <h2>{title}</h2>
        <label >Description:</label>
        <p>{description}</p>

      </div>
    </Modal>
  )
}

export default TaskItem