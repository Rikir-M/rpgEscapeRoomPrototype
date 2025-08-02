export const inventory = () => {
	return add([
		rect(0, 0, { radius: 4 }),
		anchor("center"),
		pos(width(), height() / 2 - 60),
		outline(4),
		z(11),
	]);
};
