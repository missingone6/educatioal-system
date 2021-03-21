"use strict";
var yeartext = document.getElementById("yeartext");
var yeartext1 = document.getElementById("yeartext1");
var yearul = document.getElementById("yearul");
var yearul1 = document.getElementById("yearul1");
var year1 = document.getElementsByClassName("year1");
var year = document.getElementsByClassName("year");
var determine = document.getElementById("determine");
var scoreTable = document.getElementById("scoreTable");
var tr = document.getElementsByTagName('tr');
var td = document.getElementsByTagName("td");
var tabletitle = document.getElementById("tabletitle");
var idnumber = document.getElementById("idnumber");
var experiment = document.getElementById("experiment");
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
determine.onclick = () => {
    let num = yeartext.innerText.split("-");
    // let xml:any;
    let num1 = yeartext1.innerText;
    // console.log(num1)
    let data = ajax("post", "http://www.xinill.cn:80/class/timeline", `schoolyear=${num[0]}&term=${num1}`, function (xml) {
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
            removeChild(res.data);
            changeID(res.data);
            changetable(res.data);
        }
        else {
            alert(res.msg);
        }
    }, function (xml) { }, localStorage.token);
    // console.log(data)
};
choise();
//改变学期学年文本
function choise() {
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
//清除上一个课表
function removeChild(data) {
    let child = document.getElementsByClassName("clears");
    // console.log(child)
    for (let i = 0; i < child.length; i++) {
        while (child.hasChildNodes()) {
            child.removeChild(child.lastchild);
        }
    }
}
//改变课表题头和学号
function changeID(data) {
    tabletitle.innerHTML = data.name + '的课表';
    let div = document.createElement('div');
    div.innerHTML = '学号：' + data.id;
    div.classList.add("fr");
    div.classList.add("font16");
    tabletitle.appendChild(div);
    experiment.innerHTML = data.exp;
}
// var datas = {
//     1:{
//         1:{
//             'num':'1-1',        //课程节次 （前面第几节 后面周几）
//             'course':'大学英语',  //课程名称
//             'week':'1-18',         //教学周
//             'place':'长安校区东区 fz233',   //教学地点
//             'teacher':'张五',       //老师
//             'educlass':'大英a2333',     //教学班
//             'testtype':'校考',          //考试类型
//             'another':'无',             //备注
//             'teachtime':'讲课:32',      //讲课时间
//             'weektime':'4',             //周课时
//             'alltime':'64',             //总课时
//             'credit':'4'                //学分
//         },
//         5:{
//             'num':'1-5',
//             'course':'大学英语',
//             'week':'1-18',
//             'place':'长安校区东区 fz233',
//             'teacher':'张五',
//             'educlass':'大英a2333',
//             'testtype':'校考',
//             'another':'无',
//             'teachtime':'讲课:32',
//             'weektime':'4',
//             'alltime':'64',
//             'credit':'4'
//         }
//     },
//     2:{
//         2:{
//             'num':'2-2',
//             'course':'大学英语',
//             'week':'1-18',
//             'place':'长安校区东区 fz233',
//             'teacher':'张五',
//             'educlass':'大英a2333',
//             'testtype':'校考',
//             'another':'无',
//             'teachtime':'讲课:32',
//             'weektime':'4',
//             'alltime':'64',
//             'credit':'4'
//         }
//     },
//     3:{
//         1:{
//             'num':'3-1',
//             'course':'大学英语',
//             'week':'1-18',
//             'place':'长安校区东区 fz233',
//             'teacher':'张五',
//             'educlass':'大英a2333',
//             'testtype':'校考',
//             'another':'无',
//             'teachtime':'讲课:32',
//             'weektime':'4',
//             'alltime':'64',
//             'credit':'4'
//         },
//         2:{
//             'num':'3-2',
//             'course':'大学英语',
//             'week':'1-18',
//             'place':'长安校区东区 fz233',
//             'teacher':'张五',
//             'educlass':'大英a2333',
//             'testtype':'校考',
//             'another':'无',
//             'teachtime':'讲课:32',
//             'weektime':'4',
//             'alltime':'64',
//             'credit':'4'
//         }
//     },
//     4:{
//         5:{
//             'num':'4-5',
//             'course':'大学英语',
//             'week':'1-18',
//             'place':'长安校区东区 fz233',
//             'teacher':'张五',
//             'educlass':'大英a2333',
//             'testtype':'校考',
//             'another':'无',
//             'teachtime':'讲课:32',
//             'weektime':'4',
//             'alltime':'64',
//             'credit':'4'
//         }
//     },
//     5:{},
//     name:'张三',
//     id:'04190000',
//     exp:'数字逻辑课程设计●赵林森(共13周)/5-18周;'
// };
// 添加课表每个单元格格式
function additem(data) {
    let item = document.createElement("div");
    item.classList.add('clears');
    // console.log("生成div")
    item.classList.add('text-left');
    let span = document.createElement('span');
    span.classList.add('typeface1');
    item.appendChild(span);
    for (let i = 0; i < 10; i++) {
        let p = document.createElement('p');
        p.classList.add('typeface2');
        item.appendChild(p);
    }
    additemtext(item, data);
    // console.log(item)
    return item;
}
// 添加每个单元格的文字
function additemtext(item, data) {
    let items = item.children;
    items[0].innerHTML = data.course;
    items[1].innerHTML = data.week;
    items[2].innerHTML = data.place;
    items[3].innerHTML = data.teacher;
    items[4].innerHTML = data.educlass;
    items[5].innerHTML = data.testtype;
    items[6].innerHTML = data.another;
    items[7].innerHTML = data.teachtime;
    items[8].innerHTML = data.weektime;
    items[9].innerHTML = data.alltime;
    items[10].innerHTML = data.credit;
    return items;
}
// 修改一大节课的排列格式
function changetab(item, data) {
    // console.log(item)
    // console.log(data)
    let arr = data.num.split("-");
    // console.log(arr)
    // console.log(tr[arr[0]*2-1].children)
    if (tr[arr[0] * 2 - 1].children.length == 7) {
        // console.log(arr)
        // console.log(arr[0]*2-1)
        // console.log(arr[0]*2)
        // console.log(arr[1])
        tr[arr[0] * 2 - 1].children[arr[1] * 1 + 1].rowSpan = '2';
        tr[arr[0] * 2 - 1].children[arr[1] * 1 + 1].appendChild(item);
        tr[arr[0] * 2].removeChild(tr[arr[0] * 2].children[1]);
    }
    else {
        tr[arr[0] * 2 - 1].children[arr[1] * 1].rowSpan = '2';
        tr[arr[0] * 2 - 1].children[arr[1] * 1].appendChild(item);
        tr[arr[0] * 2].removeChild(tr[arr[0] * 2].children[1]);
    }
}
// 遍历对象 更新课表
function changetable(data) {
    for (let i in data) {
        // console.log(i)
        for (let j in data) {
            // console.log(datas[i][j]);
            if (data[i][j] != null) {
                let datas = data[i][j];
                // console.log(i,j)
                let item = additem(datas);
                changetab(item, datas);
            }
        }
    }
}
