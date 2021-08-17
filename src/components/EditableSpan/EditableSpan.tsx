import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnterOfEditMode = (e: any) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode
        ?    <TextField
            value={title}
            onChange={changeTitle}
            autoFocus={true}
            onBlur={activateViewMode}
            onKeyPress={onEnterOfEditMode}
            style={{flexWrap: 'wrap', width: '100%'}}/>
        : <span
            onDoubleClick={activateEditMode}
            className="editableSpan"
        >{props.value}</span>
});
