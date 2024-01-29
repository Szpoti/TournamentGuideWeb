import logo from "./chessQueen.png";
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Accordion from "react-bootstrap/Accordion";

function App() {
		/** @type {Player[]} */
	const [players, setPlayers] = useState([]);
	const [rounds, setRounds] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const parsedQueryString = queryString.parse(window.location.search);
        const adminKey = parsedQueryString.adminKey;

		fetch(`https://localhost:7059/Admin/login?apiKey=${adminKey}`)
		.then(response => response.json())
		.then(data => setIsAdmin(data))
		.catch(error => console.error('Error fetching data:', error));

        fetch('https://localhost:7059/Player/players')
            .then(response => response.json())
			.then(data => {
				const players = data.map(playerData => new Player(
					playerData.name,
					playerData.elo,
					playerData.id,
					playerData.gamesWon,
					playerData.gamesDrawed,
					playerData.gamesLost,
					playerData.gamesPlayed,
					playerData.points
				));
				players.sort((playerA, playerB) => playerB.points - playerA.points);
				setPlayers(players);})
            .catch(error => console.error('Error fetching data:', error));

		fetch('https://localhost:7059/Round/rounds')
			.then(response => response.json())
			.then(data => {
				const roundsData  = data.map(roundData => new Round(
					roundData.id,
					new PlayerInfo(roundData.player1.id, roundData.player1.colour),
					new PlayerInfo(roundData.player2.id, roundData.player2.colour),
					roundData.isDraw,
					roundData.matchLink,
					roundData.winnerColour,
					roundData.loserColour
				));
				setRounds(roundsData );
			})
			.catch(error => console.error('Error fetching rounds:', error));
    }, []); // Empty dependency array means this effect runs once on mount

	    // Function to get player's game details
		const getPlayerGames = (playerId) => {
			return rounds.filter(round => round.player1.id === playerId || round.player2.id === playerId)
						 .map((round, index) => {
							let playerInfo;
							let opponentInfo;
							if(round.player1.id === playerId)
							{
								playerInfo = round.player1;
								opponentInfo = round.player2;
							}
							else
							{
								playerInfo = round.player2;
								opponentInfo = round.player1;
							}

							let result = round.isDraw ? 'Draw' : (round.winnerColour === playerInfo.colour ? 'Won' : 'Lost');
							let playerColor = playerInfo.colour;
							let opponentName = players.find(opp => opp.id === opponentInfo.id).name;
							return (
								 <div key={index}>
									 <p>vs {opponentName} : {result} with {playerColor} - <a href={round.matchLink} target="_blank" rel="noopener noreferrer">Link</a></p>
								 </div>
							 );
						 });
		};

	return (
		<div className="App">
			<header className="App-header">
				{
					isAdmin && (
						<p>Logged in as Admin</p>
					)
				}
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<h1>
						To play, use <a href="https://lichess.org">Lichess</a>!
					</h1>
					<h1>Winning a game: 3 points</h1>
					<h1>Losing a game: 0 points</h1>
					<h1>Draw: 1 points each</h1>
				</div>
				<hr className="separator" />
				<div className="accordions">
					<Accordion>
					{players.map((player, index) => (
                        <Accordion.Item eventKey={index.toString()} key={player.id}>
                            <Accordion.Header>
								<div className="accordion-header">{player.name} (Elo: {player.elo}) - {player.points} points</div></Accordion.Header>
                            <Accordion.Body className="accordion-item">
                                {/* Additional details about the player can go here */}
								{getPlayerGames(player.id)}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
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


/**
 * @param {string} name - The name of the player.
 * @param {number} elo - The elo rating of the player.
 * @param {string} id - The unique identifier for the player.
 * @param {number} gamesWon - The number of games won by the player.
 * @param {number} gamesDrawed - The number of games drawn by the player.
 * @param {number} gamesLost - The number of games lost by the player.
 * @param {number} gamesPlayed - The total number of games played by the player.
 * @param {number} points - The total points earned by the player.
 **/
class Player {
    constructor(name, elo, id, gamesWon, gamesDrawed, gamesLost, gamesPlayed, points) {
        this.name = name || '';
        this.elo = elo || 0;
        this.id = id || '';
        this.gamesWon = gamesWon || 0;
        this.gamesDrawed = gamesDrawed || 0;
        this.gamesLost = gamesLost || 0;
		this.gamesPlayed = gamesPlayed || 0;
		this.points = points || 0;
    }
}

/**
 * @typedef {Object} PlayerInfo
 * @property {string} id - The unique identifier for the player.
 * @property {string} colour - The color representing the player.
 */
class PlayerInfo {
    constructor(id, colour) {
        this.id = id;
        this.colour = colour;
    }
}

/**
 * @param {string} id - The unique identifier for the round.
 * @param {PlayerInfo} player1 - Information about the first player.
 * @param {PlayerInfo} player2 - Information about the second player.
 * @param {boolean} isDraw - Indicates if the round is a draw.
 * @param {string} matchLink - The link to the match.
 * @param {string} winnerColour - The color representing the winner.
 * @param {string} loserColour - The color representing the loser.
 */
class Round {
    constructor(id, player1, player2, isDraw, matchLink, winnerColour, loserColour) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.isDraw = isDraw;
        this.matchLink = matchLink;
        this.winnerColour = winnerColour;
        this.loserColour = loserColour;
    }
}

export { App, NavbarMenu };
