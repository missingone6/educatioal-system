var yeartext: string | any = document.getElementById("yeartext");
var yeartext1: string | any = document.getElementById("yeartext1");

var year1: any = document.getElementsByClassName("year1");
var year: any = document.getElementsByClassName("year");

var determine: any = document.getElementById("determine");
var scoreTable: any = document.getElementById("scoreTable");

function ajax(method:string,url:string,data:string,success:any,fail:any,token:string){
    
  let xml:any;
  if(window.XMLHttpRequest){
      xml = new XMLHttpRequest();
  }
  else{
      xml = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if(method.toLowerCase() === 'post'){
      xml.open(method,url,true);
      xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      if(token){
          xml.setRequestHeader("token",token);
      }
      xml.send(data);
  }
  else if(method.toLowerCase() === 'get'){
      xml.open(method,`url?${data}`,true);
      xml.send();
  }
  xml.onreadystatechange = function(){
      if(xml.readyState == 4 ){
          if(xml.status == 200){
              success(xml);
          }else{
              fail(xml);
          }
      }
  }  
  // return xml;  
}

// var Datas:any = {
// 	'state': 0, // 状态码响应
// 	'msg':"", //提示信息
//     'data': 
//     {
//        1:{
//         "schoolyear":"2020",       //学年
//         'term':'2',                 //学期
//         'course':'数据结构',        //课程名称
//         'time':'1.11 8:00-10:00',   //考试时间
//         'place':'fz233',            //考试地点
//         'campus':'长安校区东区',    //考试校区
//         'seatnumber':'22',          //座位号
//         'again':'否',               //是否重修
//         'id':'04191199',            //学号
//         'name':'张三',             //姓名
//         'sex':'女',                 //性别
//         'className':'计科2001',         //班级
//         'teacher':'章',             //教师
//         'setup':'计算机院',         //开设学院
//         'testnumber':'xt007',       //试卷编号
//         'grade':'2020',             //年级
//         'college':'计算机学院',     //所在学院
//         'testtype':'院考',         //考试类别
//         'isChooseClass':'是',//是否为选修课
//        },
//        2:{
//         "schoolyear":"2020",       //学年
//         'term':'2',                 //学期
//         'course':'数据结构',        //课程名称
//         'time':'1.11 8:00-10:00',   //考试时间
//         'place':'fz233',            //考试地点
//         'campus':'长安校区东区',    //考试校区
//         'seatnumber':'22',          //座位号
//         'again':'否',               //是否重修
//         'id':'04191199',            //学号
//         'name':'张三',             //姓名
//         'sex':'女',                 //性别
//         'className':'计科2001',         //班级
//         'teacher':'章',             //教师
//         'setup':'计算机院',         //开设学院
//         'testnumber':'xt007',       //试卷编号
//         'grade':'2020',             //年级
//         'college':'计算机学院',     //所在学院
//         'testtype':'院考',         //考试类别
//         'isChooseClass':'是',//是否为选修课
//        }
// 	}
// }

function change2(): void {
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
  change2();
  determine.onclick = () => {
    let num:Array<string> = yeartext.innerText.split("-")
    // let xml:any;
    let num1:string = yeartext1.innerText;
    ajax("post","http://www.xinill.cn:80/class/examination",`schoolyear=${num[0]}&term=${num}`,function (xml:any) {
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
            
           //获取数据
            rclears();
            addItems(res.data);
        }
        else {
            alert(res.msg);
        }
    }, function (xml:any) {},localStorage.token);
}

//防止重复
function rclears() {
  let needClears: any = document.getElementsByClassName("clears");
  for (let i = 0; i < needClears.length; i++) {
    while (needClears.hasChildNodes()) {
      needClears.removeChild(needClears.lastChild);
    }
  }
}
//添加列表
function addItems(Datas:any): any {
  // console.log("1")
  for (let i in Datas) {
    let ul: any = document.createElement("ul");
    ul.classList.add("clears");
    // console.log(data[i]);
      for (let j in Datas[i]) {
          let li: any = creatli1();
          li.innerHTML = Datas[i][j];
          ul.appendChild(li);
      }
      ul.classList.add("tableline");
      scoreTable.appendChild(ul);
  }
}
//创建li
function creatli1(): any {
  let li = document.createElement("li");
  li.classList.add("tableTop");
  // li.classList.add("cbf0f0f0");
  li.classList.add("fl");
  li.classList.add("td");
  li.classList.add("tabs");
  return li;
}

