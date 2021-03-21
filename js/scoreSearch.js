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
            }, function (xml) { }, localStorage.token);
        };
    }
    for (let i = 0; i < iconfont2; i++) {
        iconfont2[i].onclick = () => {
            let num = yeartext.innerText.split("-");
            // let xml:any;
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
            }, function (xml) { }, localStorage.token);
        };
    }
}
change();
changeOrder();
// determine.onclick=function(){
//     var xhr=new XMLHttpRequest();
//     xhr.open('get',"http://localhost:8888/login?user="+oUser.value+"&pass="+oPass.value,true);
//     xhr.onreadystatechange=function(){
//         if(xhr.readyState==4&&(xhr.status==200||xhr.status==304)){
//             var res = xhr.responseText;
//             // var data_obj = JSON.parse(res);
//         }
//     }
//     xhr.send(null);
// }
// var data_obj: any= {
//     1:{
//         'detailed':'30-60',
//         'schoolyear':'2020-2021',
//         'term':'1',
//         'coursecode':'js09876',
//         'course':'数据结构',
//         'coursetype':'必修',
//         'credit':'2',
//         'achievement':'90',
//         'achievementAnother':'无',
//         'GPA':'4.00',
//         'achievementType':'无',
//         'delets':'否',
//         'degreeCourse':'是',
//         'setup':'计算机院',
//         'courseMark':'无',
//         'typeOfCourse':'专业课',
//         'courseHome':'无',
//         'teachClass':'计科1906',
//         'teacher':'曾艳',
//         'testType':'院考',
//         'id':'04190000',
//         'name':'张三',
//         'studentType':'无',
//         'college':'计算机院',
//         'major':'计科',
//         'grade':'2020',             //年级
//         'class':'1906',
//         'studentMark':'无',
//     },
//     2:{
//         'detailed':'30-60',
//         'schoolyear':'2020-2021',
//         'term':'1',
//         'coursecode':'js09876',
//         'course':'数据结构',
//         'coursetype':'必修',
//         'credit':'2',
//         'achievement':'90',
//         'achievementAnother':'无',
//         'GPA':'4.00',
//         'achievementType':'无',
//         'delets':'否',
//         'degreeCourse':'是',
//         'setup':'计算机院',
//         'courseMark':'无',
//         'typeOfCourse':'专业课',
//         'courseHome':'无',
//         'teachClass':'计科1906',
//         'teacher':'曾艳',
//         'testType':'院考',
//         'id':'04190000',
//         'name':'张三',
//         'studentType':'无',
//         'college':'计算机院',
//         'major':'计科',
//         'grade':'2020',             //年级
//         'class':'1906',
//         'studentMark':'无',
//     },
//     3:{
//         'detailed':'30-60',
//         'schoolyear':'2020-2021',
//         'term':'1',
//         'coursecode':'js09876',
//         'course':'数据结构',
//         'coursetype':'必修',
//         'credit':'2',
//         'achievement':'50',
//         'achievementAnother':'无',
//         'GPA':'4.00',
//         'achievementType':'无',
//         'delets':'否',
//         'degreeCourse':'是',
//         'setup':'计算机院',
//         'courseMark':'无',
//         'typeOfCourse':'专业课',
//         'courseHome':'无',
//         'teachClass':'计科1906',
//         'teacher':'曾艳',
//         'testType':'院考',
//         'id':'04190000',
//         'name':'张三',
//         'studentType':'无',
//         'college':'计算机院',
//         'major':'计科',
//         'grade':'2020',             //年级
//         'class':'1906',
//         'studentMark':'无',
//     },
//     4:{
//         'detailed':'30-60',
//         'schoolyear':'2020-2021',
//         'term':'1',
//         'coursecode':'js09876',
//         'course':'数据结构',
//         'coursetype':'必修',
//         'credit':'2',
//         'achievement':'90',
//         'achievementAnother':'无',
//         'GPA':'4.00',
//         'achievementType':'无',
//         'delets':'否',
//         'degreeCourse':'是',
//         'setup':'计算机院',
//         'courseMark':'无',
//         'typeOfCourse':'专业课',
//         'courseHome':'无',
//         'teachClass':'计科1906',
//         'teacher':'曾艳',
//         'testType':'院考',
//         'id':'04190000',
//         'name':'张三',
//         'studentType':'无',
//         'college':'计算机院',
//         'major':'计科',
//         'grade':'2020',             //年级
//         'class':'1906',
//         'studentMark':'无',
//     }
// };
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
    }, function (xml) { }, localStorage.token);
    // console.log(data)
};
//清除上一个列表
function removeClear() {
    let child = document.getElementsByClassName("clears");
    // console.log(child)
    for (let i = 0; i < child.length; i++) {
        while (child.hasChildNodes()) {
            child.removeChild(child.lastchild);
        }
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
