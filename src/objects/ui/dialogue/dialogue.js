import { timer } from "../dialogue/timer";

export default function startDialogueSystem(characters, dialogs, inventoryBar, onComplete) {
	let inventoryShown = false;
	// Some effects data
	const effects = {
		shake: () => {
			shake();
		},
		// setups a QTE for the player to make a choice
		timer: () => {
			timer(60); // change the duration of the timer here
		},
		// show inventory at a certain dialog
		inventoryOn: () => {
			if (inventoryShown) return;
			inventoryShown = true;
			inventoryBar.hidden = false;
		},
	};

	let curDialog = 0;
	let isTalking = false;

	// Text bubble
	const textbox = add([
		rect(width() - 140, 140, { radius: 4 }),
		anchor("center"),
		pos(center().x, height() - 100),
		outline(4),
		z(10),
		area(),
		"textbox",
	]);

	// Speaker name background box
	const speakerBox = add([
		rect(180, 40, { radius: 8 }),
		color(WHITE),
		pos(textbox.pos.sub(0, 100)),
		anchor("center"),
		z(10),
	]);

	// Speaker name text
	const speakerName = add([
		text("", {
			size: 24,
			align: "center",
		}),
		pos(speakerBox.pos),
		anchor("center"),
		color(BLACK),
		z(11),
	]);

	// Text
	const txt = add([
		text("", {
			size: 32,
			width: width() - 230,
			align: "center",
			styles: {
				default: {
					color: BLACK,
				},
				// a jump effect
				surprised: (idx) => ({
					color: Color.fromHex("#FF6F61"),
					scale: wave(1, 1.2, time() * 1 + idx),
					pos: vec2(0, wave(0, 4, time() * 10)),
				}),
			},
			transform: (idx) => {
				return {
					opacity: idx < txt.letterCount ? 1 : 0,
				};
			},
		}),
		pos(textbox.pos),
		anchor("center"),
		{
			letterCount: 0,
		},
		z(11),
	]);

	// Character avatar
	const avatar = add([
		anchor("botleft"),
		pos(30, height()),
		z(9),
	]);

	sessionStorage.setItem("allowDialogueClick", true);
	onClick("textbox", () => {
		if (sessionStorage.getItem("allowDialogueClick") !== "true") return;
		if (isTalking) {
			if (writing) {
				writing.cancel();
				writing = null;
			}
			txt.letterCount = txt.text.length;
			isTalking = false;
			return;
		}

		// Cycle through the dialogs
		curDialog++;
		if (curDialog >= dialogs.length) {
			if (onComplete) onComplete();
			return;
		}
		updateDialog();
	});

	// Update the on screen sprite & text
	function updateDialog() {
		const [char, dialog, eff] = dialogs[curDialog];
		const charData = characters[char] || {};
		const spriteName = charData.sprite;

		// Avatar handling
		if (spriteName) {
			avatar.use(sprite(spriteName));
			avatar.scale = charData.scale ?? 0.8;
			avatar.hidden = false;
		} else {
			avatar.hidden = true;
		}

		// Speaker name display
		if (char !== "narration" && charData.name) {
			speakerName.text = charData.name;
			speakerName.hidden = false;
			speakerBox.hidden = false;

			// Optional: dynamically adjust box width based on text
			const padding = 32;
			speakerBox.width = speakerName.text.length * 14 + padding;
		} else {
			speakerName.text = "";
			speakerName.hidden = true;
			speakerBox.hidden = true;
		}

		// Update the dialog text
		startWriting(dialog, char);

		if (eff) {
			effects[eff]();
		}
	}

	let writing = null;

	function startWriting(dialog) {
		isTalking = true;
		txt.letterCount = 0;
		txt.text = dialog;
		const len = txt.text.length;

		if (writing) writing.cancel();

		writing = loop(0.05, () => {
			txt.letterCount = Math.min(txt.letterCount + 1, len);
			// play(characters[char].sound, {
			//     volume: 0.2,
			// });

			if (txt.letterCount === len) {
				isTalking = false;
				writing.cancel();
			}
		});
	}

	// When the game finishes loading, the dialog will start updating
	onLoad(() => {
		updateDialog();
	});
}
