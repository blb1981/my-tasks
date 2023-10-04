import { useEffect } from 'react'

function Modal({ title, component, onCloseModal }) {
  function handleCloseModal(e) {
    if (e.target.className === 'modal-container') {
      onCloseModal()
    }
  }

  useEffect(
    function () {
      function handleEsc(e) {
        if (e.key === 'Escape') onCloseModal()
      }

      document.addEventListener('keyup', handleEsc, false)

      return function () {
        document.removeEventListener('keyup', handleEsc, false)
      }
    },
    [onCloseModal]
  )

  return (
    <div className='modal-container' onClick={handleCloseModal}>
      <div className='modal'>
        <h3 className='text-center'>{title}</h3>
        {component}
      </div>
    </div>
  )
}
export default Modal
