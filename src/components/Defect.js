import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddDefect from "./AddDefect";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DEFECT, VALID_USER } from "../redux/actions/actionConstants";

function Defect() {
  const [addDefect, setAddDefect] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: VALID_USER, payload: false });
    localStorage.setItem("valid", false);
    navigate("/");
  };

  const state = useSelector((state) => state.defectReducer);
  console.log(state);
  const isValid = localStorage.getItem("valid");

  if (!state.validUser && !isValid) {
    return (
      <>
        User Not logged In<button onClick={() => navigate("/")}>Login</button>
      </>
    );
  }

  const add = () => {
    setAddDefect(true);
  };

  const closeDefect = (id) => {
    const updatedData = [...state.data[state.loggedInUser]?.defects];
    const index = state.data[state.loggedInUser]?.defects?.findIndex(
      (defect) => defect?.id === id
    );
    updatedData[index] = { ...updatedData[index], status: "closed" };
    dispatch({
      type: CLOSE_DEFECT,
      payload: updatedData,
    });
  };

  return (
    <div className="login-container">
      <h2>Defect Tracker</h2>
      <h4>Welcome {state.userName}</h4>
      {(state.validUser || isValid) && (
        <>
          <Link onClick={logout}>Logout</Link>
          <div>
            <button onClick={add}>Add Defect</button>
            <button>View Defect</button>
          </div>
          <div>Filter</div>
          {addDefect ? (
            <AddDefect defectAdded={() => setAddDefect(false)} />
          ) : (
            <div>
              {state.data[state.loggedInUser]?.defects?.length > 0 ? (
                <>
                  <h4 style={{ textAlign: "center" }}>Defect Details</h4>
                  <table>
                    <tr>
                      <th>Defect Category</th>
                      <th colSpan={4}>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Change Status</th>
                    </tr>
                    <tbody>
                      {state.data[state.loggedInUser]?.defects?.map(
                        (defect) => {
                          return (
                            <tr>
                              <td>{defect.category}</td>
                              <td colSpan={4}>{defect.description}</td>
                              <td>{defect.priority}</td>
                              <td>{defect?.status}</td>
                              <td>
                                <button
                                  onClick={() => closeDefect(defect?.id)}
                                  disabled={defect?.status !== "open"}
                                >
                                  {defect?.status === "open"
                                    ? "Close Defect"
                                    : "No action pending"}
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </>
              ) : (
                "No defects available"
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Defect;
