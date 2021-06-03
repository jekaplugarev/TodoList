import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(inputValue)
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onEnterOfEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input
                onBlur={offEditMode}
                autoFocus={true}
                value={inputValue}
                onChange={onChangeTitle}
                onKeyPress={onEnterOfEditMode}
                className="editMode"/>
            : <span
                onDoubleClick={onEditMode}
                className="editableSpan">
                {props.title}
        </span>
    )
}

export default EditableSpan