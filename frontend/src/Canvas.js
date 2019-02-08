import React, {useEffect, forwardRef, useImperativeHandle, createRef} from 'react';

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
			return ctx.canvas.toDataURL();
		}
	}));

	return <canvas ref={canvasRef} />
} );

export default Canvas;
