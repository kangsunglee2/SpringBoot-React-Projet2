import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  const [data, setData] = useState('');
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get('/rp/react/data')
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => {console.log(err);});
  }, []);
    useEffect(() => {
      axios.get('/rp/react/json')
        .then(res => {setUser(res.data)})
        .catch(err => console.log(err))
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          받아온 값: {data ? data : '받아오지 못했어요'}
        </h3>
        <h3>
          사용자 정보: uid={user.uid}, uname={user.uname}
        </h3>

      </header>
    </div>
  );
}

export default App;
