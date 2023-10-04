import { FaRegTrashAlt } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'

function Task({ task, onToggleComplete, onDeleteAttempt }) {
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
          {new Date(task.dueDate).toLocaleDateString()}
        </td>
        <td className='table-actions'>
          <button
            className='btn btn-blue'
            onClick={() => onToggleComplete(task.id)}
          >
            <GiCheckMark />
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
