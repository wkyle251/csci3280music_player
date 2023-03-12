import React, { useEffect, useState, useMemo } from "react"
import db from "../../assets/db"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
const Table2 = ({ songback }, context) => {


    const [list, setlist] = useState(db)

    const [searchby, setsearch] = useState("")

    useEffect(() => {
        if (searchby) {
            setlist(list.filter((row) => {
                for (const key in row) {
                    if (row[key].toLowerCase().includes(searchby.toLowerCase()))
                        return true;
                }
                return false;
            }))
        } else
            setlist(db)

    }, [searchby])

    return (
        <div>
            <TextField id="standard-basic"
                label="Search"
                variant="filled"
                value={searchby}
                onChange={(val) => setsearch(val.target.value)}
                fullWidth minWidth={650}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Filename</TableCell>
                            <TableCell align="right">duration</TableCell>
                            <TableCell align="right">title</TableCell>
                            <TableCell align="right">artist</TableCell>
                            <TableCell align="right">album</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.artist}</TableCell>
                                <TableCell align="right">{row.album}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" size="small" onClick={() => {

                                        console.log(row.name)
                                        songback(row)
                                    }}>
                                        <PlayCircleIcon fontSize="inherit" />
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