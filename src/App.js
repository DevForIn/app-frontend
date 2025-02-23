/* eslint-disable */

// image import 
import React, { use, useState }  from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // 변수 저장
  let posts = '강남 고기 맛집';
  
  // state = [state 데이터, state 데이터 변경 함수]
  // 자주 바뀌는, 중요한 데이터는 state로 선언
  let [글제목, 글제목변경] = useState(['남자 코트 추천', ' 강남 우동 맛집']);

  let[title,chagneTitle] = useState(['사진','노래','영화']);
  let[date,chagneDate] = useState(['2024/02/22','2024/02/23','2024/02/23']);
  
  let [up, changeUp] = useState(0);

  function changeTitle(){
    /* deep copy 필요 
    / var newArray = 글제목; -> 값 공유 말고 값 복사 필요
    / var newArray = [...글제목]; -> 서로 독립적인 값. 값 복사
    */
    var newArray = [...글제목];
    newArray[0] = '여자 코트 추천';
    글제목변경(newArray);
  }

  return (
    <div className='App'>
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>
      <div className='list'>
          <h3>{글제목[0]} <span onClick={ () => { changeUp(up+1) }}>👍</span> {up} </h3>
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