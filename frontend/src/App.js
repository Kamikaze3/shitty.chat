import React, {createRef} from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';
import Canvas from './Canvas';

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

const Frontpage = withRouter(({ history }) => <div className="Frontpage">
	<h1> Shitty.chat </h1>
	<p> Have a shitty chat with a stranger </p>
	<button onClick={() => { history.push('/new-chat') }}> Start a chat now </button>
</div>);

const App = ({ history }) =>
	<div className="App">
		<Switch>
			<Route path="/new-chat" component={Chat} />
			<Route component={Frontpage} />
		</Switch>
	</div>;

export default App;
