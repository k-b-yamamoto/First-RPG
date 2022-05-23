'use strict';

let StatusLog = [];                           //ステータスのデータログ

//データロード
function LoadData(){
  /*
  console.log('gHp = ' + StatusLog[0]);
  console.log('gMHp = ' + StatusLog[1]);
  console.log('gex = ' + StatusLog[2]);
  console.log('glv = ' + StatusLog[3]);
  console.log('genforce = ' + StatusLog[4]);
  console.log('gitem = ' + StatusLog[5]);
  console.log('gspeed = ' + StatusLog[6]);
  console.log('gsword = ' + StatusLog[7]);
  console.log('gplayerx = ' + StatusLog[8]);
  console.log('gplayerY = ' + StatusLog[9]);
  */
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
  }
}

//セーブ処理
function Save(){
StatusLog = [gHP, gMHP, gEx, gLv, gEnforce, gItem, gSpeed, gSword, gPlayerX, gPlayerY];
for(let i = 0; i < StatusLog.length;i ++){
  console.log('ステータスログの中身 = ' + StatusLog[i]);
}
}
