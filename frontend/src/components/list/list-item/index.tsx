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
  color: ${(props) => props.theme.colours.textPrimary};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  font-family: ${(props) => props.theme.fonts.family.body};
  font-size: ${(props) => props.theme.fonts.sizes.s};
  line-height: ${(props) => props.theme.fonts.sizes.xl};
  margin: ${(props) => props.theme.sizes.spacing.m};

  :hover {
    cursor: pointer;
  }
`;

const StyledDeleteButton = styled.button`
  font-family: ${(props) => props.theme.fonts.family.info};
  font-size: ${(props) => props.theme.fonts.sizes.s};
  color: ${(props) => props.theme.colours.textAlert};
  border-radius: ${(props) => props.theme.borders.radius.l};
  border: ${(props) => props.theme.borders.basic};
  margin-right: ${(props) => props.theme.sizes.spacing.l};
  font-weight: bold;
  
  :hover {
    background-color: ${(props) => props.theme.colours.backgroundAlert};
    color: ${(props) => props.theme.colours.textPrimary};
    cursor: pointer;
  }
}`;

const ListItem = ({
  listItem,
  completedHandler,
  deleteHandler,
}: ListItemProps): JSX.Element => {
  return (
    <>
      <div>
        {listItem.completed && (
          <StyledDeleteButton onClick={() => deleteHandler()}>
            X
          </StyledDeleteButton>
        )}
        <StyledListItem
          completed={listItem.completed}
          onClick={() => completedHandler()}
        >
          {' '}
          {listItem.text}{' '}
        </StyledListItem>
      </div>
    </>
  );
};

export default ListItem;
