import ListItem from './list-item';
import { List as ListModel } from '../../models/list';
import React from 'react';
import SubmitField from '../submit-field';
import { useLists } from '../../hooks/useLists';

interface ListProps {
  list: ListModel;
}

const List = ({ list }: ListProps): JSX.Element => {
  // TODO: tests to check controls call the functions
  const { deleteList, addListItem, deleteListItem, toggleListItemComplete } =
    useLists();

  return (
    <>
      <div>{list.title}</div>
      <div onClick={() => deleteList(list._id)}>Delete this list?</div>
      <SubmitField
        placeholder="Add list item..."
        maxLength={150}
        submitHandler={(e: any) => addListItem(list, e)}
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
    </>
  );
};

export default List;
