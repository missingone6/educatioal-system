function ajax(method: string, url: string, data: string, success: any, fail: any, token: string) {

    let xml: any;
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
            } else {
                fail(xml);
            }
        }
    }
}



// insertInf(['学号','姓名','姓名拼音',
// '曾用名','英文姓名','性别',
// '证件类型','证件号码','出生日期',
// '民族','政治面貌加入时间','政治面貌',
// '入学日期','籍贯','户口所在地',
// '生源地','出生地','血型名称',
// '港澳台侨外','国籍/地区','学生类型'],
// document.getElementsByClassName('basicInf')[0]);

// insertInf([
//     '年级','学院名称','系名称',
//     '专业方向','班级名称','专业名称',
//     '学制','学籍状态','',
//     '是否在校','报到注册状态','报到注册备注',
//     '撤销报到注册原因','报到时间','注册时间',
//     '','未报到原因','未注册原因',
//     '学历层次','培养方式','培养层次',
//     '学生类别','招生季度','所属学院',
//     '招生专业','招生年度',''],
// document.getElementsByClassName('statusInf')[0]
// );
// insertInf([
//     '考生号','报到号','考生类别',
//     '考生来源','婚姻状况','是否走读生',
//     '毕业中学','学生证号','银行名称',
//     '银行卡号','身高','体重',
//     '特长','健康状况','户籍性质',
//     '入学方式','入学总分','准考证号',
// ],
// document.getElementsByClassName('otherInf')[0]);



const control = {
    '基本信息': 'basicInf',
    '学籍信息': 'statusInf',
    '其他信息': 'otherInf'
}
document.getElementsByClassName('c-box')[0].onclick = function (event: any) {

    event = event || window.event;
    const target = event.target || event.srcElement;
    Array.from(this.children).forEach(function (ele) {
        document.getElementsByClassName(control[ele.innerHTML])[0].style.display = 'none';
        ele.classList.remove('active');
    })
    target.classList.add('active');
    document.getElementsByClassName(control[target.innerHTML])[0].style.display = 'block';
}

// function insertInf(title: Array,grandfather:any) {
//     for (let i = 0; i < title.length; ) {
//         let father: any = document.createElement('div');
//         father.classList.add('row');
//         father.classList.add('clearfix');
//         father.innerHTML = `
//         <div class="clearfix col-3 fl">
//         <div class="leftTips fl">
//             ${title[i++]}:
//         </div>
//         <span class="stuId col-4"></span>
//         </div>  
//         <div class="clearfix col-3 fl">
//             <div class="leftTips fl">
//                 ${title[i++]}:
//             </div>
//             <span class="stuName col-4"></span>
//         </div>
//         <div class="clearfix col-3 fl">
//             <div class="leftTips fl">
//                 ${title[i++]}:
//             </div>
//             <span class="stuName col-4"></span>
//         </div>
//         `;
//         grandfather.appendChild(father);
//     }
// }


function insertInf(data: any, grandfather: any,orginal:any) {

    // 先用orginal把data中的属性替换
    const title = replaceProp(data,orginal);
    console.log(title);
    let father: any;
    let i: number = 0;
    for (let prop in title) {
        if (i % 3 === 0) {
            father = document.createElement('div');
            father.classList.add('row');
            father.classList.add('clearfix');
        }

        father.innerHTML += `
            <div class="clearfix col-3 fl">
                <div class="leftTips fl">
                ${prop}:
                </div>
                <span class="stuId col-4">${title[prop]}</span>
            </div>  
            `;
        if (i % 3 === 0) {
            grandfather.appendChild(father);
        }
        i++;
    }
    if (i % 3 !== 0) {
        grandfather.appendChild(father);
    }
}


function replaceProp(data:any,orginal:any):any{
    let res = {};
    for(let prop1 in data){
        let find = false;
        for(let prop2 in orginal){
            if(prop1 === prop2){
                res[orginal[prop1]] = data[prop1];
                find = true;
                break;
            }
        }
        if(find === false){
            throw Error('出错了');
        }
    }
    return res;
}

const basic = {
    'stuNum': '学号',
    'name': '姓名',
    'nameSpell': '姓名拼音',
    'sex': '性别',
    'birthday': '出生日期',
    'idCard': '证件号码',
    'nation': '汉族',
    'enrollmentDate': '入学日期',
    'nativePlace': '籍贯'
};

const studentStatus = {
    'grade':'年级',
    'whetherOrNotIntheSchool':'是否在校',
    'trainingLevel':'培养层次',
    'nameOfCollege':'学院名称',
    'className':'班级名称',
    'registrationStatus':'报到注册状态',//报到注册状态
    'nameOfMajor':'专业名称',
    'lengthOfSchooling':'学制',
    'status':'学籍状态',
    'majorID':'招生专业'
};
const other = {
    'examineeID':'考生号'
};


(function () {
    ajax("post", "http://www.xinill.cn:80/user/inform/getAll", ``, function (xml) {
        let res = JSON.parse(xml.responseText);
        console.log(res);
        if (res.status === 0) {
            document.getElementsByClassName('stuId')[0].innerHTML = res.data.basicInf.stuNum;
            document.getElementsByClassName('stuName')[0].innerHTML = res.data.basicInf.name;
            insertInf(res.data.basicInf,
                document.getElementsByClassName('basicInf')[0],
                basic);
            insertInf(res.data.studentStatusInf,
                document.getElementsByClassName('statusInf')[0],
                studentStatus);
            insertInf(res.data.otherInf,
                document.getElementsByClassName('otherInf')[0],
                other);

        } else {
            alert('查询数据失败，请联系管理员\n' + res.msg);
            window.location.href = 'index.html';
        }
    }, function (xml) {

    }, localStorage.token)

})();





