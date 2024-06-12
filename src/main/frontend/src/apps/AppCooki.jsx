import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  const [data, setData] = useState('');
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('/rp/react/data')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {console.log(err);});
  }, []);
  useEffect(() => {
    axios.get('/rp/react/json')
      .then(res => {setUser(res.data)})
      .catch(err => console.log(err))
  }, []);
  useEffect(() => {
    axios.get('/rp/react/list')
      .then(res => {
        setList(res.data)
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }, []);
  
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; 
    }

    // 사용 예시
    const myCookieValue = getCookie('myCookie');
    if (myCookieValue) {
        console.log('myCookie 값:', myCookieValue);
    } else {
        console.log('myCookie가 설정되어 있지 않습니다.');
    }
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>{isLoading ? <img src={logo} className="App-logo" alt="logo" />: ''}</h3>
        <h3>
          받아온 값: {data ? data : '받아오지 못했어요'}
        </h3>
        <h3>
          사용자 정보: uid={user.uid}, uname={user.uname}
        </h3>
        <table border={1} style={{width: 800, marginBottom: 50,}}>
          <thead>{myCookieValue}</thead>
          <tbody>
            <tr>
              <th>ID</th><th>이름</th><th>이메일</th><th>생성날짜</th>
            </tr>
            {
              list.map((x, y) => (
                <tr key={y}>
                  <td>{x.uid}</td><td>{x.uname}</td><td>{x.email}</td><td>{x.regDate}</td>
                </tr>  
              )
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;