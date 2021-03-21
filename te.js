function removeClear() {
    let child= document.getElementsByClassName("clear");
    // console.log(child)
    // for(let i=0;i<child.length;i++){
    //     child[child.length-1].parentNode.removeChild(child[child.length-1]);
    //     // child.removeChild(child.lastchild);
    //     // while(child.hasChildNodes()){
    //     //     child.removeChild(child.lastchild);
    //     // }
    // }
    let i=0;
    while(i<child.length){
        child[i].parentNode.removeChild(child[i]);

    }
   
}
removeClear();