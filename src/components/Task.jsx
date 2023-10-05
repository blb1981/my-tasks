import { FaRegTrashAlt } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'
import { BsPencil } from 'react-icons/bs'

function Task({ task, onToggleComplete, onDeleteAttempt, onUpdateModal }) {
  return (
    <>
      <tr key={task.id}>
        <td
          style={{
            textDecoration: task.isComplete ? 'line-through' : '',
            opacity: task.isComplete ? '.5' : '1',
          }}
        >
          {task.name}
        </td>
        <td
          style={{
            textDecoration: task.isComplete ? 'line-through' : '',
            opacity: task.isComplete ? '.5' : '1',
          }}
        >
          {new Date(task.dueDate).toISOString().slice(0, 10)}
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
    </>
  )
}

export default Task
