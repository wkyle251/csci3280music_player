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

import EditIcon from '@mui/icons-material/Edit'
import { Field, Form, Formik, useFormikContext } from 'formik'

import fs from 'fs';

const Table2 = ({ songback }, context) => {
  const [list, setlist] = useState(db|[])

  const [searchby, setsearch] = useState('')
  const [isedit, setisedit] = useState(false)

  useEffect(() => {
    if (searchby) {
      setlist(
        list.filter(row => {
          for (const key in row) {
            if (row[key].toLowerCase().includes(searchby.toLowerCase()))
              return true
          }
          return false
        })
      )
    } else setlist(db)
  }, [searchby])

  const NotEditing = row => {
    return (
      <>
        <TableCell component='th' scope='row'>{row.name}</TableCell>
        <TableCell align='right'>{row.time}</TableCell>
        <TableCell align='right'>{row.title}</TableCell>
        <TableCell align='right'>{row.artist}</TableCell>
        <TableCell align='right'>{row.album}</TableCell>
      </>
    )
  }
  const Editing = (row, i) => {
    return (
      <>
        <TableCell component='th' scope='row'>{row.name}</TableCell>
        <TableCell align='right'>
          <Field name={`[${i}].time`} style={{ width: '80%' }} />
        </TableCell>
        <TableCell align='right'>
          <Field name={`[${i}].title`} style={{ width: '80%' }} />
        </TableCell>
        <TableCell align='right'>
          <Field name={`[${i}].artist`} style={{ width: '80%' }} />
        </TableCell>
        <TableCell align='right'>
          <Field name={`[${i}].album`} style={{ width: '80%' }} />
        </TableCell>
      </>
    )
  }

  const submit = value => {

    // // Write the data to the file
    fs.writeFile('./assets/db.js', `const song=${JSON.stringify(value)}\nexport default song`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  }

  return (
    <div>
      <TextField
        id='standard-basic'
        label='Search'
        variant='filled'
        value={searchby}
        onChange={val => setsearch(val.target.value)}
        fullWidth
      />
      <Formik initialValues={list} enableReinitialize onSubmit={submit}>
        {props => {
          const { values, isSubmitting, setFieldValue, handleSubmit, errors } =
            props
          return (
            <form onSubmit={handleSubmit}>
              <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Filename</TableCell>
                      <TableCell align='right'>duration</TableCell>
                      <TableCell align='right'>title</TableCell>
                      <TableCell align='right'>artist</TableCell>
                      <TableCell align='right'>album</TableCell>
                      <TableCell align='right'>
                        <IconButton
                          onClick={() => {
                            setisedit(!isedit)
                            handleSubmit()
                          }}
                        >
                          <EditIcon />
                          {isedit?"Confirm":"Edit"}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list && list.map((row, i) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        {isedit ? Editing(row, i) : NotEditing(row)}
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
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
export default Table2
