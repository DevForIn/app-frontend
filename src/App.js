/* eslint-disable */
import React, { use, useState }  from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// image import 
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home"
import About from "./pages/About"

function App() {
  // 변수 저장
  let posts = '강남 고기 맛집';
  
  // state = [state 데이터, state 데이터 변경 함수]
  // 자주 바뀌는, 중요한 데이터는 state로 선언
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '여자 코트 추천']);

  let[title,chagneTitle] = useState(['사진','노래','영화']);
  let[date,chagneDate] = useState(['2024/02/22','2024/02/23','2024/02/23']);
  
  let [up, addUp] = useState(0);
  let [down, addDown] = useState(0);

  function changeTitle(){
    /* deep copy 필요 
    / var newArray = 글제목; -> 값 공유 말고 값 복사 필요
    / var newArray = [...글제목]; -> 서로 독립적인 값. 값 복사
    */
    var newArray = [...글제목];
    var changeData = newArray[0];
    newArray[0] = newArray[1];
    newArray[1] = changeData;
    
    글제목변경(newArray);

    addUp(0);
    addDown(0);
  }

  return (
    <div className='App'>
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>
      <div className='list'>
          <h3>{글제목[0]} <span onClick={ () => { addUp(up+1) }}>👍</span> {up} <span onClick={ () => { addDown(down+1) }}>👎</span> {down} </h3>
          <button onClick= { () => { changeTitle() } }>Change</button>
          <p> 2월 23일 발행</p>
          <hr/>     
      </div>
      <div className='list'>
          <h2>{title[0]}</h2>
          <h4>{date[0]}</h4>
          <hr/>     
      </div>
      <div className='list'>
          <h2>{title[1]}</h2>
          <h4>{date[1]}</h4>
          <hr/>     
      </div>
      <div className='list'>
          <h2>{title[2]}</h2>
          <h4>{date[2]}</h4>
          <hr/>     
      </div>
      <nav>
        <Link to ='/'>Home</Link> |  <Link to ='about'>About</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </div> 
  );

}
export default App;
/*
  let posts = '일찍 퇴근하기';
  let tests = { color : 'blue', fontSize : '50px' } ;
  let bn = 'black-nav';
  function 함수(){
    return 100
  }
  return (
    
    // React -> 데이터 바인딩이 쉬움
    <div className="App">
      <div className='black-nav'>
        asf
      </div>
      <div className={ bn }>
        <div style={ { color : 'red', fontSize : '30px' } }>s
        실패야 이건
        </div>
        <div style={tests}>
          
        </div>
      </div>
      <h4>{ posts }</h4>
      <h4>{ 함수() }</h4>
      <img src ={ logo }/>
    </div>
  );

}
*/