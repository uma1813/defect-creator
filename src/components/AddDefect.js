import React, { useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { ADD_DEFECT } from "../redux/actions/actionConstants";

function AddDefect(props) {
  const dispatch = useDispatch();
  const [defect, setDefect] = useState({
    id: new Date().getTime(),
    category: "Functional",
    description: "",
    priority: "",
    status: "open",
  });
  return (
    <div style={{ border: "1px solid black", padding: "8px" }}>
      <div className="login">AddDefect</div>
      <button onClick={props.defectAdded}>Cancel</button>
      <div className="field-wrapper">
        <label>Defect Category</label>
        <select
          onChange={(e) => setDefect({ ...defect, category: e.target.value })}
        >
          <option value="Functional">Functional</option>
          <option value="UI">UI</option>
          <option value="Change Request">Change Request</option>
        </select>
      </div>
      <div className="field-wrapper">
        <label>Description</label>
        <textarea
          value={defect?.description}
          onChange={(e) =>
            setDefect({ ...defect, description: e.target.value })
          }
        />
      </div>
      <div className="field-wrapper">
        <label>Priority</label>
        <input
          value={defect?.priority}
          onChange={(e) => setDefect({ ...defect, priority: e.target.value })}
        />
      </div>
      <button
        onClick={() => {
          dispatch({
            type: ADD_DEFECT,
            payload: defect,
          });
          props.defectAdded();
        }}
        disabled={
          !defect?.description || !defect?.priority || !defect?.category
        }
      >
        Add Defect
      </button>
    </div>
  );
}

export default AddDefect;
