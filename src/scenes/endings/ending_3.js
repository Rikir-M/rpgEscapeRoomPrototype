import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";

export default function callEnding3() {
	if (!sessionStorage.getItem("achievement_3")) {
		debug.log("Achievement: 'Sound of Silence'");
		sessionStorage.setItem(
			"achievement_3",
			JSON.stringify({
				title: "Sound of Silence",
				description: "Hello darkness, my old friend.",
			}),
		);
	}

	k.scene("ending_3", () => {
		// Loads all sprites
		loadSprite("rikir", "/sprites/rikir.png");
		loadSprite("jun", "/sprites/junAngy03.png");
		// loadSound("rikir_voice", "/sounds/rikir_voice.wav");
		// loadSound("jun_voice", "/sounds/jun_voice.wav");
		loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

		// Define the characters data
		const characters = {
			rikir: {
				sprite: "rikir",
				name: "Rikir",
				// "sound": "rikir_voice",
				scale: "1",
			},
			jun: {
				sprite: "jun",
				name: "Jun",
				// "sound": "jun_voice",
				scale: "0.8",
			},
		};

		const dialogs = [
			[
				"rikir",
				"[default]This is the Ending Number 3. Amazing, innit?[/default]",
			],
			["jun", "[default]... what?[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("ENDING 3 CONTENTS HERE"),
			z(10),
		]);

		startDialogueSystem(characters, dialogs);
	});

	return k.go("ending_3");
}
