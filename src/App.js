import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const taskList = []

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(taskList)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await global.fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await global.fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const addTask = async (task) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    }

    const res = await global.fetch('http://localhost:5000/tasks', fetchOptions)
    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await global.fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    }
    const res = await global.fetch(`http://localhost:5000/tasks/${id}`, fetchOptions)
    const data = await res.json()

    const mapper = (task) => {
      if (task.id === id) {
        return { ...task, reminder: data.reminder }
      } else {
        return task
      }
    }

    setTasks(tasks.map(mapper))
  }

  const tasksComponent = (
    <Tasks
      tasks={tasks}
      onDelete={deleteTask}
      onToggle={toggleReminder}
    />
  )

  return (
    <Router>
      <div className='container'>
        <Header
          title='Task Tracker'
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? tasksComponent : 'No tasks to show'}
            </>
          )}
        />

        <Route path='/about' component={About} />

        <Footer />
      </div>
    </Router>
  )
}

export default App
