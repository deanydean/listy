import { ListItem as ListItemModel } from '../../../models/list';
import React from 'react';
import styled from 'styled-components';

export interface ListItemProps {
  listItem: ListItemModel;
  completedHandler: Function;
  deleteHandler: Function;
}

export interface StyledListItemProps {
  completed: boolean;
}
const StyledListItem = styled.span<StyledListItemProps>`
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const ListItem = ({
  listItem,
  completedHandler,
  deleteHandler,
}: ListItemProps): JSX.Element => {
  return (
    <>
      <div>
        <StyledListItem
          completed={listItem.completed}
          onClick={() => completedHandler()}
        >
          {listItem.text}
        </StyledListItem>
        {listItem.completed && (
          <button onClick={() => deleteHandler()}>X</button>
        )}
      </div>
    </>
  );
};

export default ListItem;
