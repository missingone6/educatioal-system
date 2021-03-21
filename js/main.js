"use strict";
// import {ajax} from './ajax';
function ajax(method, url, data, success, fail, token) {
    let xml;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    }
    else {
        xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (method.toLowerCase() === 'post') {
        xml.open(method, url, true);
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (token) {
            xml.setRequestHeader("token", token);
        }
        xml.send(data);
    }
    else if (method.toLowerCase() === 'get') {
        xml.open(method, `url?${data}`, true);
        xml.send();
    }
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200) {
                success(xml);
            }
            else {
                fail(xml);
            }
        }
    };
}
const fatherLi = document.getElementsByClassName('drop-downList')[0];
const ul = document.getElementsByClassName('smallmenu');
const li = document.getElementsByClassName('item');
const changePassword = document.getElementById('changePassword');
const shadow = document.getElementById('shadow');
for (let i = 0; i < li.length; i++) {
    li[i].addEventListener('mouseover', (event) => {
        ul[i].style.display = 'block';
    });
    li[i].addEventListener('mouseout', (event) => {
        ul[i].style.display = 'none';
    });
}
const h_box = document.getElementsByClassName('h-box')[0];
const h_dropDownList = document.getElementsByClassName('h-dropDownList')[0];
let sw_1 = true;
h_box.onclick = function () {
    if (sw_1) {
        h_dropDownList.style.display = 'block';
        sw_1 = false;
    }
    else {
        h_dropDownList.style.display = 'none';
        sw_1 = true;
    }
};
//拖拽
drug(document.getElementById('changePassword'));
function drug(target) {
    let sw = false;
    let x, y;
    target.onmousedown = function (event) {
        sw = true;
        target.style.cursor = 'move';
        event = event || window.event;
        x = event.clientX - target.offsetLeft;
        y = event.clientY - target.offsetTop;
    };
    document.onmousemove = function (event) {
        if (sw) {
            let tempX = event.clientX - x;
            let tempY = event.clientY - y;
            target.style.left = tempX + 'px';
            target.style.top = tempY + 'px';
        }
    };
    document.onmouseup = function () {
        sw = false;
        target.style.cursor = 'default';
    };
}
document.getElementsByClassName('h-changePw')[0].onclick = function () {
    changePassword.style.display = 'block';
    shadow.style.display = 'block';
};
let c_close = document.getElementsByClassName('c-close');
for (let i = 0; i < c_close.length; i++) {
    c_close[i].onclick = function () {
        changePassword.style.display = 'none';
        shadow.style.display = 'none';
    };
}
// 修改密码
document.getElementsByClassName('c-submit')[0].onclick = function () {
    const pw1 = document.getElementsByClassName('pw1')[0].value;
    const pw2 = document.getElementsByClassName('pw2')[0].value;
    // 检测两次密码是否输入一致
    if (pw1 === pw2) {
        ajax("post", "http://www.xinill.cn:80/user/inform/updatepwd", `password=${pw1}`, function (xml) {
            console.log(xml, pw1);
            console.log("密码修改成功");
            document.getElementsByClassName('r-tips')[0].innerHTML = '密码修改成功';
        }, function (xml) {
            console.log(xml, pw1);
            console.log("很抱歉，请联系管理员，密码修改失败");
        }, localStorage.token);
    }
    else {
        document.getElementsByClassName('r-tips')[0].innerHTML = '很抱歉，两次密码输入不同';
    }
};
// 课表，成绩刷新
(function () {
    ajax("post", "http://www.xinill.cn:80/class/grade", `schoolyear=2021&term=1&sortBy=term&sort=up`, function (xml) {
        let res = JSON.parse(xml.responseText);
        let li;
        let father = document.querySelector('#grade .u-message');
        for (let i in res.data) {
            li = document.createElement('li');
            li.classList.add('u-item');
            li.innerHTML = `
            <a href="#">
                <div class="fl">${res.data[i].coursetype}-${res.data[i].coursecode}-${res.data[i].course}</div>
                <div class="fr">${res.data[i].achievement}</div>
            </a>    
            `;
            father.appendChild(li);
        }
    }, function (xml) {
    }, localStorage.token);
    ajax("post", "http://www.xinill.cn:80/class/timeline", `schoolyear=2021&term=1`, function (xml) {
        let res = JSON.parse(xml.responseText);
        let li;
        console.log(res);
        let father = document.querySelector('#courseTimetable .u-message');
        for (let i in res.data) {
            if (res.data[i].length === 0) {
                continue;
            }
            else {
                for (let j in res.data[i]) {
                    li = document.createElement('li');
                    li.classList.add('u-item');
                    li.innerHTML = `
                    <a href="#">
                        <div>${res.data[i][j].week}周-星期${j + 1}-${res.data[i][j].place}-${res.data[i][j].teacher}-${res.data[i][j].testtype}
                        </div>
                    </a>  
                    `;
                    father.appendChild(li);
                }
            }
        }
    }, function (xml) {
    }, localStorage.token);
})();
