import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? 'Red' : 'Green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

Header.defaultProps = {
  title: 'Title'
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header
