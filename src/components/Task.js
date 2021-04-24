import { FaTimes } from 'react-icons/fa'

const timesStyle = {
  color: 'red',
  cursor: 'pointer'
}

const Task = ({ task, onDelete, onToggle }) => {
  const times = (
    <FaTimes
      style={timesStyle}
      onClick={() => onDelete(task.id)}
    />
  )

  const classReminder = task.reminder ? 'reminder' : ''

  return (
    <div
      className={`task ${classReminder}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>{task.text} {times}</h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
