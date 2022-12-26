import React from 'react';
import styled from 'styled-components';

export interface ListItemProps {
  text: string;
  completed: boolean;
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
  text,
  completed,
  completedHandler,
  deleteHandler,
}: ListItemProps): JSX.Element => {
  return (
    <>
      <div>
        <StyledListItem
          completed={completed}
          onClick={() => completedHandler()}
        >
          {text}
        </StyledListItem>
        <button onClick={() => deleteHandler()}>X</button>
      </div>
    </>
  );
};

export default ListItem;
