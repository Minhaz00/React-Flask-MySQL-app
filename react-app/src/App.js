import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get('/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const addItem = () => {
    axios.post('/api/item', newItem)
      .then(response => setItems([...items, { ...newItem, id: response.data.id }]))
      .catch(error => console.error(error));
  };

  const updateItem = (id) => {
    const updatedItem = items.find(item => item.id === id);
    axios.put(`/api/item/${id}`, updatedItem)
      .then(response => console.log(response.data.message))
      .catch(error => console.error(error));
  };

  const deleteItem = (id) => {
    axios.delete(`/api/item/${id}`)
      .then(response => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => setItems(items.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))}
            />
            <input
              type="text"
              value={item.description}
              onChange={(e) => setItems(items.map(i => i.id === item.id ? { ...i, description: e.target.value } : i))}
            />
            <button onClick={() => updateItem(item.id)}>Update</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;