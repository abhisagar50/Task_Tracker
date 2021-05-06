const Button = (props) => {
    return (
        <button style={{ backgroundColor: props.color, }} className='btn' cursor='pointer' onClick={props.onClick}> {props.title}</button>)
}
Button.defaultProps = { color: 'silverblue', title: 'Add' };
export default Button;