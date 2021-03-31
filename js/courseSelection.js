"use strict";
// let ajax:any = require("./js/Ajax.js")
var yeartext = document.getElementById("yeartext");
var yeartext1 = document.getElementById("yeartext1");
var year1 = document.getElementsByClassName("year1");
var year = document.getElementsByClassName("year");
var determine = document.getElementById("determine");
var scoreTable = document.getElementById("scoreTable");
var inp = document.getElementById("inp");
var defines = document.getElementById("defines");
var token1 = localStorage.token;
var data_public;
//ajax
function ajax(method, url, data, success, fail, token) {
    var xml;
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
function change1() {
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
}
change1();
determine.onclick = function () {
    // console.log("1")
    var num = yeartext.innerText.split("-");
    // let xml:any;
    var num1 = yeartext1.innerText;
    // console.log(num1)
    var data = ajax("post", "http://www.xinill.cn:80/class/confirm", "schoolyear=" + num[0] + "&term=" + num1, function (xml) {
        var res = JSON.parse(xml.responseText);
        console.log(res);
        console.log(res.data);
        // 登录成功 term
        if (res.data != null) {
            // console.log("12345")
            // console.log('token', xml.getResponseHeader('token'));
            localStorage.token = xml.getResponseHeader('token');
            // return false;
            // window.location.href = 'main.html';
            data_public = res.data;
            reclears(res.data);
            addItem(res.data);
        }
        else {
            alert(res.msg);
        }
    }, function (xml) { }, token1);
    // console.log(data)
};
//发送确认请求
defines.onclick = function () {
    var inp = document.getElementsByClassName("inp2");
    var arr = [];
    var j = 0;
    for (var _i = 0, inp_1 = inp; _i < inp_1.length; _i++) {
        var i = inp_1[_i];
        console.log(i);
        if (i.checked) {
            if (i.classList.contains("inp") == true) {
                arr.push(data_public[j].cid);
            }
            j++;
            console.log("aaa");
        }
    }
    console.log(arr);
    ajax("post", "http://www.xinill.cn:80/class/setChooseStatement", "cid=" + arr, function (xml) {
        var res = JSON.parse(xml.responseText);
        console.log(res);
        console.log(res.data);
        // 登录成功 term
        if (res.data != null) {
            localStorage.token = xml.getResponseHeader('token');
            // return false;
            // window.location.href = 'main.html';
            determine.onclick();
        }
        else {
            alert(res.msg);
        }
    }, function (xml) { }, token1);
    console.log(arr);
};
inp.onclick = function () {
    var input = document.getElementsByClassName("inp");
    if (inp.checked) {
        for (var i = 0; i < input.length; i++) {
            input[i].checked = true;
        }
    }
    else {
        for (var i = 0; i < input.length; i++) {
            input[i].checked = false;
        }
    }
};
//防止重复
function reclears(data) {
    var needClears = document.getElementsByClassName("clears");
    var i = 0;
    while (i < needClears.length) {
        needClears[i].parentNode.removeChild(needClears[i]);
    }
}
//添加列表
function addItem(data) {
    console.log(data);
    for (var j in data) {
        var ul = document.createElement("ul");
        ul.classList.add("clears");
        for (var k in data[j]) {
            if (k == 'cid') {
                continue;
            }
            if (k == "schoolyear") {
                var li_1 = creatli();
                var input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                if (data[j].state == "已确认") {
                    input.classList.add("inp2");
                    input.classList.add("inp1");
                    input.checked = true;
                }
                else {
                    input.classList.add("inp2");
                    input.classList.add("inp");
                }
                li_1.appendChild(input);
                ul.appendChild(li_1);
            }
            // console.log(data[j])
            var li = creatli();
            li.innerHTML = data[j][k];
            ul.appendChild(li);
        }
        ul.classList.add("tableline");
        scoreTable.appendChild(ul);
    }
}
//创建li
function creatli() {
    var li = document.createElement("li");
    li.classList.add("tableTop");
    // li.classList.add("cbf0f0f0");
    li.classList.add("fl");
    li.classList.add("td");
    li.classList.add("tabs");
    return li;
}
