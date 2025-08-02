export function timer() {
	add([
		rect(width() - 200, 24, { radius: 4 }),
		anchor("top"),
		pos(width() / 2, 100),
		z(13),
		color(255, 0, 0),
	]);
	return add([
		rect(width() - 140, 24, { radius: 4 }),
		anchor("top"),
		pos(width() / 2, 100),
		z(12),
	]);
}
