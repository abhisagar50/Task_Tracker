import Header from './Component/HEADER.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './Component/Footer.js'
import { useState, useEffect } from 'react'
import Tasks from './Component/Tasks.js'
import AddTask from './Component/AddTask.js'
import About from './Component/About'
function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer);

        }
        getTasks()
    }
            , []); //we are using fetch API
    //fetch the tasks from mock json-server
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:8000/tasks"); //returns a promise
        const data = await res.json()
        return data
    }
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`); //returns a promise
        const data = await res.json()
        return data
    }

    const addTask = async (task) => {
        //const id = Math.floor(Math.random() * 10000) + 1
        //const newTask = { id, ...task };
        const res = await fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body:JSON.stringify(task)
        })
        const newTask = await res.json();
        setTasks([...tasks, newTask]);

    }
    const deleteTask = async(id) => {
        await fetch(`http://localhost:8000/tasks/${id}`, {
            method: 'DELETE'
        });
        setTasks((tasks)=>tasks.filter((task)=>task.id!==id));
    }
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        
        const taskUpdate = { ...taskToToggle, reminder: !(taskToToggle.reminder) };
        const res = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(taskUpdate)
        });
        const data = await res.json();
        console.log(data);
        
        setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: (data.reminder) } : task)));
    }
    
    return (
        <Router>
      
        <div className="container">
            
            <Header onAdd={() => setShowAddTask(!showAddTask)} bool={showAddTask}/>
            
            
            
            
                <Route path='/' exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask} />}
                        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : <p>No task to display</p>}

                    </> 
                    )}/>
                <Route path='/about' component={About} />
                <Footer />
        </div>
        </Router>
  );
}
export default App;
