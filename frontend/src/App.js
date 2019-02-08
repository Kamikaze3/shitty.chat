import React, {createRef} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Canvas from './Canvas';
import Frontpage from './Frontpage';

const Chat = () => {
	const canvasRef = createRef();

	return <>
		<h1> new chat </h1>
		<div>
			<span> Chatlog </span>
		</div>
		<div className="box">
			<button> Quit </button>
			<div>
				<Canvas ref={canvasRef} />
			</div>
			<button onClick={() => {
				const d = canvasRef.current.getImageData();	
				console.log("send", d);
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
