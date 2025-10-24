// src/pages/Home/Alarm.jsx
import React, { useState } from "react";

const Alarm = () => {
    const [alarms, setAlarms] = useState([
        { id: 1, type: "newComment", message: "‘힘든 하루였어요’ 글에 새로운 위로글이 달렸습니다 💌" },
        { id: 2, type: "liked", message: "당신의 위로글이 누군가의 마음을 울렸어요 💖" },
        { id: 3, type: "reply", message: "‘불안한 마음’ 글의 주인이 짧은 답변을 보냈어요: ‘고마워요.’ 💬" },
    ]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>알람 화면</h1>
            {alarms.length === 0 ? (
                <p>새로운 알람이 없습니다.</p>
            ) : (
                <ul>
                    {alarms.map((alarm) => (
                        <li key={alarm.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                            {alarm.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alarm;
