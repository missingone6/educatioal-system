const fatherLi = document.getElementsByClassName('drop-downList')[0];
const ul = document.getElementsByClassName('smallmenu');
const li = document.getElementsByClassName('item');
const changePassword = document.getElementById(
    'changePassword'
);
const shadow = document.getElementById(
    'shadow'
);

for (let i = 0; i < li.length; i++) {
    li[i].addEventListener('mouseover', (event) => {
        ul[i].style.display = 'block';
    });
    li[i].addEventListener('mouseout', (event) => {
        ul[i].style.display = 'none';
    })
}
const h_box = document.getElementsByClassName('h-box')[0];
const h_dropDownList = document.getElementsByClassName('h-dropDownList')[0];
let sw_1: boolean = true;
h_box.onclick = function () {
    if (sw_1) {
        h_dropDownList.style.display = 'block';
        sw_1 = false;
    }
    else {
        h_dropDownList.style.display = 'none';
        sw_1 = true;
    }
}

//拖拽
drug(document.getElementById(
    'changePassword'
));

function drug(target: any) {
    let sw = false;
    let x: number,
        y: number;
    target.onmousedown = function (event:any) {
        sw = true;
        target.style.cursor = 'move';
        event = event || window.event;
        x = event.clientX - target.offsetLeft;
        y = event.clientY - target.offsetTop;
    }
    document.onmousemove = function (event:any) {
        if (sw) {
            let tempX = event.clientX - x;
            let tempY = event.clientY - y;
            target.style.left = tempX + 'px';
            target.style.top = tempY + 'px';
        }

    }
    document.onmouseup = function () {
        sw = false;
        target.style.cursor = 'default';
    }
}
document.getElementsByClassName('h-changePw')[0].onclick = function(){
    changePassword.style.display = 'block';
    shadow.style.display = 'block';        
}

let c_close:Array<2> = document.getElementsByClassName('c-close');
for(let i = 0 ; i < c_close.length ; i++){
    c_close[i].onclick = function(){
        changePassword.style.display = 'none';
        shadow.style.display = 'none';             
    }
}

    













