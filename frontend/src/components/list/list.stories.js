import List from '.';
import React from 'react';

export const ListStory = (args) => <List {...args} />;

ListStory.args = {
  title: 'Shopping List',
  items: [
    { text: 'Nimble Soup', complete: true },
    { text: 'Celebratory Cake', complete: false },
  ],
};

export default {
  title: 'components/List',
  component: List,
};
