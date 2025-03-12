import { useEffect, useState } from "react";
import userService, { User } from "./services/user-service";
import { CanceledError } from "./services/api.client";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then(response => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));
    userService.delete(user.id)
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
    userService.create(newUser)
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
      userService.update(updatedUser)
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