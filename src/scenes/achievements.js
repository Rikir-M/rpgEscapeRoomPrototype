import k from "../main";
import callMainMenu from "./mainMenu";

export default function callAchievements() {
	k.scene("achievements", () => {
		if (!sessionStorage.getItem("achievement_6")) {
			debug.log("Achievement: 'An unnecessary feat.'");
			sessionStorage.setItem(
				"achievement_6",
				JSON.stringify({
					title: "An unnecessary feat",
					description: "You opened the Achievement menu. That's it.",
				}),
			);
		}

		// make list
		for (let i = 1; i <= 6; i++) {
			const title = add([
				text(
					sessionStorage.getItem(`achievement_${i}`)
						? JSON.parse(sessionStorage.getItem(`achievement_${i}`)).title
						: "---",
				),
				pos(width() / 2, height() / 7 + i * 100),
				anchor("top"),
			]);
			title.add([
				text(
					sessionStorage.getItem(`achievement_${i}`)
						? JSON.parse(sessionStorage.getItem(`achievement_${i}`)).description
						: "You have not unlocked this yet.",
					{
						size: 18,
					},
				),
				pos(0, 42),
				anchor("top"),
			]);
		}

		// return button
		add([
			text("Back", { size: 26 }),
			anchor("top"),
			pos(width() / 5, 100),
			area(),
			"return",
		]);

		onClick("return", () => {
			callMainMenu();
		});

		// title
		loadSprite("bottle", "/sprites/nectar.png");
		const BGs = ["#8465ec", "#873e84", "#c97373", "#5ba675"];
		const tileSize = 90;
		const tilesSpeed = 60; // px per second
		let tilesOffset = 0; // current offset over time

		onDraw(() => {
			lerpBackgroundColor(BGs);

			// Update tiles offset each frame before drawing the pattern
			// Modulo (%) wraps tileOffset to be between 0 and tileSize,
			// instead of increasing number yet keeping smooth loop
			tilesOffset = (tilesOffset + tilesSpeed * dt()) % tileSize;
			drawPattern();
		});

		const logo = add([
			text("Achievements yay :)"),
			pos(width() / 2, 100),
			anchor("top"),
			scale(1),
			rotate(0),
			animate({ relative: true }),
		]);

		// Animate properties easily thanks to animate() comp
		logo.animate("pos", [vec2(0, -50), vec2(0), vec2(0, -50)], {
			duration: 5,
			easing: easings.easeInOutQuad,
		});
		logo.animate("scale", [vec2(1), vec2(1.1), vec2(1)], {
			duration: 2.5,
			easing: easings.easeInOutQuad,
		});
		logo.animate("angle", [2, -2], {
			duration: 1.25,
			direction: "ping-pong",
			easing: easings.easeInOutQuad,
		});
		logo.animation.seek(2.5); // starts at the bottom and 0 angle

		// Loops BGs[] smoothly using lerp and modulo (%) to wrap from last to first
		// over time, used in onDraw()
		function lerpBackgroundColor(BGs, speed = 0.3) {
			const t = time() * speed;
			const i = Math.floor(t) % BGs.length;
			setBackground(
				lerp(
					rgb(BGs[i]),
					rgb(BGs[(i + 1) % BGs.length]),
					t % 1, // normalized progress between each color index
				),
			);
		}

		// Draws background pattern, used in onDraw()
		function drawPattern() {
			// Create rows/cols slightly larger than screen for seamless pattern scrolling
			for (let y = -tileSize; y < Math.ceil(height() / tileSize) + 2; y++) {
				for (let x = -tileSize; x < Math.ceil(width() / tileSize) + 2; x++) {
					// Draw tile only in even cells
					if ((x + y) % 2 === 0) {
						drawSprite({
							sprite: "bottle",
							anchor: "center",
							height: tileSize,
							// Set pos of tile in grid cell of tileSize
							// Apply offset, wrapped to [0, tileSize] using modulo (%)
							pos: vec2(
								x * tileSize - (tilesOffset % tileSize), // negative scrolls left
								y * tileSize + (tilesOffset % tileSize), // positive scrolls down
							),
							color: BLACK,
							opacity: 0.1,
						});
					}
				}
			}
		}
	});

	return k.go("achievements");
}
// callAchievements();
