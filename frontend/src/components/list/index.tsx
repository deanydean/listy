import ListItem from './list-item';
import { List as ListModel } from '../../models/list';
import React from 'react';

const List = (list: ListModel): JSX.Element => {
  return (
    <>
      <div>{list.title}</div>
      {list.items.map((item, index) => {
        return (
          <div key={index}>
            <ListItem
              text={item.text}
              completed={item.completed}
              index={item.index}
            />
          </div>
        );
      })}
    </>
  );
};

export default List;
