import kaplay from "kaplay";
import { inventory, inventoryItem, inventorySlot } from "./objects";
import startDialogueSystem from "./objects/ui/dialogue/dialogue";

sessionStorage.clear();
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
	sessionStorage.setItem("canUseItems", false);
	// #endregion

	// Loads all sprites
	loadSprite("rikir", "/sprites/rikir.png");
	loadSprite("jun", "/sprites/junAngy03.png");
	// loadSound("rikir_voice", "/sounds/rikir_voice.wav");
	// loadSound("jun_voice", "/sounds/jun_voice.wav");
	loadBitmapFont("happy", "/fonts/happy_28x36.png", 28, 36);

	// Define the characters data
	const characters = {
		rikir: {
			sprite: "rikir",
			name: "Rikir",
			// "sound": "rikir_voice",
			scale: "1",
		},
		jun: {
			sprite: "jun",
			name: "Jun",
			// "sound": "jun_voice",
			scale: "0.8",
		},
	};

	// Define the dialogue data [character, text, effects]
	const dialogs = [
		["rikir", "[default]Oh hey...[/default]"],
		["jun", "[default]Huh, what...?[/default]"],
		["jun", "[default]Wh- where am I?[/default]", "timer"],
		[
			"rikir",
			"[default]Um.. sorry, I know this is a lot but you're gonna be the main character for our game... for now...[/default]",
		],
		[
			"jun",
			"[surprised]HUH?! Main character![/surprised] [default]What are you talking about?[/default]",
			"shake",
		],
		[
			"rikir",
			"[default]Y-Yeah, you kind of woke up late, so we skipped the tutorial... Sorry about that.[/default]",
		],
		[
			"jun",
			"[surprised]Tutorial?![/surprised] [default]Wait, am I dreaming? Did I hit my head?[/default]",
			"shake",
		],
		[
			"rikir",
			"[default]Nope, fully awake. Probably. You'll figure it out. Maybe.[/default]",
		],
		["jun", "[default]This has to be a joke... Who even ARE you?[/default]"],
		[
			"rikir",
			"[default]Oh, I'm one of the developers, technically. Rikir, by the way. I'm also figuring things out.[/default]",
		],
		[
			"jun",
			"[default]Wait- you're the one making this game and YOU don't know what's going on?![/default]",
		],
		[
			"rikir",
			"[default]In my defense, the game jam theme hasn't been revealed yet. Soooo... we're kinda winging it.[/default]",
		],
		[
			"rikir",
			"[default]And, well... we.. haven't really coded anything yet. The room barely exists.[/default]",
		],
		[
			"rikir",
			"[default]Honestly, you're lucky I searched for a sprite for you and there's even a floor..[/default]",
		],
		["jun", "[default]Wha- wait, there could be *no* floor?![/default]"],
		["jun", "[default]You're joking, right? Right?[/default]"],
		[
			"rikir",
			"[default]Look, this is a game jam. We get 48 hours. Do you want polish or vibes?[/default]",
		],
		["jun", "[default]...I want to go home.[/default]"],
		[
			"rikir",
			"[default]No can do. You're stuck here until we get the game's theme and figure out what our game will be. Could be fantasy. Could be sci-fi. Could be-[/default]",
		],
		["jun", "[default]-'horror'? Please don't say horror-[/default]"],
		[
			"rikir",
			"[default]Anyway, in the meantime... feel free to pace dramatically and talk to yourself.[/default]",
		],
		[
			"jun",
			"[default]This is going to be the weirdest 48 hours of my life...[/default]",
		],
		[
			"rikir",
			"[default]Oh and, your name is Jun by the way. That's what the person who created your sprite calls you..[/default]",
		],
		["jun", "[default]...[/default]"],
	];

	startDialogueSystem(characters, dialogs);
});

k.go("intro");

export default k;
