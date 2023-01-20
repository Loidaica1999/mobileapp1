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

        //値の入力チェック 
        if(key=="" || value ==""){
            window.alert("Key,Memoはいずれも必須です。  ");
            return;
        }else{
            let w_confirm =window.confirm("localStorageに\n「" + key + " "+ value +"」\nを保存します。\nよろしいですか");
        if(w_confirm === true){
            localStorage.setItem(key, value);
            viewStorage();
            let w_msg ="LocalStorageに" + key + " "+ value +"を保存しました";
            window.alert(w_msg);
            document.getElementById("textKey").value ="";
            document.getElementById("textMemo").value ="";

        }
        
        }
    
    },false
  );
};

// 3.LocalStore から一件削除   
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        let w_sel ="0";
        w_sel = selectCheckBox();

        
        if(w_sel === "1"){
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            let w_confirm =window.confirm("localStorageに\n「" + key + " "+ value +"」\nを削除しますか");
        if(w_confirm === true){

            localStorage.removeItem(key);
            viewStorage();
            let w_msg ="LocalStorageから" + key + " "+ value +"を削除しました";
            window.alert(w_msg);
            document.getElementById("textKey").value ="";
            document.getElementById("textMemo").value ="";
        }    
        }
    },false
  );
};

// 4.LocalStore から全て削除   
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();
        let w_confirm =window.confirm("localStorageのデータを全て削除よろしいですか");
        if(w_confirm === true){
            localStorage.clear();
            viewStorage();
            let w_msg ="LocalStorageのデータを全て削除しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value ="";
            document.getElementById("textMemo").value ="";
            
        }
    },false
  );
};

// 5.データ選択
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectCheckBox();
    },false
  );
};

//テーブルがらデータ選択
function selectCheckBox(){
    let w_sel ="0";//選択されていれば "1"にする
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
        if(w_cnt === 1){
            return w_sel ="1";
        }else{
            window.alert("1つ選択(select)してください。");
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
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML ="<input name ='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
    }

    $("#table1").tablesorter({
        sortList:[[1, 0]]
    });

    $("#table1").trigger("update");
}