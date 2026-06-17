import React, { useEffect, useRef, useState } from 'react'
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth'; "firebase/auth"
import { auth } from "./firebase-config"
import { Splash } from './components/Splash';

const cookies = new Cookies();

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000)
  }, []);



  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  if (showSplash) {
    return (
      <Splash />
    );
  }
  else {


    return (
      <div className='h-screen'>
        {room ?
          <Chat room={room} />
          : <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <p className='font-bold text-3xl'>Join a Room</p>
            <input
              ref={roomInputRef}
              // onChange={(e) => setRoom(e.target.value)}
              className='border border-gray-300 p-2 rounded-lg text-sm w-80' type="text" placeholder='# ROOM NAME' />
            <button
              onClick={() => setRoom(roomInputRef.current.value)}
              className="flex items-center justify-center w-80 gap-2 bg-blue-400 p-2 rounded hover:bg-blue-500 hover:transition-colors hover:duration-300 cursor-pointer w-60">
              <p className='text-white'>Join →</p>
            </button>

            <div>
              <button
                className='cursor-pointer hover:text-red-600'
                onClick={() => signUserOut()}
              >Sign Out</button>
            </div>
          </div>}
      </div>

    )
  }

}

export default App
