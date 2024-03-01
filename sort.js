const fs = require("fs");

const words = fs.readFileSync("./words-it.txt").toString().split("\n").sort()

let w = [];

for (const e of words) {
	if (!w.includes(e) && e !== "") {
		w.push(e)
	}
}

fs.writeFileSync("./words-it.txt", w.join("\n"))