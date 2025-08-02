export function inventoryItem(ref, x, y, index, itemName) {
	if (itemName) {
		loadSprite(itemName, `/sprites/${itemName}.png`);

		ref.add([
			sprite(itemName),
			scale(0.1, 0.1),
			anchor("center"),
			pos(x, y),
			z(13),
		]);

		ref.onButtonPress(`slot${index}`, () => {
			sessionStorage.setItem(`slot${index}`, `Coming from index: ${index}`);
		});
	}

	return ref.add([
		rect(64, 64, { radius: 4 }),
		anchor("center"),
		pos(x, y),
		outline(4),
		z(12),
	]);
}
