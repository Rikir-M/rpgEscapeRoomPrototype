import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";

export default function callEnding4() {
	if (!sessionStorage.getItem("achievement_4")) {
		debug.log("Achievement: 'Into the future—And beyond'");
		sessionStorage.setItem(
			"achievement_4",
			JSON.stringify({
				title: "Into the future—And beyond",
				description: "You made it… but you're exhausted.",
			}),
		);
	}

	k.scene("ending_4", () => {
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
				"[default]This is the Ending Number 4. Amazing, innit?[/default]",
			],
			["jun", "[default]... what?[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("ENDING 4 CONTENTS HERE"),
			z(10),
		]);

		startDialogueSystem(characters, dialogs);
	});

	return k.go("ending_4");
}
