import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";
import callMainMenu from "../mainMenu";

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
		loadSprite("jun", "/sprites/junAngy03.png");
		loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

		// Define the characters data
		const characters = {
			narration: {
				name: "Narration",
			},
		};

		const dialogs = [
			["narration", "[default]They matter. They always will. But you've carried them long enough.[/default]"],
			["narration", "[default]You take a breath… and leave them behind not because they were weight, but because you're ready to walk without them.[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("Guess you've still got space to fill.", {
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

	return k.go("ending_2");
}
