import React, { useState, useEffect, useMemo } from 'react';
import db from "../../assets/db"

function FileReader({lyric_path}) {
    const [fileContent, setFileContent] = useState([]);
    const [matchingLines, setMatchingLines] = useState([]);
    const [lyric_display, setLyric_display] = useState("");
    const [display_time, setDisplay_time] = useState(0);
    const [start,setstart] = useState(0);

    const regex1 = /^\[\d{2}:\d{2}\.\d{2}\]/;
    const regex2 = /^\[\d{2}:\d{2}:\d{2}\]/;

    useEffect(() => {
        fetch(lyric_path.lyric)
            .then(response => response.text())
            .then(data => {
                console.log(lyric_path.lyric , "lyric testing");
                const lines = data.split("\n");
                const matchingLines = [];
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    let timestamp, content; // timestamp in term of ms

                    if (regex1.test(line.substring(0, 10))) {
                        let minute = parseInt(line.substring(1, 3));
                        // console.log(minute)
                        let second = parseInt(line.substring(4, 6));
                        // console.log(second)
                        let ten_ms = parseInt(line.substring(7, 9));
                        // console.log(ten_ms)
                        timestamp = minute*60*1000 + second*1000 + ten_ms*10;
                        // console.log(timestamp)
                        content = line.substring(10);
                        // console.log(content)

                    } else if (regex2.test(line.substring(0, 10))) {
                        let minute = parseInt(line.substring(1, 3));
                        // console.log(minute)
                        let second = parseInt(line.substring(4, 6));
                        // console.log(second)
                        let ten_ms = parseInt(line.substring(7, 9));
                        // console.log(ten_ms)
                        timestamp = minute*60*1000 + second*1000 + ten_ms*10;
                        // console.log(timestamp)
                        content = line.substring(10);
                        // console.log(content)
                    } else {
                        continue;
                    }

                    matchingLines.push({ timestamp, content });
                }
                setMatchingLines(matchingLines);
                let duration = lyric_path.time.split(":")
                duration = parseInt(duration[0])*60*1000+parseInt(duration[1])*1000;
                setstart(Date.now())

                setInterval(() => {
                    setDisplay_time(Date.now())
                  }, 10)
            }).catch(err => console.log(err))
    }, [lyric_path]);

    useEffect(() => {
        const lyrics = {};
        matchingLines.forEach(({ timestamp, content }) => {
            lyrics[timestamp] = {
                timestamp: timestamp,
                content: content,
            };
        });
        setFileContent(lyrics);
    }, [matchingLines]);

    useEffect(() => {
        for(let i = display_time - start - 100; i<display_time - start + 100;i++) 
        if(i in fileContent) {
            setLyric_display(fileContent[i].content)
        }
    }, [display_time])



    function display_lyric(lyric_content) {
        return <p>{lyric_content}</p>;
    }

    function display_lyric2(lyric_content) {
        return console.log(lyric_content);
    }

    function interval_function(lyric_content, timestamp) {
        let intervalId = setInterval(display_lyric(lyric_content), timestamp);
        setTimeout(() => {
            clearInterval(intervalId);
          }, 1501);
    }

    function display_num() {
        for (let i = 0; i < 6; i++) {
            print
        }
    }

    return (
        <div>
        {console.log(lyric_display)}
            {lyric_display}
        </div>
    );
}

export default FileReader;
