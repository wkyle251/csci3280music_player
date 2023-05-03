import React, { useEffect, useState, useMemo } from 'react'
import db from '../../assets/db'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
const Table2 = ({ songback, sock, data, ready }, context) => {
  const [list, setlist] = useState(db)

  const [searchby, setsearch] = useState('')
  const [color, setcolor] = useState([])

  function b2 (blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const arrayBuffer = reader.result
        const decoder = new TextDecoder('utf-8')
        const jsonStr = decoder.decode(arrayBuffer)
        try {
          var dictList = JSON.parse(jsonStr)
        } catch {
          reject('err')
        }
        resolve(dictList)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsArrayBuffer(blob)
    })
  }
  // if (ready){
  //   sock()
  // }
  // socket.onmessage = event => {
  //   const data = event.data
  //   if (typeof(data) == 'string') {

  //   }else{

  //   }
  //   console.log(
  //     b2(data).then(res => {
  //       console.log(res)
  //     })
  //   )
  // }
  // Listen for messages
  // socket.addEventListener('message', event => {
  //   console.log('Message from server ', event.data)
  // })
  // const sock = () => {
  //   let msg = `checkAva:${JSON.stringify(list[2])}`
  //   console.log(msg, list)
  //   socket(msg)
  // }

  const checkexist = row => {
    //  db
    const exists = db.some(
      obj =>
        obj.time === row.time &&
        obj.name === row.name &&
        obj.title === row.title &&
        obj.artist === row.artist &&
        obj.album === row.album
    )
    return exists
  }

  function red (list) {
    const seenEntries = new Set()
    return list.filter(obj => {
      const entry = obj.time + obj.name + obj.title + obj.artist + obj.album
      if (seenEntries.has(entry)) {
        return false
      } else {
        seenEntries.add(entry)
        return true
      }
    })
  }

  // useEffect(()=>{
  //   sock("getSong:")
  // },[])

  useEffect(() => {
    if (!data) return
    if (typeof data == 'string') {
    } else {
      try {
        let temp = b2(data).then(
          res => {
            console.log('res', res)
            let newlist = [
              ...list.filter(row => {
                for (const key in row) {
                  if (row[key].toLowerCase().includes(searchby.toLowerCase()))
                    return true
                }
                return false
              }),
              ...res
            ]
            newlist = red(newlist)
            setlist(newlist)
          },
          rej => {}
        )
      } catch {}
    }
  }, [data])

  useEffect(() => {
    if (searchby) sock(`getSong:${searchby}`)
    // setlist(
    //   list.filter(row => {
    //     for (const key in row) {
    //       if (row[key].toLowerCase().includes(searchby.toLowerCase()))
    //         return true
    //     }
    //     return false
    //   })
    // )
    // } else setlist(db)
  }, [searchby])

  return (
    <div>
      <TextField
        id='standard-basic'
        label='Search'
        variant='filled'
        value={searchby}
        onChange={val => setsearch(val.target.value)}
        fullWidth
        minWidth={650}
      />
      <button
        onClick={() => {
          sock('play:numb.wav')

          sock('getSong:')
        }}
      >
        refresh
      </button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>location</TableCell>
              <TableCell>Filename</TableCell>
              <TableCell align='right'>duration</TableCell>
              <TableCell align='right'>title</TableCell>
              <TableCell align='right'>artist</TableCell>
              <TableCell align='right'>album</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='right'>
                  {checkexist(row) ? 'local' : 'remote'}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                  {checkexist(row) ? '  o' : ''}
                </TableCell>
                <TableCell align='right'>{row.time}</TableCell>
                <TableCell align='right'>{row.title}</TableCell>
                <TableCell align='right'>{row.artist}</TableCell>
                <TableCell align='right'>{row.album}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='delete'
                    size='small'
                    onClick={() => {
                      console.log(row.name)
                      songback(row)
                    }}
                  >
                    <PlayCircleIcon fontSize='inherit' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Table2
