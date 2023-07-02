import { useState } from 'react';
import '../style/TodoList.css';

function TodoList(){

    const [todos, setTodos] = useState([]);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [expandedTodoId, setExpandedTodoId] = useState(null)
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editableTodoTitle, setEditableTodoTitle] = useState('');
    const [editableTodoContent, setEditableTodoContent] = useState('');

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

    // 항목 내용 확장/축소
    const toggleExpandTodo = (id) => {
        if(expandedTodoId === id) {
            setExpandedTodoId(null);
        } else {
            setExpandedTodoId(id);
        }
    }

    // 항묵 수정 가능한 상태로 만듦
    const enableEditMode = (id, title, content) => {
        setEditableTodoId(id);
        setEditableTodoTitle(title);
        setEditableTodoContent(content);
    }

    // 항목 수정 완료
    const saveTodo = () => {
        const updatedTodos = todos.map(todo => {
            if(todo.id === editableTodoId){
                return { ...todo, title: editableTodoTitle, content: editableTodoContent};
            }
            return todo;
        })
        setTodos(updatedTodos);
        setEditableTodoId(null);
        setEditableTodoTitle('');
        setEditableTodoContent('');
    }
    
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id)
        setTodos(updatedTodos)
    }

    return (
        <div className='todo-container'>
            <h1 className='todo-header'>Todo List</h1>
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
                     <div className='todo-title' onClick={() => toggleExpandTodo(todo.id)}>{todo.title}</div>
                     {expandedTodoId === todo.id && (
                        <div className='todo-content'>{todo.content}
                            <div className='todo-actions'>
                                <button onClick={() => enableEditMode(todo.id, todo.title, todo.content)} className='edit-button'>수정</button>
                                <button onClick={() => deleteTodo(todo.id)} className='delete-button'>삭제</button>
                            </div>
                        </div>
                     )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;