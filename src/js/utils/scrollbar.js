function getScrollbarWidth() {
	let div = document.createElement("div");
	div.style.overflowY = "scroll";
	div.style.width = "10rem";
	div.style.height = "10rem";
	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();
	return scrollWidth / 16 + "rem";
	// return scrollWidth + "px";
}
function refreshScrollbarWidth(obj) {
	if (!obj) return;
	obj.style.setProperty('--scrollbar-placeholder-width', getScrollbarWidth())
}

export { getScrollbarWidth, refreshScrollbarWidth };
