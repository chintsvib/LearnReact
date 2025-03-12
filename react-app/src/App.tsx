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

  return (
    <>
      {isLoading && <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && <ul className="list-group">
        {users.map(user => <li key={user.id} className="list-group-item d-flex justify-content-between">
          {user.name}
          <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
        </li>)}
      </ul>}
    </>
  )
}

export default App;