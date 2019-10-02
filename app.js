const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.heigth = 700;

ctx.strokeStyle = "#2c2c2c"; //default
ctx.lineWidth = 2.5; // 선 굵기

let painting = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}


// 선을 만들고 선을 색으로 채운다는 개념
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

function handelColorClick(event){
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", onMouseLeave);
//   canvas.addEventListener();
}


// Array.from(); 오브젝트로부터 array를 만든다.
Array.from(colors).forEach(color => color.addEventListener("click", handelColorClick));
// forEach 안에 color 은 array 안에 있는 아이템들 각각을 지정하는 명칭같은것임.