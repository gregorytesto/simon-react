import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const boxes = ["yellow", "blue", "red", "green"];
  const [ computerOrder, setComputerOrder ] = useState([ 3 ]);
  const [ playerOrder, setPlayerOrder ] = useState([]);
  const [ selectedBox, setSelectedBox ] = useState(null);
  const [ isGameOver, setIsGameOver ] = useState(false);

  const showPattern=(pattern)=>{

    for(let i=0;i<pattern.length; i++){
      setTimeout(()=>{
        handleBlink(pattern[i]);
      }, 500*(i+1));
    }

  }

  useEffect(()=>{
    showPattern(computerOrder);
  }, []);

  const handleBlink=(index)=>{
    setSelectedBox(index);
    setTimeout(()=>{
      setSelectedBox(null);
    }, 333)
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
      { !isGameOver && boxesElArr }
      { isGameOver &&
        <h1>GGggggrrr... Game over</h1>
      }
    </div>
  );
}

export default App;
