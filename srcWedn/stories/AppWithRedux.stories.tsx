import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField/TextField';
import {IconButton} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import AppWithRedux from '../AppWithRedux';
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';
import {store} from '../state/store';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {
  // render: () => <Provider store={store}><AppWithRedux/> </Provider>
};