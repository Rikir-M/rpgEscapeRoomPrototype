import { itemDescriptions } from "../../../main";

export function inventorySlot(ref, x, y, index) {
	ref.add([
		anchor("left"),
		pos(x + 20, y + 20),
		text(index, {
			size: 16, // 48 pixels tall
			width: 320, // it'll wrap to next line when width exceeds this value
			font: "arial", // specify any font you loaded or browser built-in
			transform: {
				color: Color.fromHex("212121"),
			},
		}),
		z(13),
	]);

	onClick(`item-slot${index}`, (ref) => {
		const canUse = sessionStorage.getItem("canUseItems") === "true";
		if (!canUse) return;

		const state = sessionStorage.getItem(`slot${index}`) === "false";

		if (state) {
			ref.use(color(110, 231, 183));
			sessionStorage.setItem(`slot${index}`, true);
		} else {
			ref.use(color(255, 255, 255));
			sessionStorage.setItem(`slot${index}`, false);
		}
	});

	onHover(`item-slot${index}`, () => {
		const modalBox = get("modal-box")[0];
		const modalTextBox = get("modal-text")[0];

		if (!modalBox || !modalTextBox) return;

		modalTextBox.text = itemDescriptions[index];
		modalBox.hidden = false;
		modalTextBox.hidden = false;

		const modalWidth = 300;
		const padding = 30;

		wait(0, () => {
			const height = modalTextBox.height + padding;
			modalBox.width = modalWidth;
			modalBox.height = height;

			// Position modal near mouse cursor with some offsets
			const mpos = mousePos();
			const offsetX = 50;
			const offsetY = 8;

			modalBox.pos = vec2(mpos.x - offsetX - modalWidth, mpos.y + offsetY);
			modalTextBox.pos = vec2(mpos.x - offsetX - modalWidth + 10, mpos.y + offsetY + 10);
		});
	});

	onHoverEnd(`item-slot${index}`, () => {
		const modalBox = get("modal-box")[0];
		const modalTextBox = get("modal-text")[0];

		if (!modalBox || !modalTextBox) return;

		modalBox.hidden = true;
		modalTextBox.hidden = true;
	});

	return ref.add([
		rect(64, 64, { radius: 4 }),
		anchor("center"),
		pos(x, y),
		outline(4),
		z(12),
		area(),
		`item-slot${index}`,
	]);
}
