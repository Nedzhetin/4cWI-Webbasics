import axios from "../api/axios.ts";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  return (
    <>
      {users.length ? (
        <div>
          {users.map((user: { id: number; username: string }) => (
            <div key={user.id}>
              <h3>{user.username}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
}

export default Users;
