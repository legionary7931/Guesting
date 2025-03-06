import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Create.css"; // 스타일을 따로 분리하여 임포트

const REQUIRED_SELECTION = 3; // 반드시 3명 선택

// 예시 데이터
const fallbackMembers = [
    { memberId: 1, name: "아이언맨", gender: "male", intro: "천재, 억만장자, 자선가" },
    { memberId: 2, name: "캡틴 아메리카", gender: "male", intro: "정의로운 리더" },
    { memberId: 3, name: "블랙 위도우", gender: "female", intro: "세계 최고 요원" },
    { memberId: 4, name: "토르", gender: "male", intro: "천둥의 신" },
    { memberId: 5, name: "헐크", gender: "male", intro: "분노 조절 실패" },
];

function Create() {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Delay function to simulate API delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchMembers = async () => {
            setShowModal(true); // 로딩 시작 시 모달을 보여줍니다
            try {
                await delay(1000); // 1초 delay
                const response = await axios.get("http://localhost:9000/members");
                setMembers(response.data.data);
            } catch (err) {
                console.error("API 요청 실패:", err);
                setError("데이터를 불러오는 데 실패하여 예시 데이터를 사용합니다.");
                setMembers(fallbackMembers);
            } finally {
                setShowModal(false); // 로딩이 끝나면 모달을 닫습니다
            }
        };

        fetchMembers();
    }, []);

    const handleSelect = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((memberId) => memberId !== id) : prev.length < REQUIRED_SELECTION ? [...prev, id] : prev
        );
    };

    const nextMember = () => {
        if (currentIndex < members.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevMember = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const getGenderEmoji = (gender) => (gender === "male" ? "🤵" : "👰");

    const handleSubmit = async () => {
        setShowModal(true); // 로딩 시작 시 모달을 보여줍니다
        try {
            await delay(1000); // 1초 delay
            const mypageRes = await axios.get("http://localhost:9000/mypage");
            console.log(mypageRes);
            if (mypageRes.data.sendTeam) {
                alert("이미 팀이 존재합니다!");
                return;
            }

            const response = await axios.post("http://localhost:9000/teams", {
                memberId1: selectedMembers[0],
                memberId2: selectedMembers[1],
                memberId3: selectedMembers[2],
            });

            if (response.status === 200) {
                alert("팀 생성 성공!");
            } else {
                alert("팀 생성 실패");
            }
        } catch (error) {
            console.error("팀 생성 요청 실패:", error);
            alert("팀 생성 실패");
        } finally {
            setShowModal(false); // 로딩이 끝나면 모달을 닫습니다
        }
    };

    return (
        <Container className="text-center mt-4">
            <h2>팀 생성</h2>
            <p>마음에 드는 사람을 나의 팀으로 만드세요! 어벤져스 3명을 선택하면 됩니다</p>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {members.length > 0 && <p>{`현재 ${currentIndex + 1} / ${members.length} 번째`}</p>}

            <Row className="justify-content-center align-items-center mt-5">
                <Col xs="auto">
                    <Button variant="light" onClick={prevMember} disabled={currentIndex === 0}>◀</Button>
                </Col>
                {members.length > 0 && (
                    <Col xs={8} md={4} className="position-relative">
                        <Card className="shadow-lg">
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {members[currentIndex].name} {getGenderEmoji(members[currentIndex].gender)}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{members[currentIndex].intro}</Card.Subtitle>
                                <Button
                                    variant={selectedMembers.includes(members[currentIndex].memberId) ? "danger" : "primary"}
                                    onClick={() => handleSelect(members[currentIndex].memberId)}
                                >
                                    {selectedMembers.includes(members[currentIndex].memberId) ? "선택 취소" : "선택"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
                <Col xs="auto">
                    <Button variant="light" onClick={nextMember} disabled={currentIndex === members.length - 1}>▶</Button>
                </Col>
            </Row>

            {selectedMembers.length > 0 && (
                <div className="selected-container mt-4">
                    <h4>내 팀원</h4>
                    {selectedMembers.map((id) => {
                        const member = members.find((member) => member.memberId === id);
                        return (
                            <Card key={member.memberId} className="selected-card">
                                <Card.Body>
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

            <Button
                className="mt-3"
                variant={selectedMembers.length === REQUIRED_SELECTION ? "success" : "secondary"}
                disabled={selectedMembers.length !== REQUIRED_SELECTION}
                onClick={handleSubmit}
            >
                선택 완료
            </Button>

            {/* 로딩 모달 */}
            <Modal show={showModal} centered>
                <Modal.Body className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>잠시만 기다려주세요...</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Create;
