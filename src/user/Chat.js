import { useState } from 'react'
import Layout from '../core/Layout'
import io from 'socket.io-client'
import Room from './Room'

const socket = io.connect('http://localhost:8000')

const Chat = () => {
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
      }

    const showFormChat = () => (
               <div className="joinChatContainer">
                <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(event) => {
                    setUsername(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Room ID..."
                    onChange={(event) => {
                    setRoom(event.target.value);
                    }}
                />
                <button onClick={joinRoom}>Join A Room</button>
            </div>
    )

    return (
        <Layout 
            title='Chat' 
            description='Chat with other customers' 
            className='container-fluid'
        >
            <div className="row">
            {!showChat?(
                    <div className="col-12">
                        {showFormChat()}
                    </div>
            ):(
                <div className="col-12">
                    <Room socket={socket} username={username} room={room} />
                </div>
            )}
                
            </div>
        </Layout>
    )
}

export default Chat