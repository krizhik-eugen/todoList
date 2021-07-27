import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") offEditMode()
    }

    return (
        editMode ? <input value={title} autoFocus onBlur={offEditMode} onKeyPress={onKeyHandler}
                          onChange={onTitleChangeHandler}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}