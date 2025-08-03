import kaplay from "kaplay";
import { inventory, inventoryItem, inventorySlot } from "./objects";
import startDialogueSystem from "./objects/ui/dialogue/dialogue";

// Simple dialogues with character avatars
const k = kaplay({
	background: "#607D8B",
	buttons: {
		next: {
			keyboard: "space",
			mouse: "left",
		},
		slot1: {
			keyboard: "1",
		},
		slot2: {
			keyboard: "2",
		},
		slot3: {
			keyboard: "3",
		},
	},
	font: "happy",
});

// #region
// + ---------------------------------------------- +
// Inventory
// + ---------------------------------------------- +
k.scene("intro", () => {
	const inventoryBar = inventory();
	for (let i = -2; i < 1; i++) {
		inventorySlot(
			inventoryBar,
			-40,
			(-1 * inventoryBar.height) / 6 + i * 64,
			i + 3,
		);
	}

	function createInventoryItems() {
		for (let i = -2; i < 1; i++) {
			switch (i + 3) {
				case 1: // plushie
					inventoryItem(
						inventoryBar,
						-40,
						(-1 * inventoryBar.height) / 6 + i * 64,
						i + 3,
						"squirrel",
					);
					break;
				case 2: // spaceship
					inventoryItem(
						inventoryBar,
						-40,
						(-1 * inventoryBar.height) / 6 + i * 64,
						i + 3,
						"spaceship",
					);
					break;
				case 3: // unsent message
					inventoryItem(
						inventoryBar,
						-40,
						(-1 * inventoryBar.height) / 6 + i * 64,
						i + 3,
						"letter-bomb",
					);
					break;
			}
		}
	}
	createInventoryItems();

	const itemDialogs = {
		1: [
			["narration", "[default]A well worn-out plush of a suqirrel.[/default]"],
			["narration", "[default]It used to be the warmth that comforted you during your worst times, that only friend who would play with you and also the unofficial therapist.[/default]"],
		],
		2: [
			["narration", "[default]A cheap plastic spaceship. It used to take you to many stars and helped you travel through lots of galaxies.[/default]"],
		],
		3: [
			["narration", "[default]An unsent message to...[/default]"],
			["narration", "[default]It doesn't matter. What matters is that it's showing your hesitation, guilt and regret.[/default]"],
		],
	};

	// Hide inventory bar initially and disable item clicks
	inventoryBar.hidden = true;
	sessionStorage.setItem("canUseItems", false);
	// #endregion

	// Loads all sprites
	loadSprite("jun", "/sprites/junAngy03.png");
	loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

	// Define the characters data
	const characters = {
		narration: {
			name: "Narration",
		},
		jun: {
			sprite: "jun",
			name: "Jun",
			// "sound": "jun_voice",
			scale: "0.7",
		},
	};

	// Define the dialogue data [character, text, effects]
	const dialogs = [
		["jun", "[default]...?[/default]"],
		["jun", "[surprised]!!![/surprised]", "shake"],
		["jun", "[default]Wh- where am I?[/default]"],
		["jun", "[default]Okay. Jun, don't panic.[/default]"],
		["jun", "[default]...Why would anyone panic waking up in a strange room?[/default]"],
		["narration", "[default]You look around the room and notice a digital clock above the only door of the room. But no number is shown.[/default]"],
		["jun", "[default]What is this, a game? An escape room?[/default]"],
		["jun", "[default]...Did I forget I signed up for a team-building exercise again?[/default]"],
		["narration", "[default]You feel the weight on your back and realize there's a backpack you hadn't noticed before.[/default]"],
		["narration", "[default]Curious, you unzip it slowly, the fabric creaking faintly.[/default]"],
		["narration", "[default]Inside, three objects come into view.[/default]"],
		["jun", "[default]...Huh. These...[/default]"],
		["narration", "[default]A worn-out plushie, a cheap plastic spaceship and a phone with an unsent message glowing faintly on the screen.[/default]", "inventoryOn"],
		["jun", "[default]...[/default]"],
		["jun", "[default]Why are these here? Is someone playing a joke?[/default]"],
		["narration", "[default]You hear a faint voice, no, a whisper.[/default]"],
		["jun", "[default]Wh- who's there?![/default]"],
		["narration", "[default]\"To escape here, you must decide what to keep and what to leave behind.\"[/default]"],
		["narration", "[default]\"You have 3 minutes. And the clock's ticking. Your choice will decide if you get out or stay trapped.\"[/default]"],
		["narration", "[default]The digital clock lights up and the timer starts.[/default]"],
		["jun", "[default]...[/default]", "timer"],
	];

	// Start intro dialogues, then enable inventory and clicks
	startDialogueSystem(characters, dialogs, inventoryBar, () => {
		sessionStorage.setItem("canUseItems", true);
		inventoryBar.hidden = false;
	});
});

k.go("intro");

export default k;
