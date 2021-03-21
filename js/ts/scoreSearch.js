"use strict";
// let ajax:any = require("./js/Ajax")
var yeartext = document.getElementById("yeartext");
var yeartext1 = document.getElementById("yeartext1");
var yeartext2 = document.getElementById("yeartext2");
// var yearul: any = document.getElementById("yearul");
// var yearul1: any = document.getElementById("yearul1");
// var yearul2: any =document.getElementById("yearul2");
var year2 = document.getElementsByClassName("year2");
var year1 = document.getElementsByClassName("year1");
var year = document.getElementsByClassName("year");
var determine = document.getElementById("determine");
var scoreTable = document.getElementById("scoreTable");
var iconfont1 = document.getElementsByClassName("iconfont1");
var iconfont2 = document.getElementsByClassName("iconfont2");
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
//学年学期选择
function change() {
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
    for (let i = 0; i < year2.length; i++) {
        year2[i].onclick = () => {
            yeartext2.innerText = year2[i].innerText;
        };
    }
}
//排序顺序改变
function changeOrder() {
    for (let i = 0; i < iconfont1.length; i++) {
        iconfont1[i].onclick = () => {
            let num = yeartext.innerText.split("-");
            // let xml:any;
            console.log("inconfont1");
            let num1 = yeartext1.innerText;
            let num2 = iconfont1[i].parentElement.parentElement.id;
            ajax("post", "http://www.xinill.cn:80/class/grade", `schoolyear=${num[0]}&term=${num}&sortBy=${num2}&sort=up`, function (xml) {
                let res = JSON.parse(xml.responseText);
                // console.log(res);
                // console.log(res.data);
                // 登录成功 term
                if (res.data != null) {
                    // console.log("12345")
                    // console.log('token', xml.getResponseHeader('token'));
                    localStorage.token = xml.getResponseHeader('token');
                    // return false;
                    // window.location.href = 'main.html';
                    removeClear();
                    score(res.data);
                }
                else {
                    alert(res.msg);
                }
            }, function (xml) { }, token);
        };
    }
    for (let i = 0; i < iconfont2.length; i++) {
        iconfont2[i].onclick = () => {
            let num = yeartext.innerText.split("-");
            // let xml:any;
            console.log("iconfont2");
            let num1 = yeartext1.innerText;
            let num3 = iconfont1[i].parentElement.parentElement.id;
            ajax("post", "http://www.xinill.cn:80/class/grade", `schoolyear=${num[0]}&term=${num1}&sortBy=${num3}&sort=down`, function (xml) {
                let res = JSON.parse(xml.responseText);
                // console.log(res);
                // console.log(res.data);
                // 登录成功 term
                if (res.data != null) {
                    // console.log("12345")
                    // console.log('token', xml.getResponseHeader('token'));
                    localStorage.token = xml.getResponseHeader('token');
                    // return false;
                    // window.location.href = 'main.html';
                    removeClear();
                    score(res.data);
                }
                else {
                    alert(res.msg);
                }
            }, function (xml) { }, token);
        };
    }
}
change();
changeOrder();
let token = localStorage.token;
determine.onclick = () => {
    let num = yeartext.innerText.split("-");
    // let xml:any;
    let num1 = yeartext1.innerText;
    // console.log(num1)
    let data = ajax("post", "http://www.xinill.cn:80/class/grade", `schoolyear=${num[0]}&term=${num1}&sortBy=achievement&sort=down`, function (xml) {
        let res = JSON.parse(xml.responseText);
        // console.log(res);
        // console.log(res.data);
        // 登录成功 term
        if (res.data != null) {
            // console.log("12345")
            // console.log('token', xml.getResponseHeader('token'));
            localStorage.token = xml.getResponseHeader('token');
            // return false;
            // window.location.href = 'main.html';
            removeClear();
            score(res.data);
        }
        else {
            alert(res.msg);
        }
    }, function (xml) { }, token);
    // console.log(data)
};
//清除上一个列表
function removeClear() {
    let child = document.getElementsByClassName("clears");
    let i = 0;
    while (i < child.length) {
        child[i].parentNode.removeChild(child[i]);
    }
}
// 动态添加成绩列表
var score = (data) => {
    for (let i in data) {
        let ul = document.createElement("ul");
        ul.classList.add("clears");
        // console.log(data[i])
        for (let j in data[i]) {
            // console.log(j)
            let li = document.createElement("li");
            if (j == 'detailed') {
                // console.log("查看")
                let a = document.createElement("a");
                a.innerHTML = "查看";
                li.appendChild(a);
            }
            else {
                li.innerHTML = data[i][j];
            }
            li.classList.add("tableTop");
            if (j == "achievement" && data[i][j] < '60') {
                ul.classList.add('ca94442');
            }
            if (j == 'achievementAnother' && (data[i][j] == "重修" || data[i][j] == "补考")) {
                ul.classList.add('cblue');
            }
            li.classList.add("cbfff");
            li.classList.add("fl");
            li.classList.add("tabs");
            ul.appendChild(li);
        }
        ul.classList.add("tableline");
        scoreTable.appendChild(ul);
    }
};
