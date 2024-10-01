import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchUserObj, updateUser } from "../Redux/Reducer";

const Updateuser = () => {
  const [_id, setId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Initial state should be an empty string
  const [role, setRole] = useState("staff");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();
  const userObj = useSelector((state) => state.users.userObj);
  const loading = useSelector((state) => state.users.loading);
  const errorMessage = useSelector((state) => state.users.errorMessage);

  useEffect(() => {
    dispatch(fetchUserObj(code)); // Fetch user data based on ID from URL
  }, [dispatch, code]);

  useEffect(() => {
    if (userObj) {
      setId(userObj._id);
      setFirstName(userObj.first_name);
      setEmail(userObj.email);
      setPhone(userObj.phone);
      setRole(userObj.role);
    }
  }, [userObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure all fields are properly populated
    const updatedUser = { first_name, email, phone, role };
    console.log("Submitting update with data:", updatedUser); // Debugging
    try {
      await dispatch(updateUser({ userId: _id, userData: updatedUser }));
      navigate("/user");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {errorMessage && <div>Error: {errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header"></div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Id</label>
                  <input value={_id || ""} disabled className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={first_name || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email || ""}
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
                    value={phone || ""}
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
                    value={role || ""}
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

export default Updateuser;
