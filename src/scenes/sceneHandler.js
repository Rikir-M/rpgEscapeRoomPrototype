import callEnding1 from "./endings/ending_1";
import callEnding2 from "./endings/ending_2";
import callEnding3 from "./endings/ending_3";
import callEnding4 from "./endings/ending_4";
import callEnding5 from "./endings/ending_5";

export default function handleSceneChange() {
	const slot1 = sessionStorage.getItem("slot1") === "true";
	const slot2 = sessionStorage.getItem("slot2") === "true";
	const slot3 = sessionStorage.getItem("slot3") === "true";

	// ENDING 1 - plushie
	if (slot1 && !slot2 && !slot3) {
		callEnding1();
	}
	// ENDING 2 - plastic spaceship
	if (!slot1 && slot2 && !slot3) {
		callEnding2();
	}
	// ENDING 3 - unsent message
	if (!slot1 && !slot2 && slot3) {
		callEnding3();
	}
	// ENDING 4 - you chose to keep more than one
	if (
		(slot1 && slot2) ||
		(slot1 && slot3) ||
		(slot2 && slot3) ||
		(slot1 && slot2 && slot3)
	) {
		callEnding4();
	}
	// ENDING 5 - you chose to leave everything behind
	if (!slot1 && !slot2 && !slot3) {
		callEnding5();
	}
}
