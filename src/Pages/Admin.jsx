import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [Name, setName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Age, setAge] = useState(1);
  const [Email, setEmail] = useState("");
  const [Users, setUsers] = useState([]);
  const [PatchUser, setPatchUser] = useState({});
  const newUser = {
    name: Name,
    first_name: FirstName,
    age: Age,
    email: Email,
  };

  const HandleUser = () => {
    if (
      newUser.name === "" ||
      newUser.first_name === "" ||
      newUser.age <= 1 ||
      newUser.email === ""
    ) {
      alert("Error")
    } else {
      axios.post(`http://localhost:9000/users/`, newUser).then(() => {
        setAge(1)
        setEmail("")
        setName("")
        setFirstName("")
      } ).catch(Error => alert(Error) )
    }
  }

  const HandleDelete = (id = 0) => {
    axios.delete(`http://localhost:9000/users/${id}`).then(() => {
      alert("deleted")
      window.location.reload()
    } ).catch(Error => alert(Error) )
  }


  const HandlePatchElemet = (id = 0) => {
    axios.get(`http://localhost:9000/users/${id}`).then(response => {
      setPatchUser(response.data)
      // window.location.reload()
    })
  }


  const PatchUserFunc = (id = 0) => {
    axios.patch(`http://localhost:9000/users/${id}`, PatchUser).then(() => {
      alert("patched")
      window.location.reload()
    } ).catch(error => console.error(error))
  }


  useEffect(() => {
    axios.get(`http://localhost:9000/users/`).then(response => {
      setUsers(response.data)
    } )
    
  }, [] )


  return (
    <React.Fragment>
      <section className="Admin">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            required
            onChange={(e) =>
              setName(e.target.value) ||
              setPatchUser({ ...PatchUser, name: e.target.value })
            }
            value={PatchUser.name}
          />
          <input
            type="text"
            required
            onChange={(e) =>
              setFirstName(e.target.value) ||
              setPatchUser({ ...PatchUser, first_name: e.target.value })
            }
            value={PatchUser.first_name}
          />
          <input
            type="number"
            required
            onChange={(e) =>
              setAge(Number(e.target.value)) ||
              setPatchUser({ ...PatchUser, age: Number(e.target.value) })
            }
            value={PatchUser.age}
          />
          <input
            type="email"
            required
            onChange={(e) =>
              setEmail(e.target.value) ||
              setPatchUser({ ...PatchUser, email: e.target.value })
            }
            value={PatchUser.email}
          />

          <button onClick={HandleUser}>Send</button>
          <button onClick={() => PatchUserFunc(PatchUser.id)}>Patched</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>N</th>

              <th>User Name</th>

              <th>User Email</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {Users.map((user, index) => {
              index += 1;

              return (
                <React.Fragment key={user.id}>
                  <tr>
                    <td> {index} </td>
                    <td> {user.name} </td>
                    <td> {user.email} </td>
                    <td>
                      <button onClick={() => HandleDelete(user.id)}>
                        Delete
                      </button>
                      <button onClick={() => HandlePatchElemet(user.id)}>
                        Patch
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
};

export default Admin;
