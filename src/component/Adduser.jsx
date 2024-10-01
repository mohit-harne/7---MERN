import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../Redux/Reducer";

const Adduser = () => {
  const [id, setId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("staff");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userobj = { id, first_name, email, phone, role };
    try {
      await dispatch(addUser(userobj));
      navigate("/user");
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Id</label>
                  <input
                    value={id}
                    type="text"
                    onChange={(e) => setId(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={phone}
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-footer gap-4 d-flex justify-content-center">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <Link className="btn btn-danger" to="/user">
                Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adduser;
