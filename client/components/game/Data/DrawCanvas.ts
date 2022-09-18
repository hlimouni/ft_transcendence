import { Data } from "./Data";

export function drawGame(context: object, data: Data) {
	drawRect(
		0,
		0,
		data.get_Width(),
		data.get_Height(),
		data.get_mapColor(),
		context
	);
	drawBorder(
		0,
		0,
		data.get_Width(),
		0,
		data.get_borderColor(),
		data.get_borderHeight(),
		context
	);
	drawBorder(
		0,
		data.get_Height(),
		data.get_Width(),
		data.get_Height(),
		data.get_borderColor(),
		data.get_borderHeight(),
		context
	);
	drawSeparator(
		data.get_Trace_X(),
		data.get_Trace_Y(),
		data.get_Trace_Width(),
		data.get_Trace_Height(),
		data.get_traceHeight(),
		data.get_traceColor(),
		context,
		data.get_Height()
	);
	drawRect(
		data.get_Left_Pddle_X(),
		data.get_PddleLeft_Y(),
		data.get_Paddle_Width(),
		data.get_Paddle_Height(),
		data.get_paddleColor(),
		context
	);
	drawRect(
		data.get_Right_Pddle_X(),
		data.get_PddleRight_Y(),
		data.get_Paddle_Width(),
		data.get_Paddle_Height(),
		data.get_paddleColor(),
		context
	);
	DrawCircle(
		data.get_Ball_X(),
		data.get_Ball_Y(),
		data.get_Ball_Radius(),
		data.get_ballColor(),
		context
	);
}

function drawRect(
	x: number,
	y: number,
	w: number,
	h: number,
	color: string,
	context: any
) {
	context.beginPath();
	context.fillStyle = color;
	context.fillRect(x, y, w, h);
}

export function DrawCircle(
	x: number,
	y: number,
	r: number,
	color: string,
	context: any
) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.closePath();
	context.fill();
}

function drawBorder(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color: string,
	borderHeight: number,
	context: any
) {
	context.strokeStyle = color;
	context.lineWidth = borderHeight;
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}

function drawSeparator(
	x: number,
	y: number,
	w: number,
	h: number,
	borderHeight: number,
	color: string,
	context: object,
	cHeight: number
) {
	for (
		let index = borderHeight;
		index < cHeight - borderHeight;
		index += borderHeight
	) {
		drawRect(x, y + index, w, h, color, context);
	}
}
