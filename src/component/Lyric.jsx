import React, { useState, useEffect } from 'react';
import db from "../../assets/db"

function FileReader({lyric_path}) {
    const [fileContent, setFileContent] = useState([]);
    const [matchingLines, setMatchingLines] = useState([]);

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

    function display_lyric(lyric_content) {
        return <p>{lyric_content}</p>;
    }

    function interval_function(lyric_content) {
        let intervalId = setInterval(display_lyric(lyric_content), 500);
        setTimeout(() => {
            clearInterval(intervalId);
          }, 1501);
    }

    return (
        <div>
            {Object.keys(fileContent).map((key) => (
                
                <div key={key}>
                    <div>
                        {display_lyric(fileContent[key].content)}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FileReader;
