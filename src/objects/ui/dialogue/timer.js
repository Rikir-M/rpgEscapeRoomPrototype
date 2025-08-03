import handleSceneChange from "../../../scenes/sceneHandler";

export function timer(timeToAct) {
	sessionStorage.setItem("allowDialogueClick", false);
	sessionStorage.setItem("canUseItems", true);

	const base = add([
		rect(width() - 140, 24, { radius: 4 }),
		anchor("top"),
		pos(width() / 2, 100),
		z(12),
		animate(),
	]);

	const timeline = add([
		rect(width() - 140, 24, { radius: 4 }),
		anchor("top"),
		pos(width() / 2, 100),
		z(13),
		color(GREEN),
		animate(),
	]);

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

		wait(timeToAct, () => {
			destroy(timeline);

			// handle base (hp bar holder) animation
			base.animate("scale", [vec2(1), vec2(1.25, 1), vec2(0, 1)], {
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
