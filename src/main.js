import kaplay from "kaplay";
import { inventory, inventoryItem, inventorySlot } from "./objects";
import startDialogueSystem from "./objects/ui/dialogue/dialogue";

const k = kaplay({
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
export const itemDescriptions = {
	1: "A well worn-out plush of a suqirrel. It used to be the warmth that comforted you during your worst times, that only friend who would play with you and also the unofficial therapist.",
	2: "A cheap plastic spaceship that fueled your childhood adventures. It used to take you to many stars and helped you travel through lots of galaxies.",
	3: "An unsent letter... never delivered, filled with hesitation, guilt and regret.",
};

k.scene("intro", () => {
	setBackground(rgb(40, 40, 50));

	// fade from black
	const fadeOverlay = add([
		rect(width(), height()),
		pos(0, 0),
		color(0, 0, 0),
		opacity(1),
		z(1000),
		"fade-overlay",
	]);

	fadeOverlay.onUpdate(() => {
		if (fadeOverlay.opacity > 0) {
			fadeOverlay.opacity -= dt() * 0.25;
		}
	});

	// Draw the door
	const doorWidth = width() * 0.2;
	const doorHeight = height() * 0.8;
	const doorX = (width() - doorWidth) / 2;
	const doorY = height() - doorHeight - height() * 0.1;

	// Door frame
	add([
		rect(doorWidth + 16, doorHeight + 16, { radius: 8 }),
		pos(doorX - 8, doorY - 8),
		color(30, 30, 35),
		z(0),
	]);

	// Main door body
	const door = add([
		rect(doorWidth, doorHeight, { radius: 6 }),
		pos(doorX, doorY),
		color(70, 70, 75),
		z(1),
		"door",
	]);

	// Door panels: two vertical rectangles with some margin for depth
	const panelMarginX = doorWidth * 0.1;
	const panelMarginY = doorHeight * 0.07;
	const panelWidth = doorWidth - panelMarginX * 2;
	const panelHeight = (doorHeight - panelMarginY * 3) / 2;

	add([
		rect(panelWidth, panelHeight, { radius: 4 }),
		pos(doorX + panelMarginX, doorY + panelMarginY),
		color(90, 90, 100),
		z(2),
	]);

	add([
		rect(panelWidth, panelHeight, { radius: 4 }),
		pos(doorX + panelMarginX, doorY + panelMarginY * 2 + panelHeight),
		color(90, 90, 100),
		z(2),
	]);

	// Door knob
	add([
		circle(8),
		pos(door.pos.x + doorWidth - 24, door.pos.y + doorHeight / 2),
		color(210, 210, 210),
		z(3),
	]);

	// Subtle shadow on the left edge of the door for depth
	add([
		rect(8, doorHeight, { radius: 6 }),
		pos(doorX - 8, doorY),
		color(20, 20, 25),
		opacity(0.6),
		z(4),
	]);

	// Draw the clock
	const clockWidth = doorWidth * 0.5;
	const clockHeight = 40;
	const clockX = doorX + (doorWidth - clockWidth) / 2;
	const clockY = doorY - clockHeight - 20;

	// Clock frame
	add([
		rect(clockWidth, clockHeight, { radius: 6 }),
		pos(clockX, clockY),
		color(20, 20, 25),
		opacity(0.9),
		z(2),
	]);

	add([
		text("--:--", {
			size: 32,
			font: "happy",
			width: clockWidth,
			letterSpacing: 4,
			align: "center",
		}),
		pos(clockX, clockY + 6),
		color(200, 50, 50),
		z(3),
	]);


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

	// Create a floating modal box (initially hidden)
	const modal = add([
		rect(300, 200, { radius: 8 }),
		pos(200, 200),
		color(0, 0, 0),
		opacity(0.8),
		z(100),
		"modal-box",
	]);
	modal.hidden = true;

	const modalText = add([
		text("", {
			size: 16,
			font: "happy",
			width: 280,
		}),
		pos(210, 210),
		color(255, 255, 255),
		z(101),
		"modal-text",
	]);
	modalText.hidden = true;

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
		["narration", "[default]A worn-out plushie, a cheap plastic spaceship and an unsent letter slightly crumbled.[/default]", "inventoryOn"],
		["jun", "[default]...[/default]"],
		["jun", "[default]Why are these here? Is someone playing a joke?[/default]"],
		["narration", "[default]You hear a faint voice, no, a whisper.[/default]"],
		["jun", "[default]Wh- who's there?![/default]"],
		["narration", "[default]\"To escape here, you must decide what to keep and what to leave behind.\"[/default]"],
		["narration", "[default]\"You have 1 minute to make your choice. And the clock's ticking. Your choice will decide if you get out or stay trapped.\"[/default]"],
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
