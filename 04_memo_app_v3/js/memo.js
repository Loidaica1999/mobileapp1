"use strict";

window.addEventListener("DOMContentLoaded",
function() {
    if(typeof localStorage === "undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else{
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        selectTable();
        allClearLocalStorage();
        
    }
 },
);

// 2.LocalStoreへの保存
function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        //値の入力チェック //version 4
        if(key=="" || value ==""){
            Swal.fire({
                title : "Memo app"
             ,  html :"Key,Memoはいずれも必須です。" 
             ,  type :"error"
             , allowOutsideClick : false
            });
            return;
        }else{
            let w_msg ="localStorageに\n「" + key + " "+ value +"」\nを保存します。\nよろしいですか";
            Swal.fire({
                title : "Memo app"
             ,  html :w_msg
             ,  type :"question"
             , showCancelButton : true
            }).then(function(result){
                if(result.value === true){
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg ="LocalStorageに" + key + " "+ value +"を保存しました";
                    Swal.fire({
                        title : "Memo app"
                     ,  html :w_msg
                     ,  type :"success"
                     , allowOutsideClick : false
                    });
                    document.getElementById("textKey").value ="";
                    document.getElementById("textMemo").value ="";
        
                }
            })
        
        
        }
    
    },false
  );
};

// 3.LocalStore から一件削除   // version-up3 chg
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
        let w_cnt ="0"; 
        w_cnt = selectCheckBox("del");

        
        if(w_cnt >= "1"){
            //const key = document.getElementById("textKey").value;
            //const value = document.getElementById("textMemo").value;
            let w_msg="localStorageから選択されている"+ w_cnt +"件を削除しますか？";
            Swal.fire({
                title : "Memo app"
             ,  html :w_msg
             ,  type :"question"
             , showCancelButton : true
            }).then(function(result){
                if(result.value === true){
                    for(let i=0; i< chkbox1.length ;  i++){
                        if(chkbox1[i].checked){
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }
                    }
            viewStorage();
            let w_msg ="LocalStorageから" + w_cnt +"件を削除しました";
            Swal.fire({
                title : "Memo app"
             ,  html :w_msg
             ,  type :"success"
             , allowOutsideClick : false
            });
            document.getElementById("textKey").value ="";
            document.getElementById("textMemo").value ="";
        }
        })  
    }
    },false
  );


//version5 add

const table1 = document.getElementById("table1");
table1.addEventListener("click", (e) => {  // eはイベントの対象要素…変数なので、名前はなんでもよい。
    if(e.target.classList.contains("trash") === true){
        let parent = e.target.closest('td');
        let eprev = parent.previousElementSibling;
        let eprevprev = eprev.previousElementSibling;
        let key = eprevprev.firstChild.data;
        let value = eprev.firstChild.data;

        let w_delete = "LocalStorageから選択されている" +key + " " + value+"を削除しますか。";
        Swal.fire({
            title : "Memo app"
            ,html : w_delete
            ,type : "question"
            ,showCancelButton : true
        }).then(result => {
            if(result.value === true){
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "LocalStorageに " +key + " " + value+" を削除しました!";
                Swal.fire({
                    title : "Memo app"
                    ,html : w_msg
                    ,type : "success"
                    ,allowOutsideClick : false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        })
    }
});

};
//version5 add



// 4.LocalStore から全て削除   
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();
        let w_msg ="localStorageのデータを全て削除よろしいですか";
        Swal.fire({
            title : "Memo app"
         ,  html :w_msg
         ,  type :"question"
         , showCancelButton : true
        }).then(function(result){
            if(result.value === true){
            localStorage.clear();
            viewStorage();
            let w_msg ="LocalStorageのデータを全て削除しました。";
            Swal.fire({
                title : "Memo app"
             ,  html :w_msg
             ,  type :"success"
             , allowOutsideClick : false
            });
            document.getElementById("textKey").value ="";
            document.getElementById("textMemo").value ="";
            
        }
    })

    },false
  );
};

// 5.データ選択
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectCheckBox("select");
    },false
  );
};

//テーブルがらデータ選択
function selectCheckBox(mode){
    //let w_sel ="0";//選択されていれば "1"にする
    let w_cnt =0; 
    const chkbox1 =document.getElementsByName("chkbox1");
    const table1 =document.getElementById("table1");
    let w_textKey ="";
    let w_textMemo ="";

    for(let i=0; i< chkbox1.length ;  i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
            w_textKey = table1.rows[i+1].cells[1].firstChild.data;
            w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
    
           // return w_sel ="1";
        } // version -up2 add
        w_cnt++;
     }
    }

    document.getElementById("textKey").value=w_textKey;
    document.getElementById("textMemo").value = w_textMemo; 
    //選択されているチェックボックスの数  
    if(mode === "select"){　//version-up3 add
        if(w_cnt === 1){
            return w_cnt;
        }else{
            Swal.fire({
                title : "Memo app"
             ,  html :"1つ選択(select)してください。" 
             ,  type :"error"
             , allowOutsideClick : false
            });
            return;
        }
    }      // version-up3 add
    //削除ボタンを押されたときのチェックボックスの数  
    if(mode === "del"){
        if(w_cnt >= 1){
            return w_cnt;
        }else{
            window.alert("1つ以上選択(select)してください。");
        }
    }
    
};

// localStorageからのデータたの取得とテーブルへ表示 
function viewStorage(){

    const list = document.getElementById("list");
    // htmlのデータ初期化
        while(list.rows[0] )list.deleteRow(0);

    // localStorage全ての情報の取得
    for(let i = 0; i < localStorage.length;i++){
        let w_key = localStorage.key(i);

    // localStorage のキーと値を表示    
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    td1.innerHTML ="<input name ='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
    td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

    $("#table1").tablesorter({
        sortList:[[1, 0]]
    });

    $("#table1").trigger("update");
}