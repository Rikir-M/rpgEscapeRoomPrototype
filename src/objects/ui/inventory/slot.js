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

	return ref.add([
		rect(64, 64, { radius: 4 }),
		anchor("center"),
		pos(x, y),
		outline(4),
		z(12),
	]);
}
