import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList, deleteUser, selectUserObj } from "../Redux/Reducer";
import {
  selectUserList,
  selectLoadingStatus,
  selectErrorMessage,
} from "../Redux/Reducer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Userlisting = () => {
  const dispatch = useDispatch();
  const userList = useSelector(selectUserList);
  const userObj = useSelector(selectUserObj);
  const loading = useSelector(selectLoadingStatus);
  const errorMessage = useSelector(selectErrorMessage);

  console.log(userList, userObj, loading, errorMessage); // Check values
  const handleDelete = async (userId) => {
    const isDeleted = await dispatch(deleteUser(userId)).unwrap();
    if (isDeleted) {
      toast.success("User deleted successfully");
    } else {
      toast.info("User deletion canceled or failed");
    }
  };

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  const sortedUserList = userList?.slice().sort((a, b) => {
    const idA = Number(a.id) || 0;
    const idB = Number(b.id) || 0;
    return idA - idB;
  });

  return (
    <div className="container scale-25 py-4 mt-5">
      <div className="card border-4 border-secondary shadow-lg">
        <div className="card-header">
          <Link
            to={"/user/add"}
            className="btn btn-success d-flex flex-column-reverse shadow-sm"
          >
            Add New User [+]
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="bg-dark text-light">Code</th>
                  <th className="bg-dark text-light">Name</th>
                  <th className="bg-dark text-light">Email</th>
                  <th className="bg-dark text-light">Phone</th>
                  <th className="bg-dark text-light">Role</th>
                  <th className="bg-dark text-light">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                ) : errorMessage ? (
                  <tr>
                    <td colSpan="6">Error: {errorMessage}</td>
                  </tr>
                ) : (
                  sortedUserList &&
                  sortedUserList.map((item) => (
                    <tr key={item._id}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td className="d-flex gap-2">
                        <Link
                          to={`/user/edit/${item._id}`}
                          className="btn btn-primary fw-bold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-danger fw-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlisting;
