import { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Create.css"; // 스타일을 따로 분리하여 임포트

// 예제 팀원 데이터
const members = [
    { id: 1, name: "장원영", intro: "장원영이에요~", gender: "female" },
    { id: 2, name: "카리나", intro: "에스파에요~", gender: "male" },
    { id: 3, name: "설윤", intro: "호호호", gender: "female" },
    { id: 4, name: "유나", intro: "유나입니다. 잘부탁드려요.", gender: "male" },
    { id: 5, name: "윈터", intro: "겨울", gender: "female" },
];

const REQUIRED_SELECTION = 3; // 반드시 3명 선택

function Create() {
    const [selectedMembers, setSelectedMembers] = useState([]); // 선택된 멤버 관리
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 멤버 인덱스

    // 선택 버튼 클릭 이벤트
    const handleSelect = (id) => {
        if (selectedMembers.includes(id)) {
            setSelectedMembers((prev) => prev.filter((memberId) => memberId !== id));
        } else {
            if (selectedMembers.length < REQUIRED_SELECTION) {
                setSelectedMembers((prev) => [...prev, id]);
            }
        }
    };

    // 다음 멤버 보기
    const nextMember = () => {
        if (currentIndex < members.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    // 이전 멤버 보기
    const prevMember = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    // 성별에 맞는 이모지 표시 함수
    const getGenderEmoji = (gender) => {
        return gender === "male" ? "🤵" : "👰";
    };

    return (
        <Container style={{ maxWidth: "1200px", width: "100%" }} className="text-center mt-4">
            {/* 설명 문구 */}
            <h2>팀 생성</h2>
            <p style={{ borderBottom: "2px solid #dee2e6", paddingBottom: "10px" }}>
                마음에 드는 사람을 나의 팀으로 만드세요! 어벤져스 3명을 선택하면 됩니다
            </p>
            <p>{`현재 ${currentIndex + 1} / ${members.length} 번째`}</p>

            {/* "내 팀원" 제목 및 선택된 카드 (선택된 팀원이 있을 경우만 표시) */}
            {selectedMembers.length > 0 && (
                <div
                    style={{
                        marginTop: "30vh",
                        position: "absolute",
                        top: "10%",
                        right: "10%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "center", // 세로로 가운데 정렬
                        alignItems: "center", // 가로로 가운데 정렬
                    }}
                >
                    <h4>내 팀원</h4>
                    {selectedMembers.map((id) => {
                        const member = members.find((member) => member.id === id);
                        return (
                            <Card
                                key={member.id}
                                className="shadow-lg selected-card"
                                style={{ width: "250px" }}
                            >
                                <Card.Body className="text-center">
                                    <Card.Title>
                                        {member.name} {getGenderEmoji(member.gender)}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{member.intro}</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* 카드 컨테이너 */}
            <Row className="justify-content-center align-items-center mt-5">
                {/* 이전 버튼 (화살표) */}
                <Col xs="auto">
                    <Button variant="light" onClick={prevMember} disabled={currentIndex === 0}>
                        ◀
                    </Button>
                </Col>

                {/* 카드 */}
                <Col
                    xs={8}
                    md={4}
                    className="position-relative overflow-hidden"
                    style={{ width: "400px", height: "250px", background: "transparent" }} // 카드 가로로 늘리기
                >
                    <Card className="shadow-lg" style={{ width: "100%", height: "100%" }}>
                        <Card.Body className="text-center d-flex flex-column justify-content-center">
                            <Card.Title>
                                {members[currentIndex].name} {getGenderEmoji(members[currentIndex].gender)}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{members[currentIndex].intro}</Card.Subtitle>
                            <Button
                                variant={selectedMembers.includes(members[currentIndex].id) ? "danger" : "primary"}
                                onClick={() => handleSelect(members[currentIndex].id)}
                                style={{ backgroundColor: "#ef66a5", borderColor: "#ef66a5" }}
                            >
                                {selectedMembers.includes(members[currentIndex].id) ? "선택 취소" : "선택"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 다음 버튼 (화살표) */}
                <Col xs="auto">
                    <Button variant="light" onClick={nextMember} disabled={currentIndex === members.length - 1}>
                        ▶
                    </Button>
                </Col>
            </Row>

            {/* 선택 완료 버튼 */}
            <Button
                className="mt-3"
                variant={selectedMembers.length === REQUIRED_SELECTION ? "success" : "secondary"}
                style={{
                    backgroundColor: selectedMembers.length === REQUIRED_SELECTION ? "#ef66a5" : "#f4ecf0",
                    borderColor: selectedMembers.length === REQUIRED_SELECTION ? "#ef66a5" : "#f4ecf0",
                }}
                disabled={selectedMembers.length !== REQUIRED_SELECTION}
            >
                선택 완료
            </Button>
        </Container>
    );
}

export default Create;
