import React, {useEffect} from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';

const Canvas = () => {
	const canvasRef = React.createRef();

	useEffect(() => {
		const ctx = canvasRef.current.getContext("2d");
		let prev = null;

		const mousedown = e => prev = Object.assign({}, e);
		canvasRef.current.addEventListener("mousedown", mousedown);

		const mousemove = e => {
			if(prev == null) return;

			ctx.beginPath();
			ctx.moveTo(prev.offsetX, prev.offsetY);
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();

			prev = e;
		};
		canvasRef.current.addEventListener("mousemove", mousemove);

		const mouseup = e => prev = null;
 		canvasRef.current.addEventListener("mouseup", mouseup);

		return () => {
			canvasRef.removeEventListener("mousedown", mousedown);
			canvasRef.removeEventListener("mousemove", mousemove);
			canvasRef.removeEventListener("mouseup",   mouseup);
		};
	});

	return <canvas ref={canvasRef} />
}

const Chat = () => <>
	<h1> new chat </h1>
	<div>
		<span> Chatlog </span>
	</div>
	<div className="box">
		<button> Quit </button>
		<div>
			<span>Field to draw</span>
			<Canvas />
		</div>
		<button> Send </button>
	</div>
</>;

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
