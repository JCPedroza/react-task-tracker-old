import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
  const mapper = (task) => {
    return (
      <Task
        key={task.id}
        task={task}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    )
  }

  return (
    <>
      {tasks.map(mapper)}
    </>
  )
}

export default Tasks
