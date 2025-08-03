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
		loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

		// Define the characters data
		const characters = {
			narration: {
				name: "Narration",
			},
		};

		const dialogs = [
			["narration", "[default]You hug the worn-out plushie tight. Not long after, you start to feel the warmth.[/default]"],
			["narration", "[default]Maybe growing up isn't about letting go of comfort, but carrying it in your own way.[/default]"],
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
