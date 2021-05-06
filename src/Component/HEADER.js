import PropTypes from 'prop-types'
import Button from './Button.js'
import {useLocation} from 'react-router-dom'
const Header = ({ bool, onAdd }) => {
	const location = useLocation();
	return (
		<header className='header'>
			<h1 >Task Tracker</h1>
			{location.pathname === '/' && (<Button color={bool ? "red" : "blue"} title={bool ? "Hide" : "Add"} onClick={onAdd} />)}
			
		</header>
	)
}
Header.defaultProps = {
	title: "Task Tracker",
}
Header.propTypes = {
	title: PropTypes.string.isRequired,
}
export default Header;