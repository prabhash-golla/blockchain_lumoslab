import './App.css';
import React,{ useState, useEffect} from 'react';
import { ethers } from "ethers";
import abi from './abi.json';

function App() {
  const [contract,setContract] = useState();
  const[todoCount,settodoCount] = useState(0);
  const [inputItem,setInputitem] = useState();
  const [inputlistItem,setInputlistitem] = useState();
  const [inputlistItemRes,setInputlistitemRes] = useState();

  const contractExecution = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract("0xd9145CCE52D386f254917e481eB44e9943F39138",abi,signer);
    setContract(contract);
  }
  const getTodoCount = async() => {
    if(contract){
    const res = await contract.count();
    console.log(Number(res));
    settodoCount(Number(res));}
  }
  useEffect(()=>{
    contractExecution();
  },[])
  const handleChange = (e)=>{
    setInputitem(e.target.value)
  }
  const handleSubmit = async()=>{
    const res = await contract.getTodo(inputItem)
  }
  const hadleGetTodoList = async()=>{
    const res = await contract.todoList(inputlistItem);
    setInputlistitemRes(res);
  }
  const handleTodoList = (e) => {
    setInputlistitem(e.target.value);
  }
  return (
    <div className="App">
      <button onClick={getTodoCount}>GET COUNT</button>
      <h1>to do Count : - {todoCount} </h1>
      <div>
        Enter th input Value
        <input onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        Enter the input Value
        <input onChange={handleTodoList}></input>
        <button onClick={hadleGetTodoList}>Get to do list</button>
        <h4>{inputlistItemRes}</h4>
      </div>
    </div>
  );
}

export default App;
