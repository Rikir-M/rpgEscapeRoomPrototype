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
		loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

		// Define the characters data
		const characters = {
			narration: {
				name: "Narration",
			},
		};

		const dialogs = [
			["narration", "[default]You carry the words you never said. Maybe it will be sent to its destination someday.[/default]"],
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
