import React, {useEffect, forwardRef, useImperativeHandle, createRef} from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';

const Canvas = forwardRef( ({ getImageData }, ref) => {
	const canvasRef = createRef();
	let ctx;

	useEffect(() => {
		ctx = canvasRef.current.getContext("2d");
		ctx.canvas.width = canvasRef.current.parentElement.scrollWidth;
		ctx.canvas.height = canvasRef.current.parentElement.scrollHeight;
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

	useImperativeHandle(ref, () => ({
		getImageData() {
			return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}));

	return <canvas ref={canvasRef} />
} );

const Chat = () => {
	const canvasRef = React.createRef();

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
