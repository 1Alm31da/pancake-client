import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./styles.css";

export default function Seat() {
    const [socket, setSocket] = useState();
    const [rows, setRows] = useState({})

    useEffect(() => {
        const s = io("https://earnest-pegasus-1ebe1c.netlify.app");
        setSocket(s);

        s.on("inicial-seats", (inicialState) => {
            if (s == null) return
            console.log(inicialState)
            setRows(inicialState);
        });
    
        return () => {
          s.disconnect();
        };
    }, []);

    const emitSeatChanges = (updatedSeats) => {
        socket.emit("send-class", updatedSeats);
    };

    const eventHandler = (rowIndex, seatIndex) => {
        console.log(rowIndex, seatIndex);
        console.log(rows);
    
        const updatedSeats = { ...rows };
        
        const updatedRow = updatedSeats[`${rowIndex}`];

        console.log(updatedRow[seatIndex - 1].togle)
    
        if (updatedRow[seatIndex - 1].togle) {
            updatedRow[seatIndex - 1].class = "selected";
        } else if (!updatedRow[seatIndex - 1].togle) {
            updatedRow[seatIndex - 1].class = "button-33";
        }
    
        updatedRow[seatIndex - 1].togle = !updatedRow[seatIndex - 1].togle;
    
        updatedSeats[`${rowIndex}`] = updatedRow;
    
        setRows(updatedSeats);
        emitSeatChanges(updatedSeats);
    };
    
    useEffect(() => {
        if (socket == null) return

        socket.on("received-class", (stateBtn) => {
            console.log(stateBtn);
            const updatedSeats = {...stateBtn};
            for (const rowKey in updatedSeats) {
                const row = updatedSeats[rowKey];
                for (const item of row) {
                    if (item.class === "selected") {
                        item.class = "reserved";
                        item.disabled = true;
                    } else if (item.class === "reserved") {
                        item.class = "selected";
                        item.disabled = false;
                    }
                }
            }
            socket.emit("save-seats", updatedSeats);
            setRows(updatedSeats);
        });

        return () => {
            socket.off('received-class');
          };
    }, [socket]);
    
    return (
        <div className="container">
            {Object.keys(rows).map((rowKey) => (
                <div key={rowKey} className="row">
                    {rows[rowKey].map((seat) => (
                        <button
                            key={seat.id}
                            id={`${rowKey}-${seat.id}`}
                            className={seat.class}
                            disabled={seat.disabled}
                            style={{
                                cursor: seat.disabled ? "not-allowed" : "pointer"
                            }}
                            onClick={() => eventHandler(rowKey, seat.id)}
                        >
                            {`${rowKey.split("row")[1]}${String.fromCharCode(65 + seat.id - 1)}`}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}
