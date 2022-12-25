import List from '.';
import ListItem from './list-item';

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
