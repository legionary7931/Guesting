import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Guesting() {
    const [teams, setTeams] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        const teamData = [
            {
                teamId: 1,
                name: "teamgogo",
                memberResList: [
                    { memberId: 1, name: "alex", intro: "hello my name is alex", gender: "male" },
                    { memberId: 2, name: "sac", intro: "hello my name is sac", gender: "male" },
                    { memberId: 3, name: "dam", intro: "hello my name is dam", gender: "male" },
                    { memberId: 4, name: "was", intro: "hello my name is was", gender: "female" },
                ],
            },
            {
                teamId: 2,
                name: "teamalpha",
                memberResList: [
                    { memberId: 1, name: "lily", intro: "hello, I'm lily", gender: "female" },
                    { memberId: 2, name: "john", intro: "hello, I'm john", gender: "male" },
                    { memberId: 3, name: "mark", intro: "hello, I'm mark", gender: "male" },
                    { memberId: 4, name: "zara", intro: "hello, I'm zara", gender: "female" },
                ],
            },
            {
                teamId: 3,
                name: "teamvision",
                memberResList: [
                    { memberId: 1, name: "emma", intro: "hello, I'm emma", gender: "female" },
                    { memberId: 2, name: "robert", intro: "hello, I'm robert", gender: "male" },
                    { memberId: 3, name: "ben", intro: "hello, I'm ben", gender: "male" },
                    { memberId: 4, name: "lucy", intro: "hello, I'm lucy", gender: "female" },
                ],
            },
            {
                teamId: 4,
                name: "teamblue",
                memberResList: [
                    { memberId: 1, name: "kevin", intro: "hello, I'm kevin", gender: "male" },
                    { memberId: 2, name: "jane", intro: "hello, I'm jane", gender: "female" },
                    { memberId: 3, name: "tina", intro: "hello, I'm tina", gender: "female" },
                    { memberId: 4, name: "jason", intro: "hello, I'm jason", gender: "male" },
                ],
            },
        ];

        const receivedData = [
            {
                registId: 1,
                sendTeam: {
                    teamId: 1,
                    name: "teamgogo",
                    memberResList: [
                        { memberId: 1, name: "alex", intro: "hello my name is alex", gender: "male" },
                        { memberId: 2, name: "sac", intro: "hello my name is sac", gender: "male" },
                        { memberId: 3, name: "dam", intro: "hello my name is dam", gender: "male" },
                        { memberId: 4, name: "was", intro: "hello my name is was", gender: "female" },
                    ],
                },
                regdate: "2025-03-05T14:00:00",
                status: "대기중",
                houseRes: { houseId: 1, name: "playhouse", addr: "서울시강남구" },
            },
            {
                registId: 2,
                sendTeam: {
                    teamId: 2,
                    name: "teamalpha",
                    memberResList: [
                        { memberId: 1, name: "lily", intro: "hello, I'm lily", gender: "female" },
                        { memberId: 2, name: "john", intro: "hello, I'm john", gender: "male" },
                        { memberId: 3, name: "mark", intro: "hello, I'm mark", gender: "male" },
                        { memberId: 4, name: "zara", intro: "hello, I'm zara", gender: "female" },
                    ],
                },
                regdate: "2025-03-06T10:30:00",
                status: "대기중",
                houseRes: { houseId: 2, name: "dreamhouse", addr: "서울시종로구" },
            },
            {
                registId: 3,
                sendTeam: {
                    teamId: 3,
                    name: "teamvision",
                    memberResList: [
                        { memberId: 1, name: "emma", intro: "hello, I'm emma", gender: "female" },
                        { memberId: 2, name: "robert", intro: "hello, I'm robert", gender: "male" },
                        { memberId: 3, name: "ben", intro: "hello, I'm ben", gender: "male" },
                        { memberId: 4, name: "lucy", intro: "hello, I'm lucy", gender: "female" },
                    ],
                },
                regdate: "2025-03-07T16:20:00",
                status: "대기중",
                houseRes: { houseId: 3, name: "sunnyhouse", addr: "서울시서초구" },
            },
            {
                registId: 4,
                sendTeam: {
                    teamId: 4,
                    name: "teamblue",
                    memberResList: [
                        { memberId: 1, name: "kevin", intro: "hello, I'm kevin", gender: "male" },
                        { memberId: 2, name: "jane", intro: "hello, I'm jane", gender: "female" },
                        { memberId: 3, name: "tina", intro: "hello, I'm tina", gender: "female" },
                        { memberId: 4, name: "jason", intro: "hello, I'm jason", gender: "male" },
                    ],
                },
                regdate: "2025-03-08T11:45:00",
                status: "대기중",
                houseRes: { houseId: 4, name: "bluehouse", addr: "서울시강서구" },
            },
        ];

        setTeams(teamData);
        setReceivedRequests(receivedData);
    }, []);

    const handleShowModal = (team) => {
        setSelectedTeam(team);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTeam(null);
    };

    const handleSubmitRequest = () => {
        // 여기서 신청 처리를 할 수 있습니다.
        console.log(`${selectedTeam.name} 팀에 신청했습니다.`);
        handleCloseModal();
    };

    return (
        <Container fluid className="d-flex">
            {/* 왼쪽: 팀 목록 */}
            <Row className="w-50" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <Col>
                    <h3>팀 목록</h3>
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
                                <Button variant="primary" onClick={() => handleShowModal(team)}>
                                    게스팅 신청
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
                    <ListGroup>
                        {receivedRequests.map((request) => (
                            <ListGroup.Item key={request.registId}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{request.sendTeam.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            요청 날짜: {request.regdate}
                                        </Card.Subtitle>
                                        <Card.Text>상태: {request.status}</Card.Text>
                                        <Card.Text>주소: {request.houseRes.addr}</Card.Text>
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
        </Container>
    );
}

export default Guesting;