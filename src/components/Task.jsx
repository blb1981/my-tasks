import { FaRegTrashAlt } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'
import { BsPencil } from 'react-icons/bs'

import Badge from './Badge'

import { getDisplayDate } from '../utils/getDisplayDate'

function Task({ task, onToggleComplete, onDeleteAttempt, onUpdateModal }) {
  const warningHours = 24
  function getHoursInMS(hours) {
    return hours * 3600000
  }

  // Set to warn if due date is less than 24 hours from now
  const warnTimeInMS = getHoursInMS(warningHours)
  const nowMS = new Date().getTime()
  const dueDateMS = new Date(task.dueDate).getTime()
  const oneDayFromDueDateMS = dueDateMS + getHoursInMS(24)
  let shouldWarn = oneDayFromDueDateMS - nowMS < warnTimeInMS

  const isExpired = nowMS > oneDayFromDueDateMS

  if (isExpired) {
    shouldWarn = false
  }

  return (
    <tr>
      <td
        style={{
          textDecoration: task.isComplete ? 'line-through' : '',
          opacity: task.isComplete ? '.5' : '1',
        }}
      >
        {task.name}
        {!task.isComplete && shouldWarn && <Badge status='warning' />}
        {!task.isComplete && isExpired && <Badge status='danger' />}
      </td>
      <td
        style={{
          textDecoration: task.isComplete ? 'line-through' : '',
          opacity: task.isComplete ? '.5' : '1',
        }}
      >
        {getDisplayDate(task.dueDate)}
      </td>
      <td className='table-actions'>
        <button
          className='btn btn-green'
          onClick={() => onToggleComplete(task.id)}
        >
          <GiCheckMark />
        </button>
        <button className='btn btn-blue' onClick={() => onUpdateModal(task)}>
          <BsPencil />
        </button>
        <button className='btn btn-red' onClick={() => onDeleteAttempt(task)}>
          <FaRegTrashAlt />
        </button>
      </td>
    </tr>
  )
}

export default Task
