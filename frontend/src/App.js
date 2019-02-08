import React, {createRef} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Canvas from './Canvas';
import Frontpage from './Frontpage';
import Chatlog from './Chatlog';

const WS_HOST = process.env.WS_HOST || "127.0.0.1";
const WS_PORT = process.env.WS_PORT || "1337";

const initConnection = () => new WebSocket(`ws://${WS_HOST}:${WS_PORT}`);
const Chat = () => {
	const connection = initConnection();
	const canvasRef = createRef();
	const logRef = createRef();

	connection.onmessage = message => {
		logRef.current.newMessage( message );
	};

	return <>
		<h1> new chat </h1>
		<div>
			<Chatlog ref={logRef} />
		</div>
		<div className="box">
			<button> Quit </button>
			<div>
				<Canvas ref={canvasRef} />
			</div>
			<button onClick={() => {
				const d = canvasRef.current.getImageData();
				connection.send(d);
				logRef.current.newMessage({ image: d });
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
