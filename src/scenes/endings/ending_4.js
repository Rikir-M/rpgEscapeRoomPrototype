import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";
import callMainMenu from "../mainMenu";

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
		loadSprite("jun", "/sprites/junAngy03.png");
		loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

		// Define the characters data
		const characters = {
			narration: {
				name: "Narration",
			},
		};

		const dialogs = [
			["narration", "[default]You can't let go. The door creaks open but not fully. You squeeze through, barely.[/default]"],
			["narration", "[default]Outside, you stumble forward, weighed down. You made it… but you're exhausted.[/default]"],
		];

		add([
			anchor("top"),
			pos(width() / 2, 100),
			text("Some things are just too important to leave behind. Maybe the burden is heavy. But at least it's yours.", {
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

	return k.go("ending_4");
}
