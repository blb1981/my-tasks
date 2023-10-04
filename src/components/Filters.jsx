export const Filters = ({
  showCompleted,
  onShowCompleteToggle,
  textFilter,
  onTextFilter,
  onOpenModal,
}) => {
  return (
    <div className='filters'>
      <div className='show-completed'>
        <label htmlFor='showCompleted'>Show Completed?</label>
        <input
          checked={showCompleted}
          onChange={onShowCompleteToggle}
          type='checkbox'
          id='showCompleted'
        />
      </div>
      <div className='add-task-button'>
        <button className='btn btn-blue' onClick={onOpenModal}>
          + Add a Task
        </button>
      </div>
      <div className='text-filter'>
        <input
          type='text'
          placeholder='Filter tasks...'
          value={textFilter}
          onChange={onTextFilter}
          className='text-filter'
        />
      </div>
    </div>
  )
}
