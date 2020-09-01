const canvas = document.getElementById("jaCanvas");
const mode = document.getElementById("jsMode");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext('2d');
const range = document.getElementById("jsRange")
const saveBtn = document.getElementById("jsSave")

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

//canvas에 picxel modifier 사이즈를 줘야함!! 실제 픽셀사이즈
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//context 의 default 값 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);   //배경이 투명으로 적용되어있음. 흰배경으로 만들어주기
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

Array.from(colors).forEach(colors => colors.addEventListener("click", handleColorClick));

function handleCanvasClick() {
    if (filling === true) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

if (range) {
    range.addEventListener("input", handleRangeChange)
}

function handleSaveClick() {
    //이미자파일 타입 정의(default png, jpg ...)
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJs" //파일명
    link.click()    //이미지 주소가 담긴 a태그를 클릭해서 실행되도록 클릭
}

if (saveBtn){
    saveBtn.addEventListener("click",handleSaveClick)
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}