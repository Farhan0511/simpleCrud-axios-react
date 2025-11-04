import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const API_URL = "http://localhost:8000/person";

  const [users, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  // Get Data
  async function getAllData() {
    const response = await axios.get(API_URL);
    setUser(response.data);
  }

  // Submit Form
  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email) return alert("Nama & Email wajib diisi!");

    // UPDATE
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { name, email });
      setEditId(null);
    }
    // CREATE
    else {
      await axios.post(API_URL, { name, email });
    }

    setName("");
    setEmail("");
    getAllData();
  }

  // Edit Data
  function handleEdit(user) {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  }

  // Delete Data
  async function handleDelete(id) {
    if (window.confirm("Apakah yakin hapus data?")) {
      await axios.delete(`${API_URL}/${id}`);
      getAllData();
    }
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h3>{editId ? "Edit Pengguna" : "Tambah Pengguna"}</h3>

        <form className="input-box" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">{editId ? "Update" : "Simpan"}</button>
        </form>
      </div>

      <div className="data-pengguna">
        <h3>Data Pengguna</h3>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                {user.name} <span className="email">({user.email})</span>
              </div>
              <div>
                <button className="edit" onClick={() => handleEdit(user)}>
                  Edit
                </button>{" "}
                -{" "}
                <button
                  className="delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
