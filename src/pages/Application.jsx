import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import React from "react";
import axios from "axios";


function Application() {
  const [sentApplications, setSentApplications] = useState([]); // 내가 보낸 신청
  const [receivedApplications, setReceivedApplications] = useState([]); // 내가 받은 신청

  useEffect(() => {
    // 실제 API 호출 대신 예시 데이터를 사용합니다.
    const fetchSentData = async () => {
        try {
          const response = await axios.get("http://localhost:9000/receivedRegists"); // /receivedRegists GET 요청
          setSentApplications(response.data); // 데이터 설정
        } catch (error) {
          console.log("Error fetching sent applications:", error);
        }
      };
  
    // 내가 받은 신청 데이터 요청
    const fetchReceivedData = async () => {
    try {
        const response = await axios.get("http://localhost:9000/sentRegists"); // /sentRegists GET 요청
        setReceivedApplications(response.data); // 데이터 설정
    } catch (error) {
        console.log("Error fetching received applications:", error);
    }
    };
  
    fetchSentData();
    fetchReceivedData();
  }, []);

  const renderTableSection = (applications, title) => (
    <div className="pd-4">
      <h3>{title}</h3>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        <Table striped bordered hover style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
            <tr>
                <th style={{ width: "15%" }}>회원 이름</th>
                <th style={{ width: "10%" }}>성별</th>
                <th style={{ width: "15%" }}>팀 이름</th>
                <th style={{ width: "15%" }}>등록일</th>
                <th style={{ width: "10%" }}>상태</th>
                <th style={{ width: "15%" }}>집 이름</th>
                <th style={{ width: "20%" }}>주소</th>
            </tr>
            </thead>
            <tbody>
                {applications.map((application, appIdx) => { // appIdx: 팀 단위 인덱스
                    const memberCount = application.sendTeam.memberResList.length;
                    const backgroundColor = appIdx % 2 === 0 ? "#f4ecf0" : "transparent"; // 팀 단위로 색상 변경

                    return (
                    <React.Fragment key={application.registId}>
                        {application.sendTeam.memberResList.map((member, idx) => (
                        <tr key={`${application.registId}-${member.memberId}`} 
                            style={{ borderBottom: "2px solid #dee2e6", backgroundColor }}>
                            <td style={{ width: "15%" }}>
                            <span title={`이름: ${member.name}\n자기소개: ${member.intro}\n성별: ${member.gender}`}>
                                {member.name}
                            </span>
                            </td>
                            <td style={{ width: "10%" }}>{member.gender}</td>
                            {idx === 0 && ( // 팀의 첫 번째 멤버인 경우만 rowSpan 적용
                            <>
                                <td style={{ width: "15%" }} rowSpan={memberCount}>{application.sendTeam.name}</td>
                                <td style={{ width: "15%" }} rowSpan={memberCount}>{new Date(application.regdate).toLocaleString()}</td>
                                <td style={{ width: "10%" }} rowSpan={memberCount}>{application.status}</td>
                                <td style={{ width: "15%" }} rowSpan={memberCount}>{application.houseRes.name}</td>
                                <td style={{ width: "20%" }} rowSpan={memberCount}>{application.houseRes.addr}</td>
                            </>
                            )}
                        </tr>
                        ))}
                    </React.Fragment>
                    );
                })}
            </tbody>
            </Table>
        </div>
    </div>
  );

  return (
    <div className="container" style={{ height: "100vh", display: "flex", flexDirection: "column", paddingTop: "20px" }}>
        <h2>신청 목록 조회</h2>
        <p style={{ borderBottom: "2px solid #dee2e6", paddingBottom: "10px" }}>
            내가 보내고 받은 게스팅 신청 내역을 확인할 수 있습니다. 자기소개를 확인하려면 회원 이름에 커서를 갖다대세요!
        </p>
        <div className="container" style={{ flex: 1, overflow: "auto" }}>
            {renderTableSection(sentApplications, "내가 보낸 신청")}
        </div>
        <div className="container" style={{ flex: 1, overflow: "auto" }}>
            {renderTableSection(receivedApplications, "내가 받은 신청")}
        </div>
    </div>
  );
}

export default Application;