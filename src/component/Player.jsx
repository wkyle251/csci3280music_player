import React, { useEffect, useState, useMemo } from 'react'
import db from '../../assets/db'
import Table2 from './Table'
import Bar from './Bar'
import { Button } from '@mui/material'
// import { createServer } from "http";
// import { Server } from "socket.io";
const Player = ({}, context) => {
  const [list, setlist] = useState(db)
  const [song, setsong] = useState('')
  const [play, setplay] = useState(false)

  const [fileData, setFileData] = useState(null)
  const [sckdata,setdata] = useState(null)
  const [sckmsg,setmsg] = useState(null)
  const [ready,setready] = useState(false)

  const socket = new WebSocket('ws://192.168.50.239:8765')
  socket.onopen = () => {
    console.log('open connection')
    // setready(true)
  }
  function b2 (blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const arrayBuffer = reader.result
        const decoder = new TextDecoder('utf-8')
        const jsonStr = decoder.decode(arrayBuffer)
        const dictList = JSON.parse(jsonStr)
        resolve(dictList)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsArrayBuffer(blob)
    })
  }
  // Connection opened
  // Connection opened
  socket.addEventListener('open', event => {
    socket.send('Hello Server!')
    // socket.send('getSong:')
    // setready(true)
  })
  socket.onmessage = event => {
    const data = event.data
    setdata(data)
    // console.log(
    //   b2(data).then(res => {
    //     console.log(res)
    //   })
    // )
  }
  // Listen for messages
  socket.addEventListener('message', event => {
    console.log('Message from server ', event.data)
  })
  const sock = (msg) => {
    // let msg = `checkAva:${JSON.stringify(list[2])}`
    console.log("send:",msg)
    socket.send(msg)
  }

  return (
    <div>
      <Table2 songback={song => setsong(song)}
      sock={(msg)=>sock(msg)}
      data={sckdata}
      ready={ready}
       />
      {/* {list.map()} */}
      the player get folder dest:
      <input
        type='file'
        id='dirInput'
        webkitdirectory='true'
        directory='true'
        multiple
      />
      <input type='file' id='dir2' />
      <Bar
        song={song}
        // play={play}
        // databack={(val) => setplay(val)}
      />
      <Button onClick={() => sock()}>test</Button>
    </div>
  )
}
export default Player
