"use strict";
// let ajax:any = require("./js/Ajax.js")
var yeartext = document.getElementById("yeartext");
var yeartext1 = document.getElementById("yeartext1");
var year1 = document.getElementsByClassName("year1");
var year = document.getElementsByClassName("year");
var determine = document.getElementById("determine");
var scoreTable = document.getElementById("scoreTable");
let inp = document.getElementById("inp");
let defines = document.getElementById("defines");
let token1 = localStorage.token;
//ajax
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
    // return xml;  
}
function change1() {
    for (let i = 0; i < year.length; i++) {
        year[i].onclick = () => {
            yeartext.innerText = year[i].innerText;
        };
    }
    for (let i = 0; i < year1.length; i++) {
        year1[i].onclick = () => {
            yeartext1.innerText = year1[i].innerText;
        };
    }
}
change1();
determine.onclick = () => {
    // console.log("1")
    let num = yeartext.innerText.split("-");
    // let xml:any;
    let num1 = yeartext1.innerText;
    // console.log(num1)
    let data = ajax("post", "http://www.xinill.cn:80/class/confirm", `schoolyear=${num[0]}&term=${num1}`, function (xml) {
        let res = JSON.parse(xml.responseText);
        console.log(res);
        console.log(res.data);
        // 登录成功 term
        if (res.data != null) {
            // console.log("12345")
            // console.log('token', xml.getResponseHeader('token'));
            localStorage.token = xml.getResponseHeader('token');
            // return false;
            // window.location.href = 'main.html';
            reclears(res.data);
            addItem(res.data);
        }
        else {
            alert(res.msg);
        }
    }, function (xml) { }, token1);
    // console.log(data)
};
//发送缺人请求
defines.onclick = () => {
    console.log(1);
    let input = document.getElementsByClassName("inp");
    let arr = [];
    // console.log(arr);
    for (let i = 0; i < input.length; i++) {
        console.log(input[i]);
        if (input[i].checked) {
            arr[i] = "1";
        }
    }
    // console.log(arr);
};
inp.onclick = () => {
    // console.log(1);
    let input = document.getElementsByClassName("inp");
    if (inp.checked) {
        for (let i = 0; i < input.length; i++) {
            input[i].checked = true;
        }
    }
    else {
        for (let i = 0; i < input.length; i++) {
            input[i].checked = false;
        }
    }
};
//防止重复
function reclears(data) {
    let needClears = document.getElementsByClassName("clears");
    let i = 0;
    while (i < needClears.length) {
        needClears[i].parentNode.removeChild(needClears[i]);
    }
}
//添加列表
function addItem(data) {
    console.log(data);
    // console.log(i);
    for (let j in data) {
        let ul = document.createElement("ul");
        ul.classList.add("clears");
        // console.log(data[j]);
        for (let k in data[j]) {
            // console.log(data[j][k]);
            if (k == "schoolyear") {
                // console.log("添加input")
                let li = creatli();
                let input = document.createElement("input");
                // input.role= "chechbox";
                // input.tupe = "checkbox";
                input.setAttribute("type", "checkbox");
                input.classList.add("inp");
                li.appendChild(input);
                ul.appendChild(li);
            }
            // console.log(data[j])
            let li = creatli();
            li.innerHTML = data[j][k];
            ul.appendChild(li);
        }
        ul.classList.add("tableline");
        scoreTable.appendChild(ul);
    }
}
//创建li
function creatli() {
    let li = document.createElement("li");
    li.classList.add("tableTop");
    // li.classList.add("cbf0f0f0");
    li.classList.add("fl");
    li.classList.add("td");
    li.classList.add("tabs");
    return li;
}
