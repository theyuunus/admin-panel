import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/users/`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <section className="Home">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>N</th>

                <th>User Name</th>

                <th>User Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => {
                index += 1;
                return (
                  <React.Fragment key={user.id}>
                    <tr>
                      <td>{index}</td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
