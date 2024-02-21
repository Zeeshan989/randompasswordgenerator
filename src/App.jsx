import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setlength]=useState(8)
  const [pass,setpass]=useState('')
  const [num,setnum]=useState(false)
  const [char,setchar]=useState(false)
  const textfocus=useRef();

  const passgenerator=useCallback(()=>{
    let password=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num){
      str+='1234567890'
    }
    if(char){
      str+='!@#$%^&*()'
    }
    for(let i=0;i<length;i++){
      password=password+str.charAt(Math.floor(Math.random()* str.length));
    }
    /* setpass({password}) 
    */
    setpass(password)

  },[length,num,char]);

  useEffect(()=>{
    passgenerator()
  },[length,num,char,passgenerator])

  const copyaction=()=>{
    textfocus.current?.select();
    textfocus.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(pass)
    
  }


  return (
    <>
      <h1 className="text-3xl text-gray-900 text-center font-extrabold my-20">Random Password Generator</h1>
         <div className="flex justify-center">
          <input type="text" value={pass} ref={textfocus} className="rounded-md w-64 h-8 p-2"></input>
          <button className="bg-blue-800 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded" onClick={copyaction}>Copy</button>
          </div>
          <div className="flex justify-center mb-4 my-10">
          <input type="range" value={length} min='8' max="20" onChange={(e)=>{setlength(e.target.value)}}/>
          <label className='mx-3'>Length:{length}</label>
          <div className='mx-3'>
          <label>
                <input
                  type="checkbox"
                  checked={num}
                  onClick={(e)=>{setnum(!num)}}
                />
                Numbers
          </label>
          <label className='mx-3'>
                <input
                  type="checkbox"
                  checked={char}
                  onClick={(e)=>{setchar(!char)}}
                />
                Characters
          </label>
          </div>

          </div>
    </>
  )
}

export default App
