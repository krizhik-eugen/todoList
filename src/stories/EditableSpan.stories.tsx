import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argsType: {
        onChange: {
            description: 'Value of EditableSpan is changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value of EditableSpan'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanTemplateStory = EditableSpanTemplate.bind({});
EditableSpanTemplateStory.args = {
    onChange: action('Value of EditableSpan is changed')
};
