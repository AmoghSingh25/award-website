"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import "./modal.css";
import AdminPanel from "../adminPanel/AdminPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useController } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  name: yup.string().required(),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  sphone: yup.string().nullable().notRequired(),
});

export default function JuryManagementPage() {
  const [jurors, setJurors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = new useSearchParams(router.query);

  const openModal = () => {
    setIsModalOpen(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(searchParams.get("id"));
    fetch("/api/admin/getJury", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: searchParams.get("id"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJurors(data.data);
        setLoading(false);
      });
  }, []);

  const addJuror = (data) => {
    data.userID = searchParams.get("id");
    fetch("/api/admin/addJuror", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.status === "Failed") {
          alert(resp.error);
          return;
        }
        closeModal();
        data.id = resp.id;
        data.is_active = true;
        setJurors([...jurors, data]);
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const disableJuror = (id, is_active) => {
    const updatedJurors = jurors.map((juror) =>
      juror.id === id ? { ...juror, is_active: !is_active } : juror
    );
    fetch("/api/admin/disableJuror", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        is_active: !is_active,
        userID: searchParams.get("id"),
      }),
    }).catch((err) => alert(err));
    setJurors(updatedJurors);
  };

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.is_active ? "error" : "primary"}
          startIcon={<DeleteIcon />}
          onClick={() => {
            disableJuror(params.id, params.row.is_active);
          }}
        >
          {params.row.is_active ? "Disable" : "Enable"}
        </Button>
      ),
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <AdminPanel />
      <Container maxWidth="xl">
        <Button
          variant="contained"
          color="primary"
          onClick={openModal}
          sx={{
            m: 5,
            mb: 0,
          }}
        >
          Add Jury
        </Button>

        <DataGrid
          rows={jurors.map((juror) => ({ ...juror }))}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          loading={loading}
          sx={{
            mt: 1,
            ml: 5,
            backgroundColor: "white",
          }}
        />

        <Modal
          open={isModalOpen}
          onClose={closeModal}
          className="modal-container"
        >
          <div className="modal-content">
            {" "}
            <h2>Add Jury</h2>
            <div className="modal-div">
              <TextField
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </div>
            <div className="modal-div">
              <TextField
                label="Username"
                name="username"
                onChange={(e) => setName(e.target.value)}
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </div>
            <div className="modal-div">
              <TextField
                label="Email"
                name="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <div className="modal-div">
              <TextField
                label="Phone number"
                name="phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </div>
            <div className="modal-div">
              <TextField
                label="Secondary Phone number"
                name="sphone"
                {...register("sphone")}
                error={!!errors.sphone}
                helperText={errors.sphone?.message}
              />
            </div>
            {/* <div className="modal-div">
              <TextField
                label="Password"
                name="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </div> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(addJuror)()}
            >
              Add
            </Button>
          </div>
        </Modal>
      </Container>
    </>
  );
}
