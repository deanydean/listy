import React from 'react';

export interface ListItemProps {
  text: string;
  complete: boolean;
}

const ListItem = ({ text }: ListItemProps): JSX.Element => <div>{text}</div>;

export default ListItem;
