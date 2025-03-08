import axios from "axios";
import { useEffect, useState } from "react";


interface User {
  id: number;
  name: string;
}


function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

    return <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>;
}

export default App;