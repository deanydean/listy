import { ListItem as ListItemModel } from '../../../models/list';
import React from 'react';

const ListItem = (listItem: ListItemModel): JSX.Element => (
  <div>{listItem.text}</div>
);

export default ListItem;
