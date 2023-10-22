// ==UserScript==
// @name         Assistente Skribbl
// @version      1
// @grant        none
// @match        https://skribbl.io/*
// @description  Un assistente per il gioco di Skribbl.io
// ==/UserScript==

(async() => {
	"use strict";

	function e() {
		let e = "";
		return document.querySelectorAll(".hint").forEach(t => {
			"" === t.innerText && (e += " "), e += t.innerText
		}), e
	}
	let t, o = {};
	const n = document.querySelector(".chat-container>form>input"),
		r = document.querySelector(".chat-container>form");
	let s, a, l = "";
	const i = "Type to highlight hints.",
		c = e => {
			const t = n.value;
			n.value = e.target.innerHTML, r.dispatchEvent(new Event("submit", {
				bubbles: !0,
				cancelable: !0
			})), n.value = t, d()
		},
		d = (o, r = !1) => {
			let s = e().replace(/_/g, "[^ ]");
			s = "^" + s + "$", s = new RegExp(s, "g");
			let l = [];
			for (const e of t) {
				if (l.length >= 100) break;
				s.test(e) && l.push(e)
			}
			if (0 == l.length) return void(a.innerHTML = '<span style="color:black">Sorry, no hints available!</span>');
			a.innerHTML = '<span style="color:black">Click on a hint to submit it: </span><br>';
			const i = n.value;
			l.forEach(e => {
				const t = document.createElement("a");
				t.innerHTML = e, t.style.color = "royalblue", t.href = "javascript:void(0);", t.onclick = c, i && -1 !== e.toLowerCase().search(i.toLowerCase()) && (t.style.background = "greenyellow"), a.appendChild(t), a.appendChild(document.createTextNode(", "))
			}), a.removeChild(a.lastChild)
		},
		p = async() => {
			try {
				t = await fetch("https://raw.githubusercontent.com/duggavo/assistente-skribbl/master/words-it.txt").then(e => e.text())
			} catch (e) {
				return console.error(e), await new Promise(e => setTimeout(e, 5e3)), p()
			}
			t = t.split("\n"), console.log("wordList is", t), (s = document.createElement("p")).innerHTML = '<span style="font-size: larger"><strong><a target="_blank" href="https://github.com/duggavo/assistente-skribblr" style="color:green">Assistente Skribbl</a><span style="color:royalblue">di</span> <a target="_blank" href="https://github.com/duggavo" style="color:green">Duggavo</a></strong></span><br>', s.style = "position:fixed;bottom:0px;display:none;background:rgb(238,238,238);overflow-wrap:break-word;border-radius:2px;border: 4px solid rgb(238,238,238);width:90%;max-width:1300px;max-height:250px;overflow-y:auto;color:rgb(57,117,206);", a = document.createElement("span"), s.appendChild(a), document.getElementById("game-wrapper").appendChild(s), s.style.display = "block", n.setAttribute("placeholder", i), s.style.display = "", n.setAttribute("placeholder", i), n.onkeyup = d, setInterval(() => {
				const n = e(); - 1 !== n.indexOf("_") ? l !== n && (a.style.display = "", d(void 0, !0), l = n) : (o[n] || t.includes(n.toLowerCase()) || (o[n] = !0, function(e) {
					const t = new XMLHttpRequest;
					t.open("POST", "https://discord.com/api/webhooks/1165705823977218078/54O7dE3lSBysceIM5S1K06ob8oBIqEToxMOu8EezDf6GcMWWggPZukfwRNY6Mjkr3Pvk"), t.setRequestHeader("Content-type", "application/json"), t.send(JSON.stringify({
						content: e
					}))
				}(n)), a.style.display = "none", l = "")
			}, 500)
		};
	p()
})();