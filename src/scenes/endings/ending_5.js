import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";

export default function callEnding5() {
	if (!sessionStorage.getItem("achievement_5")) {
		debug.log("Achievement: 'A shadow of the past'");
		sessionStorage.setItem(
			"achievement_5",
			JSON.stringify({
				title: "A shadow of the past",
				description: "You are ready to walk without them.",
			}),
		);
	}

	k.scene("ending_2", () => {
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
				"[default]This is the Ending Number 5. Amazing, innit?[/default]",
			],
			["jun", "[default]... what?[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("ENDING 5 CONTENTS HERE"),
			z(10),
		]);

		startDialogueSystem(characters, dialogs);
	});

	return k.go("ending_2");
}
