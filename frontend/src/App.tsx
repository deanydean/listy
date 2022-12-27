import List from './components/list';
import React from 'react';
import SubmitField from './components/submit-field';
import { useLists } from './hooks/useLists';

function App(): JSX.Element {
  // TODO: tests to check controls call the functions
  const { lists, createList } = useLists();

  return (
    <div>
      <SubmitField
        placeholder="Add new list..."
        maxLength={60}
        submitHandler={(text: string) => createList({ title: text, items: [] })}
      />
      {/* Render lists */}
      {lists?.map((list, index) => (
        <List key={index} list={list} />
      ))}
    </div>
  );
}

export default App;
