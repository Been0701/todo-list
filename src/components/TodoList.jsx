import { useState } from 'react';
import '../style/TodoList.css';

function TodoList(){

    const [todos, setTodos] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editableTodoText, setEditableTodoText] = useState('');

    const addTodo = () => {
       if(titleInput.trim() !== ''){
        const newTodo = {
            id : Date.now(),
            title : titleInput,
            content : contentInput,
        }
        setTodos([...todos, newTodo]);
        setTitleInput('');
        setContentInput('');
       }
    }

    // 항묵 수정 가능한 상태로 만듦
    const enableEditMode = (id, text) => {
        setEditableTodoId(id);
        setEditableTodoText(text);
    }

    // 항목 수정 완료
    const saveTodo = () => {
        const updatedTodos = todos.map(todo => {
            if(todo.id === editableTodoId){
                return { ...todo, text: editableTodoText};
            }
            return todo;
        })
        setTodos(updatedTodos);
        setEditableTodoId(null);
        setEditableTodoText('');
    }
    
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id)
        setTodos(updatedTodos)
    }

    return (
        <div className='todo-container'>
            <h1 className='todo-title'>Todo List</h1>
            <div className='input-container'>
                <input type='text' className='todo-input' placeholder='제목을 입력하세요' value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
                <textarea
                    value={contentInput} onChange={(e) => setContentInput(e.target.value)}
                    placeholder='내용을 입력하세요' className='todo-textarea'
                />
                <button onClick={addTodo} className="add-button">추가</button>
            </div>
            <ul className='todo-list'>
                {todos.map(todo => (
                    <li key={todo.id} className='todo-item'>
                      {editableTodoId === todo.id ? (
                        <>
                            <input type='text' value={editableTodoText} onChange={(e) => setEditableTodoText(e.target.value)} className='edited-input'/>
                            <button onClick={saveTodo} className='edited-button'>완료</button>
                        </>
                      ): 
                      <>
                        <span className='todo-text'>{todo.text}</span>
                        <button onClick={() => enableEditMode(todo.id, todo.text)} className='edit-button'>수정</button>
                        <button onClick={() => deleteTodo(todo.id)} className='delete-button'>삭제</button>
                      </>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;