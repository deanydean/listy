import ListItem, { ListItemProps } from '.';

import React from 'react';

export const ListItemStory = (args: ListItemProps): JSX.Element => (
  <ListItem {...args} />
);

ListItemStory.args = {
  listItem: {
    text: 'Nimble Soup',
    completed: false,
  },
  completedHandler: () => {},
  deletedHandler: () => {},
};

export default {
  text: 'components/List/ListItem',
  component: ListItem,
};
