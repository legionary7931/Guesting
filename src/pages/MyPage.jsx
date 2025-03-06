import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { motion } from "framer-motion"; // 애니메이션 추가

axios.defaults.withCredentials = true;
function MyPage() {
    const [myInfo, setMyInfo] = useState({});
    const [myMatch, setMyMatch] = useState({});

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await axios.get("http://localhost:9000/mypage");
                setMyInfo(response.data);
            } catch (error) {
                console.log("Error fetching my information", error);
            }
        };
        
        const fetchMyMatch = async () => {
            try {
                const response = await axios.get("http://localhost:9000/myMatchings");
                setMyMatch(response.data);
            } catch (error) {
                console.log("Error fetching my information", error);
            }
        };
        
        fetchMyInfo();
        fetchMyMatch();
    }, []);

    return (
        <motion.div
        className="text-start container"
        style={{ height: "100vh", display: "flex", flexDirection: "column", paddingTop: "20px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        layout
    >
        <h2>MyPage</h2>
        <p style={{ borderBottom: "2px solid #dee2e6", paddingBottom: "10px" }}>
            내 정보를 확인하세요!
        </p>
        <div className="container" style={{ flex: 1, overflow: "hidden" }}>
            <h4>내 정보</h4>
            {myInfo && Object.keys(myInfo).length > 0 ? (
                <div>
                    <p><strong>등록 ID:</strong> {myInfo.memberId}</p>
                    <p><strong>팀 이름:</strong> {myInfo.sendTeam?.name || "없음"}</p>
                    <p><strong>자기 소개:</strong> {myInfo.intro || "없음"}</p>

                    <h4>팀원 정보</h4>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "20px",
                            marginTop: "10px"
                        }}
                    >
                        {myInfo.sendTeam?.memberResList?.map((member, index) => (
                            <motion.div
                                key={index}
                                style={{
                                    padding: "15px",
                                    borderRadius: "12px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: "#F4ECF0",
                                    textAlign: "left"
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <p><strong>이름:</strong> {member.name}</p>
                                <p><strong>소개:</strong> {member.intro}</p>
                                <p><strong>성별:</strong> {member.gender}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>정보를 불러오는데 오류가 발생했습니다.</p>
            )}
        </div>

        <div className="container" style={{ flex: 1, overflow: "auto", paddingTop: "20px" }}>
            <h4>매칭된 팀 정보와 게스트하우스 정보</h4>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",  // 두 항목 사이의 간격
                    flexWrap: "wrap" // 화면 크기에 따라 줄 바꿈 가능
                }}
            >
                {/* 매칭된 팀 정보 */}
                {myMatch?.receiveTeam ? (
                    <div
                        style={{
                            flex: "1 1 45%", // 1:1 비율로 배치, 최소 45%씩 차지
                            padding: "15px",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#EAF2FF",
                            textAlign: "left"
                        }}
                    >
                        <p><strong>팀 이름:</strong> {myMatch.receiveTeam.name}</p>
                        <p><strong>매칭 상태:</strong> {myMatch.status}</p>
                        <p><strong>매칭 날짜:</strong> {new Date(myMatch.regdate).toLocaleDateString()}</p>
                        <p><strong>숙소 이름:</strong> {myMatch.houseRes.name}</p>
                        <p><strong>주소:</strong> {myMatch.houseRes.addr}</p>

                        <h5 style={{ marginTop: "10px" }}>팀원 목록</h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                gap: "15px",
                                marginTop: "10px"
                            }}
                        >
                            {myMatch.receiveTeam.memberResList?.map((member, index) => (
                                <motion.div
                                    key={index}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "8px",
                                        backgroundColor: "#FFFFFF",
                                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                        textAlign: "left"
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <p><strong>이름:</strong> {member.name}</p>
                                    <p><strong>소개:</strong> {member.intro}</p>
                                    <p><strong>성별:</strong> {member.gender === "male" ? "남성" : "여성"}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>매칭된 팀 정보가 없습니다.</p>
                )}
            </div>
        </div>
    </motion.div>
    );
}

export default MyPage;

/*
const response = {
    "data": {
        "memberId": 1,
        "name": "alex",
        "intro": "hello my name is ",
        "gender": "male",
        "sendTeam": {
            "teamId": 1,
            "name": "teamgogo",
            "memberResList": [
                {
                    "memberId": 1,
                    "name": "alex",
                    "intro": "hello my name is ",
                    "gender": "male"
                },
                {
                    "memberId": 2,
                    "name": "sac",
                    "intro": "hello my name is ",
                    "gender": "female"
                },
                {
                    "memberId": 3,
                    "name": "john",
                    "intro": "nice to meet you",
                    "gender": "male"
                },
                {
                    "memberId": 4,
                    "name": "lisa",
                    "intro": "I love coding",
                    "gender": "female"
                }
            ]
        }
    }
};
*/