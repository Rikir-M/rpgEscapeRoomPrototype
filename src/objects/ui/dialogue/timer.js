import handleSceneChange from "../../../scenes/sceneHandler";

export function timer(timeToAct) {
	sessionStorage.setItem("allowDialogueClick", false);
	sessionStorage.setItem("canUseItems", true);

	const base = add([
		rect(width() - 140, 24, { radius: 4 }),
		anchor("top"),
		pos(width() / 2, 100),
		z(5),
		animate(),
	]);

	const timeline = add([
		rect(width() - 140, 24, { radius: 4 }),
		anchor("top"),
		pos(width() / 2, 100),
		z(6),
		color(GREEN),
		animate(),
	]);

	// Helper to format time as MM:SS
	const formatTime = (seconds) => {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, "0")}`;
	};

	const timeText = add([
		text(formatTime(timeToAct), {
			size: 16,
		}),
		anchor("center"),
		pos(width() / 2, 112),
		z(7),
		color(BLACK),
	]);

	// Animate base and timeline entry
	base.animate("scale", [vec2(0, 1), vec2(1, 1)], {
		duration: 1,
		loops: 1,
	});
	timeline.animate("scale", [vec2(0, 1), vec2(1, 1)], {
		duration: 1,
		loops: 1,
	});

	wait(1, () => {
		timeline.animate("scale", [vec2(1.05, 1), vec2(0, 1)], {
			duration: timeToAct,
			loops: 1,
		});
		timeline.animate("color", [GREEN, YELLOW, RED], {
			duration: timeToAct,
			direction: "forward",
			loops: 1,
		});

		let remainingTime = timeToAct;
		const timerInterval = loop(1, () => {
			remainingTime--;
			if (remainingTime <= 0) {
				timerInterval.cancel();
			}
			timeText.text = formatTime(remainingTime);
		});

		wait(timeToAct, () => {
			destroy(timeline);
			destroy(timeText);

			// handle base (hp bar holder) animation
			base.animate("scale", [vec2(1), vec2(1.05, 1), vec2(0, 1)], {
				duration: 1,
				direction: "forward",
			});

			sessionStorage.setItem("allowDialogueClick", true);
			sessionStorage.setItem("canUseItems", false);

			wait(1, () => {
				destroy(base);
				handleSceneChange();
			});
		});
	});

	return;
}
