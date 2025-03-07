import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Guesting() {
    const [teams, setTeams] = useState([]);
    const [regists, setRegists] = useState([]);
    const [currentRequest, setCurrentRequest] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [sentRegists, setSentRegists] = useState([]);
    const [action, setAction] = useState('');

    const fetchRegists = async () => {
        try {
            const response = await axios.get("http://localhost:9000/receivedRegists");
            setRegists(response.data.data);
        } catch (err) {
            console.error("API 요청 실패:", err);
        }
    };

    useEffect(() => {



        const fetchTeam = async () => {
            try {
                const response = await axios.get("http://localhost:9000/teams");
                setTeams(response.data.data);
            } catch (err) {
                console.error("API 요청 실패:", err);

            }
        };



        const fetchSentRegists = async () => {
            try {
                const response = await axios.get("http://localhost:9000/sentRegists");
                if (response.data.data) {
                    setSentRegists(response.data.data);
                }
            } catch (err) {
                console.error("API 요청 실패:", err);
            }
        };

        fetchSentRegists();
        fetchTeam();
        fetchRegists();
    }, []);

    const handleShowModal = (team) => {
        setSelectedTeam(team);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTeam(null);
    };

    const handleShowModal2 = (request, actionType) => {
        setCurrentRequest(request);
        setAction(actionType);
        setShowModal2(true);
    };

    const handleCloseModal2 = () => setShowModal2(false);

    const handleConfirmAction = async () => {
        if (action === 'accept') {
            try {
                const response = await axios.put("http://localhost:9000/regists/accept", {
                    registId: currentRequest.registId
                });
                if (response.status === 200) {
                    alert("게스팅 매칭 수락!");
                    const rejectRequests = regists
                    .filter(request => request.registId !== currentRequest.registId)
                    .map(request => axios.put("http://localhost:9000/regists/decline", {
                        registId: request.registId
                    }));

                await Promise.all(rejectRequests);
                    fetchRegists();
                } else {
                    alert("알수없는 오류로 실패!");
                }
            } catch (error) {
                console.log(error)
                alert(error);
            } finally {
                setShowModal2(false); // 로딩이 끝나면 모달을 닫습니다
            }
        } else if (action === 'reject') {
            try {
                console.log(currentRequest)
                const response = await axios.put("http://localhost:9000/regists/decline", {
                    registId: currentRequest.registId
                });
                if (response.status === 200) {
                    alert("게스팅 거절!");
                    fetchRegists();
                } else {
                    alert("알수없는 오류로 실패!");
                }
            } catch (error) {
                console.log(error)
                alert(error);
            } finally {
                setShowModal2(false); // 로딩이 끝나면 모달을 닫습니다
            }
        }
        setShowModal(false);
    };

    const handleSubmitRequest = async () => {
        try {
            console.log(selectedTeam);
            const response = await axios.post("http://localhost:9000/guestings", {
                teamId: selectedTeam.teamId
            });
            if (response.status === 200) {
                alert("게스팅 요청 성공!");
            } else {
                alert("게스팅 요청 실패!");
            }
        } catch (error) {
            console.log(error)
            alert(error);
        }

        handleCloseModal();
    };

    return (
        <Container fluid className="d-flex">
            {/* 왼쪽: 팀 목록 */}
            <Row className="w-50" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <Col>
                    <h3>팀 목록</h3>
                    <p>게스팅 하고 싶은 팀을 골라서 요청을 보내보세요! 한 번에 한 팀만 가능합니다!</p>
                    <ListGroup>
                        {teams.map((team) => (
                            <ListGroup.Item key={team.teamId}>
                                <h5>{team.name}</h5>
                                <Row>
                                    {team.memberResList.map((member) => (
                                        <Col key={member.memberId} sm={3} className="mb-3">
                                            <Card className="shadow-lg">
                                                <Card.Body className="text-center">
                                                    <Card.Title>
                                                        {member.name} {member.gender === "female" ? "👩" : "👨"}
                                                    </Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">{member.intro}</Card.Subtitle>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <Button
                                    style={{
                                        backgroundColor: sentRegists.length > 0 ? "#f5a6c5" : "#ef66a5",
                                        color: "white",
                                        border: "none"
                                    }}
                                    onClick={() => handleShowModal(team)}
                                    disabled={sentRegists.length > 0} // 배열이 비어 있지 않으면 비활성화
                                >
                                    {sentRegists.length > 0 ? "신청 완료" : "게스팅 신청"}
                                </Button>


                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            {/* 오른쪽: 받은 게스팅 신청 목록 */}
            <Row className="w-50" style={{ maxHeight: "500px", overflowY: "auto", marginLeft: "20px" }}>
                <Col>
                    <h3>받은 게스팅 신청</h3>
                    <p>받은 신청을 수락하거나 거절하세요. 수락한다면 나머지 팀은 모두 거절됩니다</p>
                    <ListGroup>
                        {regists.map((request) => (
                            <ListGroup.Item key={request.registId}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{request.sendTeam.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            요청 날짜: {request.regDate}
                                        </Card.Subtitle>
                                        <Card.Text>상태: {request.status}</Card.Text>
                                        <Card.Text>주소: {request.houseRes.addr}</Card.Text>
                                        {/* 상태가 "대기중"일 때만 버튼 표시 */}
                                        {request.status === "대기 중" && (
                                            <>
                                                <Button
                                                    variant="success"
                                                    onClick={() => handleShowModal2(request, 'accept')}
                                                >
                                                    수락
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleShowModal2(request, 'reject')}
                                                    className="ml-2"
                                                >
                                                    거절
                                                </Button>
                                            </>
                                        )}
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>


            {/* 모달 */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>게스팅 신청</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    정말 <strong>{selectedTeam?.name}</strong> 팀에 신청하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleSubmitRequest}>
                        신청
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* 모달 */}
            <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header closeButton>
                    <Modal.Title>{action === 'accept' ? '수락' : '거절'} 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    정말로 이 요청을 {action === 'accept' ? '수락' : '거절'}하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal2}>
                        취소
                    </Button>
                    <Button
                        variant={action === 'accept' ? 'success' : 'danger'}
                        onClick={handleConfirmAction}
                    >
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Guesting;