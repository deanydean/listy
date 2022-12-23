import React, { useEffect, useState } from 'react';

import apiService from './services/api.service';

function App(): JSX.Element {
  const [items, setItems] = useState([]);

  const fetchData = async (): Promise<void> => {
    await apiService
      .apiGet('lists')
      // @ts-expect-error
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {items?.map((items, index) => (
        // ts-ignore
        <p key={index}>{items.title}</p>
      ))}
    </div>
  );
}

export default App;
