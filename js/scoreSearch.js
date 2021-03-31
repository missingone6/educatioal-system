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
    var xml;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    }
    else {
        xml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (method.toLowerCase() === "post") {
        xml.open(method, url, true);
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (token) {
            xml.setRequestHeader("token", token);
        }
        xml.send(data);
    }
    else if (method.toLowerCase() === "get") {
        xml.open(method, "url?" + data, true);
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
    var _loop_1 = function (i) {
        year[i].onclick = function () {
            yeartext.innerText = year[i].innerText;
        };
    };
    for (var i = 0; i < year.length; i++) {
        _loop_1(i);
    }
    var _loop_2 = function (i) {
        year1[i].onclick = function () {
            yeartext1.innerText = year1[i].innerText;
        };
    };
    for (var i = 0; i < year1.length; i++) {
        _loop_2(i);
    }
    var _loop_3 = function (i) {
        year2[i].onclick = function () {
            yeartext2.innerText = year2[i].innerText;
        };
    };
    for (var i = 0; i < year2.length; i++) {
        _loop_3(i);
    }
}
//排序顺序改变
function changeOrder() {
    var _loop_4 = function (i) {
        iconfont1[i].onclick = function () {
            var num = yeartext.innerText.split("-");
            // let xml:any;
            // console.log("iconfont1");
            var num1 = yeartext1.innerText;
            var num2 = iconfont1[i].parentElement.parentElement.id;
            ajax("post", "http://www.xinill.cn:80/class/grade", "schoolyear=" + num[0] + "&term=" + num1 + "&sortBy=" + num2 + "&sort=up", function (xml) {
                var res = JSON.parse(xml.responseText);
                // console.log(res);
                // console.log(res.data);
                // 登录成功 term
                if (res.data != null) {
                    // console.log("12345")
                    // console.log('token', xml.getResponseHeader('token'));
                    localStorage.token = xml.getResponseHeader("token");
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
    };
    for (var i = 0; i < iconfont1.length; i++) {
        _loop_4(i);
    }
    var _loop_5 = function (i) {
        iconfont2[i].onclick = function () {
            var num = yeartext.innerText.split("-");
            // let xml:any;
            // console.log("iconfont2");
            var num1 = yeartext1.innerText;
            var num3 = iconfont2[i].parentElement.parentElement.id;
            ajax("post", "http://www.xinill.cn:80/class/grade", "schoolyear=" + num[0] + "&term=" + num1 + "&sortBy=" + num3 + "&sort=down", function (xml) {
                var res = JSON.parse(xml.responseText);
                // console.log(res);
                // console.log(res.data);
                // 登录成功 term
                if (res.data != null) {
                    // console.log("12345")
                    // console.log('token', xml.getResponseHeader('token'));
                    localStorage.token = xml.getResponseHeader("token");
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
    };
    for (var i = 0; i < iconfont2.length; i++) {
        _loop_5(i);
    }
}
change();
changeOrder();
var token = localStorage.token;
determine.onclick = function () {
    var num = yeartext.innerText.split("-");
    // let xml:any;
    var num1 = yeartext1.innerText;
    // console.log(num1)
    var data = ajax("post", "http://www.xinill.cn:80/class/grade", "schoolyear=" + num[0] + "&term=" + num1 + "&sortBy=achievement&sort=down", function (xml) {
        var res = JSON.parse(xml.responseText);
        // console.log(res);
        // console.log(res.data);
        // 登录成功 term
        if (res.data != null) {
            // console.log("12345")
            // console.log('token', xml.getResponseHeader('token'));
            localStorage.token = xml.getResponseHeader("token");
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
    var child = document.getElementsByClassName("clears");
    var i = 0;
    while (i < child.length) {
        child[i].parentNode.removeChild(child[i]);
    }
}
// 动态添加成绩列表
var score = function (data) {
    for (var i in data) {
        var ul = document.createElement("ul");
        ul.classList.add("clears");
        // console.log(data[i])
        for (var j in data[i]) {
            // console.log(j)
            var li = document.createElement("li");
            if (j == "detailed") {
                // console.log("查看")
                var a = document.createElement("a");
                a.innerHTML = "查看";
                li.appendChild(a);
            }
            else {
                li.innerHTML = data[i][j];
            }
            li.classList.add("tableTop");
            if (j == "achievement" && data[i][j] < "60") {
                ul.classList.add("ca94442");
            }
            if (j == "achievementAnother" &&
                (data[i][j] == "重修" || data[i][j] == "补考")) {
                ul.classList.add("cblue");
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
