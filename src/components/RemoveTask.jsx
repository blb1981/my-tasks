function RemoveTask({ taskToDelete, onDeleteTask, onCloseModal }) {
  return (
    <div className='remove-task'>
      <p className='text-center'>
        Are you sure you want to remove the task <br /> &quot;
        {taskToDelete.name}&quot;??
      </p>
      <div className='btn-inline-group'>
        <button className='btn btn-blue' onClick={() => onCloseModal()}>
          No
        </button>
        <button
          className='btn btn-red'
          onClick={() => onDeleteTask(taskToDelete.id)}
        >
          Yes
        </button>
      </div>
    </div>
  )
}
export default RemoveTask
