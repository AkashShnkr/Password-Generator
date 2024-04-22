import "./App.css";
import { useCallback, useEffect, useState,useRef } from "react";

function App() {
  const [length, setLenght] = useState(8);
  const [noallowed, setnoallowed] = useState(false);
  const [charater, setcharater] = useState(false);
  const [password, setpassword] = useState("");
// useRef Hooks
  const passwordRef =useRef(null)
  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (noallowed) str = str + "0123456789";
    if (charater) str = str + "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass+ str.charAt(char);
    }
    setpassword(pass);
  }, [length, noallowed, charater, setpassword]);
  const copypasswordToClipboard = useCallback(()=>{passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

  },[password])

  useEffect(()=>{
    passwordgenrator()

  },[length, noallowed, charater, setpassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-8 px-4 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
          onClick={copypasswordToClipboard}
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex test-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            minLength={6}
            maxLength={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLenght(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={noallowed}
            id="numberInput"
            onChange={()=>{
              setnoallowed((prev)=>!prev);
            }}

             />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charater}
            id="charaterInput"
            onChange={()=>{
              setcharater((prev)=>!prev);
            }} />
<label htmlFor="charaterInput">Charater</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
