import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";

export default function callEnding1() {
	if (!sessionStorage.getItem("achievement_1")) {
		debug.log("Achievement: 'The small things in life'");
		sessionStorage.setItem(
			"achievement_1",
			JSON.stringify({
				title: "The small things in life",
				description: "You chose warmth over everything else.",
			}),
		);
	}

	k.scene("ending_1", () => {
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
				"[default]This is the Ending Number 1. Amazing, innit?[/default]",
			],
			["jun", "[default]... what?[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("ENDING 1 CONTENTS HERE"),
			z(10),
		]);

		startDialogueSystem(characters, dialogs);
	});

	return k.go("ending_1");
}
