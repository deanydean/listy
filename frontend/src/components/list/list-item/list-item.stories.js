import ListItem from '.';

export const ListItemStory = (args) => <ListItem {...args} />;

ListItemStory.args = {
  text: 'Nimble Soup',
};

export default {
  text: 'components/ListItem',
  component: ListItem,
};
