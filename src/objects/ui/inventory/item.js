export function inventoryItem(ref, x, y, index, itemName) {
	if (itemName) {
		loadSprite(itemName, `/sprites/${itemName}.png`);
		sessionStorage.setItem(`slot${index}`, false);

		ref.add([
			sprite(itemName),
			scale(0.1, 0.1),
			anchor("center"),
			pos(x, y),
			z(13),
			`slot${index}`,
		]);
	}

	return;
}
