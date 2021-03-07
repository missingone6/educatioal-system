"use strict";
insertInf(['学号', '姓名', '姓名拼音',
    '曾用名', '英文姓名', '性别',
    '证件类型', '证件号码', '出生日期',
    '民族', '政治面貌加入时间', '政治面貌',
    '入学日期', '籍贯', '户口所在地',
    '生源地', '出生地', '血型名称',
    '港澳台侨外', '国籍/地区', '学生类型'], document.getElementsByClassName('basicInf')[0]);
insertInf([
    '年级', '学院名称', '系名称',
    '专业方向', '班级名称', '专业名称',
    '学制', '学籍状态', '',
    '是否在校', '报到注册状态', '报到注册备注',
    '撤销报到注册原因', '报到时间', '注册时间',
    '', '未报到原因', '未注册原因',
    '学历层次', '培养方式', '培养层次',
    '学生类别', '招生季度', '所属学院',
    '招生专业', '招生年度', ''
], document.getElementsByClassName('statusInf')[0]);
insertInf([
    '考生号', '报到号', '考生类别',
    '考生来源', '婚姻状况', '是否走读生',
    '毕业中学', '学生证号', '银行名称',
    '银行卡号', '身高', '体重',
    '特长', '健康状况', '户籍性质',
    '入学方式', '入学总分', '准考证号',
], document.getElementsByClassName('otherInf')[0]);
const control = {
    '基本信息': 'basicInf',
    '学籍信息': 'statusInf',
    '其他信息': 'otherInf'
};
document.getElementsByClassName('c-box')[0].onclick = function (event) {
    event = event || window.event;
    const target = event.target || event.srcElement;
    Array.from(this.children).forEach(function (ele) {
        console.log(document.getElementsByClassName(control[ele.innerHTML])[0]);
        document.getElementsByClassName(control[ele.innerHTML])[0].style.display = 'none';
        ele.classList.remove('active');
    });
    target.classList.add('active');
    document.getElementsByClassName(control[target.innerHTML])[0].style.display = 'block';
    console.log(event);
};
function insertInf(title, grandfather) {
    for (let i = 0; i < title.length;) {
        let father = document.createElement('div');
        father.classList.add('row');
        father.classList.add('clearfix');
        father.innerHTML = `
        <div class="clearfix col-3 fl">
        <div class="leftTips fl">
            ${title[i++]}:
        </div>
        <span class="stuId col-4"></span>
        </div>  
        <div class="clearfix col-3 fl">
            <div class="leftTips fl">
                ${title[i++]}:
            </div>
            <span class="stuName col-4"></span>
        </div>
        <div class="clearfix col-3 fl">
            <div class="leftTips fl">
                ${title[i++]}:
            </div>
            <span class="stuName col-4"></span>
        </div>
        `;
        grandfather.appendChild(father);
    }
}
