import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import MobileAddButton from './components/MobileButton'
import Modal from './components/Modal'
import NewTaskForm from './components/NewTaskForm'
import RemoveTask from './components/RemoveTask'
import TaskList from './components/TaskList'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const [tasks, setTasks] = useState(function () {
    const storedTasks = localStorage.getItem('tasks')
    return JSON.parse(storedTasks) ?? []
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [addTaskAttempt, setAddTaskAttempt] = useState(false)
  const [deleteAttempt, setDeleteAttempt] = useState(false)
  const [updateAttempt, setUpdateAttempt] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState({})
  const [taskToUpdate, setTaskToUpdate] = useState({})

  function handleAddTask(text, dueDate) {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        name: text,
        isComplete: false,
        dueDate,
      },
    ])
    handleCloseModal()
  }

  function handleDeleteAttempt(task) {
    setDeleteAttempt(true)
    setModalOpen(true)
    setTaskToDelete(task)
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
    handleCloseModal()
  }

  function handleCompleteTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    )
  }

  function handleUpdateAttempt(task) {
    setUpdateAttempt(true)
    setModalOpen(true)
    setTaskToUpdate(task)
  }

  function handleUpdateTask(name, dueDate) {
    setTasks(
      tasks.map((task) =>
        task.id === taskToUpdate.id ? { ...taskToUpdate, name, dueDate } : task
      )
    )
    handleCloseModal()
  }

  function handleNewTaskModal() {
    setAddTaskAttempt(true)
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
    setAddTaskAttempt(false)
    setDeleteAttempt(false)
    setUpdateAttempt(false)
    setTaskToDelete({})
    setTaskToUpdate({})
  }

  useEffect(
    function () {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    },
    [tasks]
  )

  useEffect(function () {
    function handleAddTaskByKey(e) {
      if (e.key === 'a' && e.target.className !== 'text-filter') {
        handleNewTaskModal()
      }
    }
    document.addEventListener('keyup', handleAddTaskByKey, false)

    return function () {
      document.removeEventListener('keyup', handleAddTaskByKey, false)
    }
  }, [])

  return (
    <div className='container'>
      <ThemeSwitcher />
      <TaskList
        tasks={tasks}
        onToggleComplete={handleCompleteTask}
        onDeleteAttempt={handleDeleteAttempt}
        onOpenModal={handleNewTaskModal}
        onUpdateModal={handleUpdateAttempt}
      />
      {modalOpen && addTaskAttempt && (
        <Modal
          title='Add New Task'
          onCloseModal={handleCloseModal}
          component={<NewTaskForm onAddTask={handleAddTask} />}
        />
      )}
      {modalOpen && deleteAttempt && (
        <Modal
          title='Are you sure?'
          onCloseModal={handleCloseModal}
          component={
            <RemoveTask
              taskToDelete={taskToDelete}
              onDeleteTask={handleDeleteTask}
              onCloseModal={handleCloseModal}
            />
          }
        />
      )}
      {modalOpen && updateAttempt && (
        <Modal
          title='Update Task'
          onCloseModal={handleCloseModal}
          component={
            <NewTaskForm
              taskToUpdate={taskToUpdate}
              onUpdateTask={handleUpdateTask}
            />
          }
        />
      )}
      {/* <MobileAddButton onOpenModal={handleNewTaskModal} /> */}
    </div>
  )
}

export default App
