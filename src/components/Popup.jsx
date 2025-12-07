import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export function Popup({ title, link }) {
  return (
    <div>
      <b>New Recipe Posted! {title}</b>:{' '}
      <Link to={link}>Click here to view!</Link>
    </div>
  )
}
Popup.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
}
