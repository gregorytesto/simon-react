import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const boxes = ["yellow", "blue", "red", "green"];
  const [ computerOrder, setComputerOrder ] = useState([ 3, 0, 1, 2 ]);
  // const [ playerOrder, setPlayerOrder ] = useState([]);
  const [ selectedBox, setSelectedBox ] = useState(null);

  const handleAddRandomBox=()=>{
    let randomIndex = Math.floor(Math.random()*4);
    setComputerOrder([ ...computerOrder,  randomIndex]);
  }

  const showComputerOrder=()=>{

    for(let i=0;i<computerOrder.length; i++){
      setTimeout(()=>{
        handleBlink(computerOrder[i]);
      }, 500*(i+1));
    }

  }

  useEffect(()=>{
    showComputerOrder();
  }, []);

  const handleBlink=(index)=>{
    setSelectedBox(index);
    setTimeout(()=>{
      setSelectedBox(null);
    }, 333)
  }

  const handleClickBox=(boxIndex, e)=>{
    // handleBlink(boxIndex);
    // handleAddRandomBox();
  }

  let boxesElArr = boxes.map((color, index)=>{
    return (
      <div 
        key={index}
        onClick={(e)=>handleClickBox(index, e)} 
        style={{ backgroundColor: color, opacity: selectedBox === index ? 1: .5 }} 
        id={"box-"+index}
        className= {"box"}
      ></div>
    )
  })
  return (
    <div id="boxes-container">
      { boxesElArr }
    </div>
  );
}

export default App;
