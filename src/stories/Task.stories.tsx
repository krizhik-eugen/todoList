import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from '../Task';

const changeTaskStatusCallback = action('changeTaskStatus clicked');
const changeTaskTitleCallback = action('changeTaskTitle clicked');
const removeTaskCallback = action('removeTask clicked')

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        changeTaskStatus: changeTaskStatusCallback,
        changeTaskTitle: changeTaskTitleCallback,
        removeTask: removeTaskCallback
    }
} as ComponentMeta<typeof Task>;

const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;


/*const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}*/

//эти общие args мы передаеем выше, используя функциональность storybook

export const TaskIsDoneTemplateStory = TaskTemplate.bind({});
TaskIsDoneTemplateStory.args = {
    // ...baseArgs,
    task: {id: '1', title: 'JS', isDone: true},
    todolistId: 'todo1'
};

export const TaskIsNotDoneTemplateStory = TaskTemplate.bind({});
TaskIsNotDoneTemplateStory.args = {
    // ...baseArgs,
    task: {id: '1', title: 'JS', isDone: false},
    todolistId: 'todo1'
};
