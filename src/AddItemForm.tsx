import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField, Button} from '@material-ui/core';

type AddItemFormType = {
    addItem: (title: string) => void
    label: string
}

export const AddItemForm = React.memo((props: AddItemFormType) => {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const errorMessage = error ? <div style={{color: 'red', marginTop: '5px'}}>Title is required !</div> : null //Если есть ошибка то выволим сообщение иначе ничего

    const onKeyPressAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {
        const validatedInputValue = inputValue.trim() //Убирает пробелы по бокам
        if (validatedInputValue) { //Если строка не пустая
            props.addItem(validatedInputValue)
        } else {
            setError(true)
        }
        setInputValue('') //Чистит инпут после добавления таски
    }
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setError(false) //Если печатает то убирает ошибку
    }

    return (
        <div className="wrapper">
            <div className="inputTask">
                <TextField
                    variant={'outlined'}
                    size={'small'}
                    label={props.label}
                    error={error}
                    // helperText={error && 'Title is required !'}
                    value={inputValue}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddItem}
                    style={{marginRight: '10px'}}
                />
                {/*<input*/}
                {/*    value={inputValue}*/}
                {/*    onChange={onChangeTitle}*/}
                {/*    onKeyPress={onKeyPressAddItem}*/}
                {/*    className={error ? 'error' : 'input'}*/}
                {/*/>*/}
                {/*<IconButton onClick={onClickAddItem} size={'small'} color={'primary'}>*/}
                {/*    <AddBox fontSize={'default'}/>*/}
                {/*</IconButton>*/}
                <Button
                    onClick={onClickAddItem}
                    color={'primary'}
                    variant={'contained'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Button>
            </div>
            {errorMessage}
        </div>
    )
})