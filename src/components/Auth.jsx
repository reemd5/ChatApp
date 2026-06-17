import {FaGoogle} from "react-icons/fa"
import { auth, provider } from "../firebase-config";
import {signInWithPopup} from "firebase/auth"
import Cookies from 'universal-cookie'; 

const cookies = new Cookies();

export const Auth = (props) => {

    const {setIsAuth} = props;

    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            // console.log(result);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
            
        }
        catch (error){
            console.log(error);
        }
    }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
        <p className="font-bold text-xl">Sign in with google to start chatting!</p>
        <div>
        <button className="flex items-center gap-2 border border-gray-400 p-2 rounded hover:bg-blue-400 hover:transition-colors hover:duration-300 cursor-pointer" onClick={signInWithGoogle}>
            <FaGoogle/>
            Continue with Google
        </button>            
        </div>


    </div>
  );
}