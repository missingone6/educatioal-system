// let ajax:any = require("./js/Ajax.js")

var yeartext: string | any = document.getElementById("yeartext");
var yeartext1: string | any = document.getElementById("yeartext1");

var year1: any = document.getElementsByClassName("year1");
var year: any = document.getElementsByClassName("year");

var determine: any = document.getElementById("determine");
var scoreTable: any = document.getElementById("scoreTable");
let inp: any = document.getElementById("inp");
let defines: any = document.getElementById("defines");

let token1=localStorage.token;
let data_public :any;

//ajax
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

function change1(): void {
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
change1();
determine.onclick = () => {
    // console.log("1")
    let num:Array<string> = yeartext.innerText.split("-")
    // let xml:any;
    let num1:string = yeartext1.innerText;
    // console.log(num1)
    let data =ajax("post","http://www.xinill.cn:80/class/confirm",`schoolyear=${num[0]}&term=${num1}`,function (xml:any) {
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
            data_public = res.data;
            reclears(res.data);
            addItem(res.data);
        }
        else {
            alert(res.msg);
        }
    }, function (xml:any) {},token1);
    // console.log(data)
    
};
//发送确认请求
defines.onclick = () => {
  let inp: any = document.getElementsByClassName("inp2");
  let arr: Array<string> = [];
  let j:number=0;
  for (let i of inp) {
    console.log(i);
    if (i.checked ) {
      if(i.classList.contains("inp")==true){
        arr.push(data_public[j].cid);
      }     
      j++;
      console.log("aaa")
    }
  }
  console.log(arr)
  ajax("post","http://www.xinill.cn:80/class/setChooseStatement",`cid=${arr}`,function (xml:any) {
        let res = JSON.parse(xml.responseText);
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
    }, function (xml:any) {},token1);
  console.log(arr);
};

inp.onclick = () => {
  let input: any = document.getElementsByClassName("inp");
  if (inp.checked) {
    for (let i = 0; i < input.length; i++) {
      input[i].checked = true;
    }
  } else {
    for (let i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
  }
};
//防止重复
function reclears(data:any) {
  let needClears: any = document.getElementsByClassName("clears");
  let i=0;
    while(i<needClears.length){
        needClears[i].parentNode.removeChild(needClears[i]);
    }
}
//添加列表
function addItem(data:any): any {
  console.log(data)
            for (let j in data) {
            let ul: any = document.createElement("ul");
            ul.classList.add("clears");
            for (let k in data[j]) {
              if(k=='cid'){
                continue;
              }
              if (k == "schoolyear") {
                let li: any = creatli();
                let input: any = document.createElement("input");
                input.setAttribute("type", "checkbox");
                if(data[j].state=="已确认"){
                  input.classList.add("inp2");
                  input.classList.add("inp1");
                  input.checked = true;
                }else{
                  input.classList.add("inp2");
                  input.classList.add("inp");
                }
                
                li.appendChild(input);
                ul.appendChild(li);
              }
              // console.log(data[j])
              let li: any = creatli();
              li.innerHTML = data[j][k];
              ul.appendChild(li);
            }
            ul.classList.add("tableline");
            scoreTable.appendChild(ul);
          }
   
  
}
//创建li
function creatli(): any {
  let li = document.createElement("li");
  li.classList.add("tableTop");
  // li.classList.add("cbf0f0f0");
  li.classList.add("fl");
  li.classList.add("td");
  li.classList.add("tabs");
  return li;
}

