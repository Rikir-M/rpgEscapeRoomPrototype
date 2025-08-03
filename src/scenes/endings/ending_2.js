import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";

export default function callEnding2() {
	if (!sessionStorage.getItem("achievement_2")) {
		debug.log("Achievement: 'Dream beyond four walls'");
		sessionStorage.setItem(
			"achievement_2",
			JSON.stringify({
				title: "Dream beyond four walls",
				description: "Never stop dreaming. Be happy.",
			}),
		);
	}

	k.scene("ending_2", () => {
		loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

		// Define the characters data
		const characters = {
			narration: {
				name: "Narration",
			},
		};

		const dialogs = [
			["narration", "[default]You chose to keep the cheap plastic spaceship, clutching it like the most valuable treasure.[/default]"],
			["narration", "[default]You may be trapped as a dull office worker, but your mind's already halfway to the stars.[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("ENDING 2 CONTENTS HERE"),
			z(10),
		]);

		startDialogueSystem(characters, dialogs);
	});

	return k.go("ending_2");
}
