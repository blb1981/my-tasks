// TODO Add update task functionality
import { useState } from 'react'

const NewTaskForm = ({ onAddTask, taskToUpdate, onUpdateTask }) => {
  const [text, setText] = useState(taskToUpdate ? taskToUpdate.name : '')
  const [errors, setErrors] = useState([])

  // If taskToUpdate is sent in, convert it to string for HTML form
  // Also convert times to ISO format for HTML form
  let defaultDueDate
  if (taskToUpdate) {
    defaultDueDate = new Date(taskToUpdate.dueDate).toISOString().slice(0, 10)
  } else {
    // Set default due date to 1 week from day entered
    defaultDueDate = new Date()
    defaultDueDate.setDate(defaultDueDate.getDate() + 7)
    defaultDueDate = defaultDueDate.toISOString().slice(0, 10)
  }

  const [dueDate, setDueDate] = useState(defaultDueDate)

  function handleDueDate(e) {
    const dueAt = new Date(e.target.value).toISOString().slice(0, 10)
    setDueDate(dueAt)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrors([])

    if (!text) {
      setErrors(['Your task name is empty'])
      return
    }

    // TODO: Make sure all due dates are ending at the last second of the day selected
    // TODO Make due date time be 23:59 of the date, 7 days from now
    if (taskToUpdate) {
      onUpdateTask(text, dueDate)
    } else {
      onAddTask(text, dueDate)
    }
    setText('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='taskName'>Task name</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            id='taskName'
            placeholder='Enter your task...'
            autoComplete='off'
            autoFocus
          />
        </div>
        <div className='form-group'>
          <label htmlFor='dueDate'>Due date</label>
          <input
            type='date'
            onChange={handleDueDate}
            id='dueDate'
            value={dueDate}
          />
        </div>
        <p>
          <small>
            {!taskToUpdate &&
              'Due date will default to 1 week from now if not selected.'}
          </small>
        </p>
        {errors.length > 0 && <p className='errors'>{errors}</p>}
        <div>
          <button className='btn btn-blue'>
            {taskToUpdate ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </>
  )
}

export default NewTaskForm
