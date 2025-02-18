
// image import 
import logo from './logo.svg';
import './App.css';

function App() {

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
          Nav Bar
        </div>
        <div style={tests}>
          ggg
        </div>
      </div>
      <h4>{ posts }</h4>
      <h4>{ 함수() }</h4>
      <img src ={ logo }/>
    </div>
  );
}

export default App;
