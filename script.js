var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.fillStyle = "#ababab";
checker = 1;
context.fillRect(0, 0, 200, 150);
totalPixelS = 30000;
removedPixels = 0;
percentage = 0;

const erase = () => context.globalCompositeOperation = 'destination-out'


// Change colors
// const changeColor = color => {
//   context.strokeStyle = color
//   context.globalCompositeOperation = 'source-over'
// }

// Change line width
context.lineWidth = 7
context.lineCap = "round";
// const changeWidth = value => context.lineWidth = value

// Draw logic
let isDrawing = false

const startDrawing = (event) => {
    isDrawing = true
    erase();
    context.beginPath()
    context.moveTo(event.clientX - 50, event.clientY - 50)
    checkPercentage();
    myInterval = setInterval(() => {
        checkPercentage();
    }, 500);
}
const stopDrawing = () => {
    isDrawing = false
    clearInterval(myInterval);
}
const draw = (event) => {
    if (!isDrawing) return
    context.lineTo(event.clientX - 50, event.clientY - 50)
    context.stroke()
    if(percentage> 35 && checker){
        checker = 0;
        canvas.removeEventListener("mousemove", draw)
        document.querySelector('#elem canvas').style.opacity = '-.1';
        document.querySelector('#elem').style.cursor = 'default';
        // document.querySelector('#elem canvas').removeEventListener('mousedown',()=>{console.log('removed');});
        
        setTimeout(() => {
            document.querySelector('#elem img').classList.add('elemIMG');
            document.querySelector('.barSmall').classList.add('fadeOut-animation');
            document.querySelector('.pointerSmall').classList.add('fadeOut-animation');
            document.querySelector('.offerText').classList.add('fadeOut-animation');

            // document.querySelector('#elem').addEventListener('click', ()=>{
            //     console.log('clicked');
            // })
        }, 1500);
    }
}
const enterCanvas = (event) => {
    context.beginPath()
}

canvas.addEventListener("mousedown", startDrawing)
canvas.addEventListener("mouseup", stopDrawing)
canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mouseover", enterCanvas)

// setInterval(() => {
//     checkPercentage();
// }, 500);

function checkPercentage() {
    count =0;
    for (var i = 0; i < 200; i++) {
        for (var j = 0; j < 150; j++) {
            x=i;y=j;
            const pixel = context.getImageData(x, y, 1, 1);
            const data = pixel.data;
            if (data[0] == 171){
                count++;
            }
        }

        // const x = event.clientX - 50;
        // const y = event.clientY - 50;
        // const pixel = context.getImageData(x, y, 1, 1);
        // const data = pixel.data;
    }
    percentage = (Math.floor(((totalPixelS-count)/totalPixelS)*100));
    console.log(percentage);
    document.querySelector('.pointerSmall').style.transform = `translateX(${percentage*2.5}px)`
}
// ---------------------------------------------------------------------------------
// // dsfdaf
// let coord = { x: 0, y: 0 };

// document.addEventListener("mousedown", start);
// document.addEventListener("mouseup", stop);

// function reposition(event) {
//   coord.x = event.clientX - canvas.offsetLeft-50;
//   coord.y = event.clientY - canvas.offsetTop - 50;
//   console.log(coord.x, coord.y);
// }
// function start(event) {
//   ctx.moveTo(coord.x, coord.y);
//   reposition(event);
//   ctx.clearRect(coord.x,coord.y,5,5);
//   document.addEventListener("mousemove", erase);
//   reposition(event);
// }
// function stop() {
//   document.removeEventListener("mousemove", draw);
// }
// function draw(event) {
//   // ctx.beginPath();
//   // ctx.lineWidth = 5;
//   // ctx.lineCap = "round";
//   // ctx.strokeStyle = "#ACD3ED";
//   reposition(event);
//   // ctx.lineTo(coord.x, coord.y);
//   ctx.clearRect(coord.x,coord.y,5,5);
//   // ctx.stroke();
// }
