document.getElementById("download").onclick = function() {
	const screenshotTarget = document.getElementById("grid-container");
	html2canvas(screenshotTarget).then((canvas) => {
		const base64image = canvas.toDataURL("image/png");
		var anchor = document.createElement('a');
		anchor.setAttribute("href", base64image);
		anchor.setAttribute("download", "my-drawing.png");
		anchor.click();
		anchor.remove();
	});
}

let color = document.getElementById("colorPick").value;

function setColor(color1) {
	color = document.getElementById("colorPick").value;
}

function erase() {
	color = "#FFFFFF";
}


function updateGridInput(val) {
	document.getElementById('gridDimensions').innerHTML = val + " x " + val;
	document.getElementById('slider').onchange = () => {
		const myNode = document.getElementById("grid-container");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.lastChild);
		}
		gridCreate(val)
	}
}

function resetGrid() {

	const myNode = document.getElementById("grid-container");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.lastChild);
	}
	gridCreate(document.getElementById('slider').value)

}


function gridCreate(num) {

	let div_grid_element = document.createElement('div');
	let dimensions = 600 / num;
	div_grid_element.style.width = `${dimensions}px`;
	div_grid_element.style.height = `${dimensions}px`;
	div_grid_element.classList.add("box");
	let mouseStatus = false;


	for (let i = 0; i < num * num; i++) {
		document.getElementById('grid-container').append(div_grid_element.cloneNode(true));
	}

	let grid_boxes = document.querySelectorAll('.box');
	grid_boxes.forEach((grid_box) => {
		grid_box.addEventListener('mouseover', (event) => {

			grid_box.addEventListener('mousedown', (event) => {
				mouseStatus = true;
			});

			grid_box.addEventListener('mouseup', (event) => {
				mouseStatus = false;
			});

			if (mouseStatus === true) {
				grid_box.addEventListener('mousemove', (event) => {
					grid_box.style.backgroundColor = `${color}`;
				});
			}

		});
	});
}

gridCreate(50);