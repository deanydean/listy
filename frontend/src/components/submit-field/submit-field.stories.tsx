import SubmitField, { SubmitFieldProps } from '.';

import React from 'react';

export const SubmitFieldStory = (args: SubmitFieldProps): JSX.Element => (
  <SubmitField {...args} />
);

SubmitFieldStory.args = {
  placeholder: 'Enter text and press enter...',
  maxLength: 100,
  submitHandler: () => {},
};

export default {
  title: 'components/SubmitField',
  component: SubmitField,
};
