import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { stat } from "fs";
import { BASE_URL } from "../../helper";
export function UserList() {
  const [users, setuser] = useState<any>([]);
  const {state} = useContext(Store);
  const {userInfo} = state
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("api/users/getusers", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }).then((res) => {
      setuser(res.data);
    });
  });

  const deleteHandler = (user: any) => {
    axios.delete(`${BASE_URL}/api/users/${user._id}`).then((res) => {
      Swal.fire(res.data.message);
      console.log(res);
    });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>IS ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "YES" : "NO"}</td>

              <td>
                <Button
                  type="button"
                  variant="light"
                  onClick={() => navigate(`/editusers/${user._id}`)}
                >
                  Edit
                </Button>
                &nbsp;
                <Button
                  type="button"
                  variant="light"
                  onClick={() => deleteHandler(user)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
