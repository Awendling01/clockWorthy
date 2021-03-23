import React, { useEffect, useState } from "react";

enum TimerState {
	CLEARED, //Start
	RUNNING, //Stop, Lap
	STOPPED, //Start, Clear
}

const timerPrecision: number = 1; //in ms

// const formatTime = (time: number) => {
// 	const minutes = time / 60000;
// 	const seconds = time / 1000 - minutes * 60;
// 	const miliseconds = time - minutes * 60000 - seconds * 1000;
// 	return `${minutes >= 1 ? minutes.toFixed(0) + ":" : ""}${
// 		seconds >= 1 ? seconds.toFixed(0) + ":" : ""
// 	}${miliseconds}`;
// };

const App = () => {
	const [timer, setTimer] = useState<number>(0);

	const [laps, setLaps] = useState<number[]>([]);

	//TimerState.CLEARED === 0 === TimerState["CLEARED"]
	const [timerState, setTimerState] = useState<TimerState>(
		TimerState["CLEARED"]
	);

	const onStart = () => {
		setTimerState(TimerState["RUNNING"]);
	};

	const onStop = () => {
		setTimerState(TimerState["STOPPED"]);
	};

	const onClear = () => {
		setTimerState(TimerState["CLEARED"]);
		setTimer(0);
		setLaps([]);
	};

	const onLap = () => {
		setLaps([...laps, timer]);
	};

	const incrementTimer = () => {
		if (timerState === TimerState["RUNNING"]) {
			setTimer(timer + 1);
		}
	};

	useEffect(() => {
		if (timerState === TimerState["RUNNING"]) {
			//This function executes a callback after a specified amount of time.
			setTimeout(() => {
				incrementTimer();
			}, timerPrecision);
		}
	}, [timerState, timer]);

	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div>{timer}</div>
			<div>
				{timerState === TimerState.CLEARED ? (
					<button onClick={onStart}>Start</button>
				) : null}
				{timerState === TimerState.RUNNING ? (
					<React.Fragment>
						<button onClick={onStop}>Stop</button>
						<button onClick={onLap}>Lap</button>
					</React.Fragment>
				) : null}
				{timerState === TimerState.STOPPED ? (
					<button onClick={onClear}>Clear</button>
				) : null}
			</div>
			<div>
				{laps.map((lap, lapIndex) => {
					return <div key={`${lap}${lapIndex}`}>{lap}</div>;
				})}
			</div>
		</div>
	);
};

export default App;
