import ListItem from './list-item';
import { List as ListModel } from '../../models/list';
import React from 'react';
import SubmitField from '../submit-field';
import styled from 'styled-components';
import { useLists } from '../../hooks/useLists';

const StyledList = styled.div`
  margin: ${(props) => props.theme.sizes.spacing.l};
  padding: ${(props) => props.theme.sizes.spacing.l};
  background-color: ${(props) => props.theme.colours.backgroundSecondary};
  border-radius: ${(props) => props.theme.borders.radius.s};
`;

const StyledTitle = styled.h2`
  color: ${(props) => props.theme.colours.textPrimary};
  font-family: ${(props) => props.theme.fonts.family.heading};
  font-size: ${(props) => props.theme.fonts.sizes.l};
  margin: ${(props) => props.theme.sizes.spacing.s};
`;

const StyledDeleteButton = styled.div`
  width: 160px;
  font-family: ${(props) => props.theme.fonts.family.info};
  font-size: ${(props) => props.theme.fonts.sizes.s};
  color: ${(props) => props.theme.colours.textWarn};
  margin: ${(props) => props.theme.sizes.spacing.m} ${(props) => props.theme.sizes.spacing.s};

  :hover{
    color: ${(props) => props.theme.colours.textAlert};
    cursor: pointer;
  }
}`;

export interface ListProps {
  list: ListModel;
}

const List = ({ list }: ListProps): JSX.Element => {
  // TODO: tests to check controls call the functions
  const { deleteList, addListItem, deleteListItem, toggleListItemComplete } =
    useLists();

  return (
    <StyledList>
      <StyledTitle>{list.title}</StyledTitle>
      <StyledDeleteButton onClick={() => deleteList(list._id)}>
        Delete this list?
      </StyledDeleteButton>
      <SubmitField
        placeholder="Add list item..."
        maxLength={150}
        submitHandler={(e: any) => addListItem(list, e)}
        size="s"
      />
      {/* Render list items */}
      {list?.items?.map((item, index) => {
        return (
          <div key={index}>
            <ListItem
              listItem={item}
              completedHandler={() => toggleListItemComplete(list, index)}
              deleteHandler={() => deleteListItem(list, index)}
            />
          </div>
        );
      })}
    </StyledList>
  );
};

export default List;
