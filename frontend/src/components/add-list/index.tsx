import React, { useState } from 'react';

const AddList = (): JSX.Element => {
  const [title, setTitle] = useState<string>();

  const clickHandler = () => {
    // create new list with the title in title state;
  };

  const isDisabled = () => {
    return !title || title.length === 0 || title.length > 60;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="List name"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={clickHandler} disabled={isDisabled()}>
        Create List
      </button>
    </div>
  );
};

export default AddList;
