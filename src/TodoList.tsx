import React, {ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Delete, ImportContacts} from '@material-ui/icons';

type TodoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, event.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <li key={t.id}>
                <Checkbox
                    size={"small"}
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus} />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton size={"small"} onClick={removeTask}><Delete/></IconButton>
            </li>
        )
    })

    const onAllClickHandler = () => props.changeTodoListFilter("all", props.id)
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton size={"small"} onClick={removeTodoList}><Delete/> </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', padding: '0'}}>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList