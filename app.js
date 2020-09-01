const canvas = document.getElementById("jaCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx=canvas.getContext('2d');
//canvas에 picxel modifier 사이즈를 줘야함!! 실제 픽셀사이즈
canvas.width=700;
canvas.height=700;
//context 의 default 값 설정
ctx.strokeStyle="#2c2c2c";
ctx.lineWidth=2.5;


let painting=false;

function stopPainting(){
    painting=false;
}
function startPainting(){
    painting=true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);

    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}
function handleColorClick(event){
ctx.strokeStyle=event.target.style.backgroundColor;
}
Array.from(colors).forEach(colors=>colors.addEventListener("click",handleColorClick));

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown",startPainting )
    canvas.addEventListener("mouseup",stopPainting )
    canvas.addEventListener("mouseleave",stopPainting )
}