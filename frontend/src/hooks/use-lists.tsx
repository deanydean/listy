import { ListItem as ListItemModel, List as ListModel } from '../models/list';
import React, { createContext, useContext, useEffect, useState } from 'react';

import apiService from '../services/api.service';

export interface IListsContext {
  lists: ListModel[];
  createList: Function;
  editList: Function;
  deleteList: Function;
  getLists: Function;
  addListItem: Function;
  deleteListItem: Function;
  toggleListItemComplete: Function;
}

const notImplemented = (): void => {
  throw new Error('Not implemented.');
};

const ListsContext = createContext<IListsContext>({
  lists: [],
  createList: notImplemented,
  editList: notImplemented,
  deleteList: notImplemented,
  getLists: notImplemented,
  addListItem: notImplemented,
  deleteListItem: notImplemented,
  toggleListItemComplete: notImplemented,
});

export const ListsProvider = ({ children }: any): JSX.Element => {
  const endpoint = 'lists';

  const [lists, setLists] = useState<ListModel[]>([]);

  useEffect(() => {
    getLists()
      .then()
      .catch((err) => console.error(err));
  }, []);

  const getLists = async (): Promise<void> => {
    await apiService
      .apiGet(endpoint)
      .then((res) => setLists(res.data as ListModel[]))
      .catch((err) => {
        console.error(err);
      });
  };

  const createList = async (list: ListModel): Promise<void> => {
    await apiService
      .apiPost(endpoint, list)
      .then(async () => await getLists())
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteList = async (id: string): Promise<void> => {
    await apiService
      .apiDelete(endpoint, id)
      .then(async () => await getLists())
      .catch((err) => {
        console.error(err);
      });
  };

  const editList = async (
    id: string,
    updatedList: ListModel
  ): Promise<void> => {
    await apiService
      .apiPut(endpoint, id, updatedList)
      .then(async () => await getLists())
      .catch((err) => {
        console.error(err);
      });
  };

  const addListItem = async (
    list: ListModel,
    listItem: string
  ): Promise<void> => {
    const newListItem: ListItemModel = {
      text: listItem,
      completed: false,
    };

    // Could use a more functional approach but the edit triggers a re-render and modifies state anyway.
    list.items.push(newListItem);

    // @ts-expect-error [_id is optional in interface]
    await editList(list._id, list);
  };

  const deleteListItem = async (
    list: ListModel,
    index: number
  ): Promise<void> => {
    // Could use a more functional approach but the edit triggers a re-render and modifies state anyway.
    list.items.splice(index, 1);

    // @ts-expect-error [_id is optional in interface]
    await editList(list._id, list);
  };

  const toggleListItemComplete = async (
    list: ListModel,
    index: number
  ): Promise<void> => {
    // Could use a more functional approach but the edit triggers a re-render and modifies state anyway.
    const itemState = list.items[index].completed;
    list.items[index].completed = !itemState;

    // @ts-expect-error [_id is optional in interface]
    await editList(list._id, list);
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        getLists,
        createList,
        deleteList,
        editList,
        addListItem,
        deleteListItem,
        toggleListItemComplete,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = (): IListsContext => useContext(ListsContext);
