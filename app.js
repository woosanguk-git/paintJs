const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ragne = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.heigth = CANVAS_SIZE;

// canvas 기본 배경색 지정.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; //default
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 선 굵기

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

// 선을 만들고 선을 색으로 채운다는 개념
function onMouseMove(event) {
  //   console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // console.log("creating path in", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // console.log("creating line in", x, y);
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

function handelColorClick(event) {
  const color = event.target.style.backgroundColor;
  // console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  // fill 선택시 색 변경
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  console.log(event);
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  // link.href 는 다운받을 이미지를 저장(url) .
  link.href = image;
  // link.download 는 image 를 다운받을때 이름. 
  link.download = "PaintJS_EXPORT";
  link.click();
}

if (colors) {
  // Array.from(); 오브젝트로부터 array를 만든다.
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handelColorClick)
  );
  // forEach 안에 color 은 array 안에 있는 아이템들 각각을 지정하는 명칭같은것임.
}

if (ragne) {
  ragne.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
