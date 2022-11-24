import React,{useState} from "react";
import "./../styles/Todo.css";

function Todo(){
	const [todoTask ,setTodoTask]=useState("");//state for task
	const [todolist ,setTodoList]=useState([]);// state for list 

	const [editTodoTask ,setEditTodoTask]=useState("");//state for edittdotask
	const [currentEditIndex,setCurrentEditIndex]=useState([-1]);
	

	function handleClick(){
		if(todoTask){//if todoTask is empty then it will be false otherwaise it will be true 
			
			setTodoList([...todolist,todoTask]);//old list has been seperated using ... operator and new task has been added 
			
		}
		setTodoTask("");//to make input empty 
	}

	function handleDelete(idx){ //idx means storing index here from array
		todolist.splice(idx,1) //then its deleting the task 
		setTodoList([...todolist])//then we are separting old list using spread operator here
	}
	function handleSaveClick(idx){ // function called handlesaveclick storing index of the array
		todolist.splice(idx,1,editTodoTask)//here if we are editing then wrong item should remove and new item will be added 
		setTodoList([...todolist])//by using spread operator its giving list of task
		
		setEditTodoTask("")
		setCurrentEditIndex([-1])//keeping it on-1 beacuse we want all the list item to reflect
	}
	

	return (
	<div className="todo-wrapper">
		<h1>TODO LIST</h1>
		<input id="task" onChange={(e)=>{setTodoTask(e.target.value)}} value={todoTask}/><button id="btn" onClick={handleClick}>Add Items</button>
		<ul id="todo-list">
			{todolist.map((task,index)=>
			
			<li className="list" key={index} id={index}>         
				{ currentEditIndex[0]!==index ? //if it is not equal to index then edit task and delete option will reflect
				<>
					<span className={`list-task`}>{task}</span>
					<span className="buttons-wrapper">
					<button className="editTask"
						onClick={()=>{ //edit button
							setCurrentEditIndex([index])// of that respective task will get set 
						}}
					>Edit </button>
					<button className="del-btn" onClick={()=>{handleDelete(index)}}>Delete</button>
					</span>
				</>
				:
				currentEditIndex[0]==index &&
				<>
					<input className="edit-input-field" onChange={(e)=>setEditTodoTask(e.target.value)} value={editTodoTask}></input>
					<button className={`saveTask ${editTodoTask.length > 0 ?"active":"disabled"}`} onClick={()=>{handleSaveClick(index)}} disabled={editTodoTask.length > 0 ?false:true}>SAVE</button>
				</> //If condition is true save option will reflect
				}
			</li>)}
		</ul>
	</div>
	)
		}


export default Todo;
