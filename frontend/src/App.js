import React, {createRef} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Canvas from './Canvas';
import Frontpage from './Frontpage';

const WS_HOST = process.env.WS_HOST || "127.0.0.1";
const WS_PORT = process.env.WS_PORT || "1337";

const initConnection = () => new WebSocket(`ws://${WS_HOST}:${WS_PORT}`);
const Chat = () => {
    const connection = initConnection();
	const canvasRef = createRef();
    const logRef = createRef();

    connection.onmessage = (message) => {

    };

	return <>
		<h1> new chat </h1>
		<div ref={logRef}>
			<span> Chatlog </span>
		</div>
		<div className="box">
			<button> Quit </button>
			<div>
				<Canvas ref={canvasRef} />
			</div>
			<button onClick={() => {
				const d = canvasRef.current.getImageData();
				connection.send(d);
				console.log(d);
			}}> Send </button>
		</div>
	</>;
};

const App = ({ history }) =>
	<div className="App">
		<Switch>
			<Route path="/new-chat" component={Chat} />
			<Route component={Frontpage} />
		</Switch>
	</div>;

export default App;
