"use client";
import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import "./modal.css";

export default function JuryManagementPage() {
  const [jurors, setJurors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addJuror = () => {
    if (email && password) {
      setJurors([...jurors, { email, password }]);
      setEmail("");
      setPassword("");
      closeModal();
    }
  };

  const disableJuror = (id) => {
    const updatedJurors = jurors.map((juror) =>
      juror.id === id ? { ...juror, disabled: true } : juror
    );
    setJurors(updatedJurors);
  };

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => disableJuror(params.row.id)}
        >
          Disable
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openModal}>
        Add Jury
      </Button>

      <DataGrid
        rows={jurors.map((juror, id) => ({ ...juror, id }))}
        columns={columns}
        autoHeight
        checkboxSelection
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="modal-container" // Apply the modal container style
      >
        <div className="modal-content">
          {" "}
         
          <h2>Add Jury</h2>
          <div className="modal-div">
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="modal-div">
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" color="primary" onClick={addJuror}>
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
}
