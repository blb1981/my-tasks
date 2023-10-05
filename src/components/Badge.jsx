import { MdDangerous } from 'react-icons/md'
import { AiOutlineWarning } from 'react-icons/ai'

function Badge({ status }) {
  const warning = 'warning'
  const danger = 'danger'

  if (status && status === warning) {
    return (
      <span className={`badge ${status === warning ? 'warning' : ''}`}>
        <AiOutlineWarning />
      </span>
    )
  }
  if (status && status === danger) {
    return (
      <span className={`badge ${status === danger ? 'danger' : ''}`}>
        <MdDangerous />
      </span>
    )
  }
  return
}

export default Badge
