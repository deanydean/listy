import React from 'react';
import SubmitField from '.';

export const SubmitFieldStory = (args) => <SubmitField {...args} />;

SubmitFieldStory.args = {
  placeholder: 'Enter text and press enter...',
  maxLength: 100,
  submitHandler: () => {},
};

export default {
  title: 'components/SubmitField',
  component: SubmitField,
};
