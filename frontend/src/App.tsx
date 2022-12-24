import React, { useEffect, useState } from 'react';

import { List } from './models/list';
import apiService from './services/api.service';

function App(): JSX.Element {
  const [items, setItems] = useState<List[]>();

  const fetchData = async (): Promise<void> => {
    await apiService
      .apiGet('lists')
      .then((res) => setItems(res.data as List[]))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      {items?.map((items, index) => (
        <p key={index}>{items.title}</p>
      ))}
    </div>
  );
}

export default App;
