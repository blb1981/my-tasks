// TODO Add update task functionality
import { useState } from 'react'

const NewTaskForm = ({ onAddTask }) => {
  const [text, setText] = useState('')
  const [errors, setErrors] = useState([])

  // Set default due date to 1 week from day entered
  let defaultDueDate = new Date()
  defaultDueDate.setDate(new Date().getDate() + 7)
  const [dueDate, setDueDate] = useState(defaultDueDate)
  // TODO Make due date time be 23:59 of the date, 7 days from now

  function handleDueDate(e) {
    // Set to last second of the selected day
    // This allows for "today" to be the due date
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
    const dateTimeString = `${e.target.value}T23:59`
    const dueAt = new Date(dateTimeString)
    setDueDate(dueAt)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErrors([])

    if (!text) {
      setErrors(['Your task name is empty'])
      return
    }

    // If due date is in the past, add error
    const today = new Date()
    if (today.getTime() > dueDate.getTime()) {
      setErrors(['Your due date is in the past.'])
      return
    }

    onAddTask(text, dueDate)
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
          <input type='date' onChange={handleDueDate} id='dueDate' />
        </div>
        <p>
          <small>
            Due date will default to 1 week from now if not selected.
          </small>
        </p>
        {errors.length > 0 && <p className='errors'>{errors}</p>}
        <div>
          <button className='btn btn-blue'>Add Task</button>
        </div>
      </form>
    </>
  )
}

export default NewTaskForm
