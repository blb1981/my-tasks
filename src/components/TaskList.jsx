import { HiMiniArrowsUpDown } from 'react-icons/hi2'

import Task from './Task'
import { useEffect, useState } from 'react'
import { Filters } from './Filters'

function TaskList({ tasks, onToggleComplete, onDeleteAttempt, onOpenModal }) {
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [showCompleted, setShowCompleted] = useState(false)
  const [textFilter, setTextFilter] = useState('')
  const [order, setOrder] = useState('asc')
  const [sortCol, setSortCol] = useState('name')

  function handleShowCompleteToggle() {
    setShowCompleted(!showCompleted)
  }

  function handleTextFilter(e) {
    setTextFilter(e.target.value)
  }

  // Sorting functionality help from the following URL
  // https://www.youtube.com/watch?v=g523Bj0y36Q&ab_channel=CodewithVoran
  function sorting(col) {
    if (order === 'asc') {
      const sorted = [...filteredTasks].sort(function (a, b) {
        if (col === 'dueDate') {
          return new Date(a.dueDate).getTime() > new Date(b.dueDate).getTime()
            ? 1
            : -1
        }
        return a[col] > b[col] ? 1 : -1
      })
      setFilteredTasks(sorted)
      setOrder('desc')
    }

    if (order === 'desc') {
      const sorted = [...filteredTasks].sort(function (a, b) {
        if (col === 'dueDate') {
          return new Date(a.dueDate).getTime() < new Date(b.dueDate).getTime()
            ? 1
            : -1
        }
        return a[col] < b[col] ? 1 : -1
      })
      setFilteredTasks(sorted)
      setOrder('asc')
    }
  }

  useEffect(
    function () {
      let filtered

      if (showCompleted) {
        filtered = tasks.filter((task) =>
          task.name.toLocaleLowerCase().includes(textFilter)
        )
      } else {
        filtered = tasks.filter(
          (task) =>
            !task.isComplete &&
            task.name.toLocaleLowerCase().includes(textFilter)
        )
      }

      setFilteredTasks(filtered)
    },
    [showCompleted, textFilter, tasks]
  )

  return (
    <>
      <div className='table-wrapper'>
        <h1 className='headline-1'>
          <span>My Tasks</span>
        </h1>
        <Filters
          showCompleted={showCompleted}
          onShowCompleteToggle={handleShowCompleteToggle}
          textFilter={textFilter}
          onTextFilter={handleTextFilter}
          onOpenModal={onOpenModal}
        />
        {filteredTasks.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th onClick={() => sorting('name')}>
                  <span>Task Name</span>
                  <span>
                    <HiMiniArrowsUpDown />
                  </span>
                </th>
                <th onClick={() => sorting('dueDate')}>
                  <span>Due Date</span>
                  <span>
                    <HiMiniArrowsUpDown />
                  </span>
                </th>
                <th>
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDeleteAttempt={onDeleteAttempt}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center'>Curently, no tasks to display</p>
        )}
      </div>
    </>
  )
}

export default TaskList
