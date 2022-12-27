import ListItem from '.';
import React from 'react';

export const ListItemStory = (args) => <ListItem {...args} />;

ListItemStory.args = {
  text: 'Nimble Soup',
  completed: true,
  completedHandler: () => {},
  deleteHandler: () => {},
};

export default {
  text: 'components/List/ListItem',
  component: ListItem,
};
