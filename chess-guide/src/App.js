import logo from "./chessQueen.png";
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Accordion from "react-bootstrap/Accordion";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<h1>
						To play, use <a href="https://lichess.org">Lichess</a>!
					</h1>
					<h1>Winning a game: 3 points</h1>
					<h1>Losing a game: 0 points</h1>
					<h1>Draw: 1 points each</h1>
				</div>
				<hr class="separator" />
				<div class="accordions">
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Szpoti - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Dani - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>Clement - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3">
							<Accordion.Header>Roland - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="4">
							<Accordion.Header>Marnix - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="5">
							<Accordion.Header>Thib - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="6">
							<Accordion.Header>David - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="7">
							<Accordion.Header>Adam - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="8">
							<Accordion.Header>Rafe - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="9">
							<Accordion.Header>Max - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="10">
							<Accordion.Header>Szabolcs - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="11">
							<Accordion.Header>Lucas - 0 points</Accordion.Header>
							<Accordion.Body></Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

function NavbarMenu() {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

class Player {
	constructor(name, elo) {
		this.name = name;
		this.elo = elo;
	}
}

export { App, NavbarMenu };
