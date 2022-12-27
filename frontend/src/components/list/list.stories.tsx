import List, { ListProps } from '.';

import React from 'react';

export const ListStory = (args: ListProps): JSX.Element => <List {...args} />;

ListStory.args = {
  list: {
    title: 'Shopping List',
    items: [
      { text: 'Nimble Soup', completed: true },
      { text: 'Celebratory Cake', completed: false },
    ],
  },
};

export default {
  title: 'components/List',
  component: List,
};
