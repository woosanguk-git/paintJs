const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.heigth = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5; // 선 굵기

let painting = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    console.log("creating path in", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  // 마우스를 클릭했을때 painting = true
  painting = true;
}

function onMouseLeave(event) {
  // 마우스가 캔버스 밖으로 갔을때
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", onMouseLeave);
}
