import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const boxes = ["yellow", "blue", "red", "green"];
  const [ computerOrder, setComputerOrder ] = useState([]);
  const [ playerOrder, setPlayerOrder ] = useState([]);
  const [ selectedBox, setSelectedBox ] = useState(null);
  const [ isGameOver, setIsGameOver ] = useState(false);

  const showPattern=(pattern, miliSecs=500)=>{

    for(let i=0;i<pattern.length; i++){
      setTimeout(()=>{
        handleBlink(pattern[i]);
      }, miliSecs*(i+1));
    }

  }

  useEffect(()=>{
    showPattern([ 0, 1, 3, 2, 0, 1, 3, 2 ], 175);
  }, []);

  const handleBlink=(index, miliSecs=333)=>{
    setSelectedBox(index);
    setTimeout(()=>{
      setSelectedBox(null);
    }, miliSecs)
  }

  const handleClickBox=(boxIndex)=>{
    handleBlink(boxIndex);
    let isCorrectOrder = true;
    let newPlayerOrder = [ ...playerOrder, boxIndex];
    
    for(let i=0;i<newPlayerOrder.length;i++){
      if(newPlayerOrder[i] !== computerOrder[i]){
        isCorrectOrder = false;
      }
    }

    if(!isCorrectOrder){
      setIsGameOver(true);
      return;
    }
    if( newPlayerOrder.length === computerOrder.length ){
      newPlayerOrder= [];
      let randomIndex = Math.floor(Math.random()*4);
      let newComputerOrder = [ ...computerOrder,  randomIndex ];
      setComputerOrder(newComputerOrder);
      showPattern(newComputerOrder);
    }
    setPlayerOrder(newPlayerOrder);
  }

  let handleStartGame=()=>{
    let initialOrder = [ 3 ];
    setComputerOrder(initialOrder);
    showPattern(initialOrder);
  }

  let boxesElArr = boxes.map((color, index)=>{
    return (
      <div 
        key={index}
        onClick={()=>handleClickBox(index)} 
        style={{ backgroundColor: color, opacity: selectedBox === index ? 1: .5 }} 
        className= {"box"}
      ></div>
    )
  })
  return (
    <div id="boxes-container">
      { isGameOver ? (
        <h1>GGggggrrr... Game over</h1>
      ) : (
        boxesElArr
      ) }
      <button onClick={handleStartGame}>Start</button>
    </div>
  );
}

export default App;
