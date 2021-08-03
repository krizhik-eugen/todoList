import React, {KeyboardEvent, ChangeEvent, useState} from 'react'
import {IconButton, TextField} from "@material-ui/core";
import { AddBox } from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    // const errorMessage = error ? <div className={"error-text"}>Title is required!</div> : null

    return (
        <div /*style={{border: '1px solid black', padding: '5px', borderColor: 'blue', borderRadius: '3px'}}*/>
            <TextField
                value={title}
                onChange={onTitleChangeHandler}
                onKeyPress={onKeyHandler}
                variant={"outlined"}
                size={"small"}
                label={'Title'}
                error={error}
                helperText={error && 'Title is required!'}
                /*className={error ? "error" : ""}*/
            />
            <IconButton
                size={"small"}
                color={"primary"}
                onClick={addItem}><AddBox/></IconButton>
            {/*{errorMessage}*/}
        </div>
    )
}