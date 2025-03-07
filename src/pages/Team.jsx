import logo3 from "../assets/Logo3.png";
function Team() {
    return (
        <div>        
            <div className="logo-container">
                <img
                src={logo3}
                alt="Logo"
                className="mb-3"
                style={{ width: "240px", height: "auto" }}
                />
            </div>
        </div>
    );
}

export default Team;
