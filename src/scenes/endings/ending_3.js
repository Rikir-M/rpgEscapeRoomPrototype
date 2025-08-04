import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";
import callMainMenu from "../mainMenu";

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
			text("Maybe someone's waiting, maybe not.", {
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

	return k.go("ending_3");
}
