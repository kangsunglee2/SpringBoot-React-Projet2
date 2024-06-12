import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';


function App() {
  const [form, setForm] = useState({uid:'', uname:''});
  const handleChange = (event) => {
    const {name,value} = event.target;
    setForm({...form, [name]: value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('uid', form.uid);
    params.append('uname', form.uname);
    console.log(params);
    axios
      .post('/rp/react/form', params)
      .then(res => {console.log(res);});
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor='uid'>아이디:</label>
          <input type='text' name='uid' value={form.uid} onChange={handleChange} /><br />
          <label htmlFor='name'>이름:</label>
          <input type='text' name='uname' value={form.uname} onChange={handleChange} /><br />
          <button>확인</button>
      </form>
    </div>
  );
}

export default App;
