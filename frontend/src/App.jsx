import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Alert, InputGroup } from 'react-bootstrap';

const API = 'http://localhost:8080/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', age: '', salary: '' });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    const res = await axios.get(API, { params: { search } });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
        setMessage('Cập nhật thành công!');
      } else {
        await axios.post(API, form);
        setMessage('Thêm thành công!');
      }
      resetForm();
      loadUsers();
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      }
    }
  };

  const edit = (user) => {
    setForm({ name: user.name, age: user.age, salary: user.salary });
    setEditingId(user.id);
    setErrors({});
  };

  const remove = async (id) => {
    if (window.confirm('Xóa nhân viên này?')) {
      await axios.delete(`${API}/${id}`);
      loadUsers();
      setMessage('Xóa thành công!');
    }
  };

  const resetForm = () => {
    setForm({ name: '', age: '', salary: '' });
    setEditingId(null);
    setErrors({});
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Quản Lý Lương Nhân Viên</h1>

      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={submit} className="card p-4 mb-4 shadow">
        <div className="row g-3">
          <div className="col-md-8">
            <Form.Group>
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                isInvalid={!!errors.name}
                placeholder="Nhập họ tên"
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <div className="row mt-3">
              <div className="col">
                <Form.Group>
                  <Form.Label>Tuổi</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.age}
                    onChange={e => setForm({ ...form, age: e.target.value })}
                    isInvalid={!!errors.age}
                  />
                  <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group>
                  <Form.Label>Lương</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={form.salary}
                    onChange={e => setForm({ ...form, salary: e.target.value })}
                    isInvalid={!!errors.salary}
                  />
                  <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="col-md-4 d-flex align-items-end">
            <div>
              <Button type="submit" variant="primary" className="me-2">
                {editingId ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </Form>

      <InputGroup className="mb-3" style={{ maxWidth: 300 }}>
        <Form.Control
          placeholder="Tìm theo tên..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="outline-primary">Tìm</Button>
      </InputGroup>

      <h4>Danh sách nhân viên</h4>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lương</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.age}</td>
              <td>{u.salary.toLocaleString('vi-VN')} ₫</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => edit(u)} className="me-1">
                  Sửa
                </Button>
                <Button size="sm" variant="danger" onClick={() => remove(u.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;