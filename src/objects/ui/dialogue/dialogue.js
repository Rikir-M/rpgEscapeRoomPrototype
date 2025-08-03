import { timer } from "../dialogue/timer";

export default function startDialogueSystem(characters, dialogs) {
	// Some effects data
	const effects = {
		shake: () => {
			shake();
		},
		// setups a QTE for the player to make a choice
		timer: () => {
			timer(3); // change the duration of the timer here
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
	const avatar = add([anchor("center"), pos(center().sub(0, 50)), z(0)]);

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
		curDialog = (curDialog + 1) % dialogs.length;
		updateDialog();
	});

	// Update the on screen sprite & text
	function updateDialog() {
		const [char, dialog, eff] = dialogs[curDialog];

		// Use a new sprite component to replace the old one
		avatar.use(sprite(characters[char].sprite));
		avatar.scale = characters[char].scale ?? 0.8;
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
