import React, { useEffect, useState, useMemo } from "react"
import db from "../../assets/db"
import Table2 from "./Table"
import Bar from "./Bar"

const Player = ({ }, context) => {

    const [list, setlist] = useState(db)
    const [song, setsong] = useState("")
    const [play, setplay] = useState(false)



    const [fileData, setFileData] = useState(null);

    return (
        <div>


            <Table2 songback={(song) => setsong(song)} />
            {/* {list.map()} */}
            the player
            get folder dest:
            <input type="file" id="dirInput" webkitdirectory="true" directory="true" multiple />
            <input type="file" id="dir2" />
            <Bar
                song={song}
            // play={play}
            // databack={(val) => setplay(val)}
            />
        </div>
    )


}
export default Player