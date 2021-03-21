"use strict";
// import {ajax} from './ajax'
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
document.getElementsByClassName('m-submit')[0].onclick = function () {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    ajax("post", "http://www.xinill.cn:80/user/login", `user=${user}&password=${password}`, function (xml) {
        let res = JSON.parse(xml.responseText);
        console.log(res);
        // 登录成功
        if (res.data === true) {
            console.log('token', xml.getResponseHeader('token'));
            localStorage.token = xml.getResponseHeader('token');
            // return false;
            window.location.href = 'scoreSearch.html';
        }
        else {
            alert(res.msg);
        }
    }, function (xml) {
    }, "");
};
