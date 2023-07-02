import type {Meta, StoryObj} from '@storybook/react';
import * as React from 'react';
import {ChangeEvent, FC, useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {EditableSpan, EditableSpanPropsType} from '../EditableSpan';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from '../Task';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    value: 'fsdfsd',
    onChange: action('onChange')
  }
 };

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  render: (args) => <MyComponent value={args.value} onChange={args.onChange}/>
}

const MyComponent: FC<EditableSpanPropsType> = (args) => {

  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(args.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(args.value);
  }
  const activateViewMode = () => {
    setEditMode(false);
    args.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
    : <span onDoubleClick={activateEditMode}>{args.value}</span>
}



