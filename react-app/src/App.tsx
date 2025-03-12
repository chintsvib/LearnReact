import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";


interface User {
  id: number;
  name: string;
}


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
      .then(response => setUsers(response.data))
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));
    axios.delete(`https://jsonplaceholder.typicode.com/xsers/${user.id}`)
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setUsers(originalUsers);
      })
  }

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: 'New User' };
    setUsers([newUser, ...users]);
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => setUsers([response.data, ...users]))
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setUsers(originalUsers);
      })
  }

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + ' (updated)' };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
    axios.patch(`https://jsonplaceholder.typicode.com/xsers/${user.id}`, updatedUser)
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setUsers(originalUsers);
      })
  }

  return (
    <>
      {isLoading && <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && <ul className="list-group">
        <button className="btn btn-primary mb-3" onClick={() => addUser()}>Add</button>
        {users.map(user => <li key={user.id} className="list-group-item d-flex justify-content-between">
          {user.name}
          <div>
          <button className="btn btn-outline-secondary mx-2" onClick={() => updateUser(user)}>Update</button>
          <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
          </div>
        </li>)}
      </ul>}
    </>
  )
}

export default App;