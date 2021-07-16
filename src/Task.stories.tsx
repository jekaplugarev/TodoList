import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
    title: 'TodoList/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

let removeTaskCallback = action('removeTask')
let changeTaskStatusCallback = action('changeTaskStatus')
let changeTaskTitleCallback = action('changeTaskTitle')

const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    ...baseArgs,
    task: {id: '11', title: 'JS', isDone: true},
    todoListID: '1'
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: '11', title: 'JS', isDone: false},
    todoListID: '1'
};
