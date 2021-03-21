var yeartext: string | any = document.getElementById("yeartext");
var yeartext1: string | any = document.getElementById("yeartext1");

var year1: any = document.getElementsByClassName("year1");
var year: any = document.getElementsByClassName("year");

var determine: any = document.getElementById("determine");
var scoreTable: any = document.getElementById("scoreTable");

let token3 = localStorage.token;


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
    }, function (xml:any) {},token3);
}

//防止重复
function rclears() {
  let needClears: any = document.getElementsByClassName("clears");
  let i=0;
  while(i<needClears.length){
      needClears[i].parentNode.removeChild(needClears[i]);
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

