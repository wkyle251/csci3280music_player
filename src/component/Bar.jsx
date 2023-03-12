import React, { useEffect, useState, useMemo } from 'react';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Bar({ song }, context) {
  const [play, setplay] = useState(false);
  const [audio, setaudio] = useState(new Audio());
  const [fmtdata, setfmtdata] = useState('');

  const parseFmtChunk = (buffer) => {
    const view = new DataView(buffer);
    const audioData = {
      ChunkID: view.getUint32(0, false),
      ChunkSize: view.getUint32(4, true),
      Format: view.getUint32(8, false),
      Subchunk1ID: view.getUint32(12, false),
      Subchunk1Size: view.getUint32(16, true),
      AudioFormat: view.getUint16(20, true),
      NumChannels: view.getUint16(22, true),
      SampleRate: view.getUint32(24, true),
      ByteRate: view.getUint32(28, true),
      BlockAlign: view.getUint32(32, true),
      BitsPerSample: view.getUint16(34, true),
      Subchunk2ID: view.getUint32(36, false),
      Subchunk2Size: view.getUint32(40, true),
    };
    console.log(audioData);
    setfmtdata(audioData);
    return audioData;
  };

  useEffect(() => {
    console.log('song', song.name);
    audio.pause();
    setplay(false);
    setfmtdata('');
    setaudio(new Audio(song.name));
    fetch(song.name)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        // setFileData(data)
        console.log('passing');
        parseFmtChunk(data);
      })
      .catch((error) => console.error(error));
  }, [song]);

  const musiccontrol = () => {
    console.log(audio,"run");
    if (play) {
      audio.pause();
    } else {
        if (song)
        audio.play();
    }
    setplay(!play);
  };

  return (
    <div>
      <IconButton aria-label="delete" size="small" onClick={musiccontrol}>
        {play ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </IconButton>
      {fmtdata && play && (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {Object.keys(fmtdata).map((key) => (
                <TableRow
                  // key={}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {console.log('allkey:', key, fmtdata[key])}
                  <TableCell component="th" scope="row">
                    {key}
                  </TableCell>
                  <TableCell align="right">{fmtdata[key]}</TableCell>
                </TableRow>
              ))}
              {/* {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
export default Bar;
