'use strict';

let StatusLog = [];                           //ステータスのデータログ

//データロード
function LoadData(){
  if(!StatusLog.length){                   //まだセーブデータが存在しない場合
    setStartStatus();                      //初期ステータスを代入
  } else {
  //各ステータスにログの内容を代入
    gHP = Math.round(gMHP / 3);
    gMHP = StatusLog[1];
    gEx = StatusLog[2];
    gLv = StatusLog[3];
    gEnforce = StatusLog[4];
    gItem = StatusLog[5];
    gSpeed = StatusLog[6];
    gSword = StatusLog[7];
    gPlayerX = StatusLog[8];
    gPlayerY = StatusLog[9];
    gAvoid = StatusLog[10];
  }
}

//セーブ処理
function Save(){
StatusLog = [gHP, gMHP, gEx, gLv, gEnforce, gItem, gSpeed, gSword, gPlayerX, gPlayerY, gAvoid];
/*
for(let i = 0; i < StatusLog.length;i ++){
  console.log('ステータスログの中身 = ' + StatusLog[i]);
}
*/
}
