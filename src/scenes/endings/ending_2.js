import k from "../../main";
import startDialogueSystem from "../../objects/ui/dialogue/dialogue";
import callMainMenu from "../mainMenu";

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
			text("Even when you were trapped in this room, your mind still rockets beyond these walls.", {
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
