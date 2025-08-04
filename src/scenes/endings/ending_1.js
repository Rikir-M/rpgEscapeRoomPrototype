import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";
import callMainMenu from "../mainMenu";

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
			text("Some comforts aren't childish. They're just soft reminders that you survived.", {
				size: 20,
				width: width() / 3,
				font: "happy",
				letterSpacing: 4,
				align: "center",
			}),
			z(10),
		]);

		const backButton = add([
			text("Back to Main Menu", {
				size: 24,
				align: "center",
			}),
			anchor("center"),
			pos(center()),
			area(),
			outline(4),
			color(WHITE),
			z(20),
			"back-button",
		]);
		backButton.hidden = true;

		onClick("back-button", () => {
			callMainMenu();
		});

		startDialogueSystem(characters, dialogs, null, () => {
			backButton.hidden = false;
		});
	});

	return k.go("ending_1");
}
