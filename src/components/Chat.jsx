import { useEffect, useRef, useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard"
import { TbSend } from "react-icons/tb";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { auth, db } from "../firebase-config"


export const Chat = (props) => {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const { room } = props;
    const [copied, setCopied] = useState(false);

    const messagesRef = collection(db, "messages");
    const chatRef = useRef();

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    // changes to listen to
    useEffect(() => {
        const queryMessages = query(messagesRef,
            where("room", "==", room),
            orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsuscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") {
            return;
        }

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
            photo: auth.currentUser.photoURL,
        });

        setNewMessage("");
    }


    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-between px-2">
            {/* header */}
            <div className="flex bg-white items-center w-full h-15 shadow-lg">
                <p className="ml-2 font-bold">Room Name: {room}</p>
                <CopyToClipboard text={room}>
                    <button
                        onClick={() => {
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 500)
                        }}
                        className={`ml-4 text-gray-400 cursor-pointer hover:text-blue-400 ${copied ? 'hidden' : ''}`}><FaRegCopy /></button>
                </CopyToClipboard>
                <FaCheck className={`${copied ? '' : 'hidden'} ml-4 text-gray-400 cursor-pointer`} />


            </div>

            {/* chat */}
            <div ref={chatRef} className="mx-2 overflow-y-scroll h-full">
                {messages.map((message) =>
                    <div key={message.id} className="my-3">
                        <div className="flex gap-2 my-1 items-center">
                            <img src={message.photo || "/profile.png"} alt="profile" className="w-5 h-5 rounded-full" />
                            <span className="text-sm">{message.user}</span>
                        </div>
                        <div className="flex justify-between bg-gray-300 p-2 rounded-lg w-fit gap-5">
                            <span>{message.text}</span>
                            <span className="text-xs text-gray-500">{message.createdAt?.toDate().toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}</span>

                        </div>
                        {/* {console.log(auth.currentUser)} */}
                    </div>
                    // <h1 key={message.id}>{message.text}</h1>
                )}
            </div>

            {/* type */}
            <form onSubmit={handleSubmit}>

                <div className="gap-5 bg-white h-20 flex items-center justify-between">
                    <input type="text" placeholder="Type your message here ..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="h-10 p-2 border w-20/21 rounded-full border-gray-400 bg-gray-100" />
                    <button
                        type="submit"
                        className="btn bg-blue-400 text-white rounded-full p-2 h-10 hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
                    >
                        <TbSend size={20} />
                    </button>
                </div>
            </form>

        </div>
    );


}

