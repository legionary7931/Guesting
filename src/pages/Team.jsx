import { useState } from "react";
import Header from "../layouts/Header";

function Team() {
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("팀 생성:", { teamName, description });

        // 여기에서 API 요청을 보낼 수도 있음
        alert(`팀 "${teamName}"이(가) 생성되었습니다!`);
        setTeamName("");
        setDescription("");
    };

    return (
        <div style={styles.container}>

            <Header/>
            <h2>팀 생성</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label style={styles.label}>팀 이름:</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label style={styles.label}>팀 설명:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.textarea}
                    />
                </div>
                <button type="submit" style={styles.button}>팀 생성</button>
            </form>
        </div>
    );
}

// 인라인 스타일 정의
const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        textAlign: "left",
    },
    input: {
        width: "100%",
        padding: "8px",
        marginBottom: "15px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    textarea: {
        width: "100%",
        height: "80px",
        padding: "8px",
        marginBottom: "15px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default Team;
