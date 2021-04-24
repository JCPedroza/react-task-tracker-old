import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
  return (
    <button
      className='btn'
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
  text: 'text'
}

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
