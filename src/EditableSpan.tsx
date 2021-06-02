import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    isDone: boolean
}

function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)


    return (
        editMode
            ? <input onBlur={offEditMode} autoFocus={true} className="editMode"/>
            : <span
                className={props.isDone ? 'isDone' : ''}
                onDoubleClick={onEditMode}>
                {props.title}
        </span>
    )
}

export default EditableSpan