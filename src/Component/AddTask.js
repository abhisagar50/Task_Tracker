import {useState} from 'react'
const AddTask = ({ onAdd }) => {
	const [text, setText] = useState('');
	const [day, setDay] = useState('');
	const [reminder, setReminder] = useState(false);
	const onSubmit = (e) => {
		e.preventDefault() //preveting submit to a page itself
		if (!text) {
			alert('Please add a task');
			return;
		}
		onAdd({ text, day, reminder });
		setText('');
		setDay('');
		setReminder(false);
	}
	return (
		<form className='add-form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label>Task</label>
				<input type='text' placeholder='Add Task' value={text} onChange={({ target })=>(setText(target.value)) } />
			</div>
			<div className='form-control'>
				<label>Day & Time</label>
				<input type='text' placeholder='Add Day and Time' value={day} onChange={({ target }) => (setDay(target.value))} />
			</div>
			<div className='form-control form-control-check'>
				<label>Reminder</label>
				<input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
			</div>
			<input type='submit' value='Save Task' className='btn btn-block' />
		</form>
		);
}
export default AddTask;