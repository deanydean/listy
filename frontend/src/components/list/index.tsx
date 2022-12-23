import ListItem, { ListItemProps } from './list-item';

import React from 'react';

export interface ListProps {
  title: string;
  items: ListItemProps[];
}

const List = ({ title, items }: ListProps): JSX.Element => {
  return (
    <>
      <div>{title}</div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <ListItem text={item.text} complete={item.complete} />
          </div>
        );
      })}
    </>
  );
};

export default List;
