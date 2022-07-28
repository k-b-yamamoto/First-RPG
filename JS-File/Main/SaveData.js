'use strict';
let StatusLog = [];                           //ステータスのデータログ


//データロード
function LoadData(){
  if(!StatusLog.length){                   //まだセーブデータが存在しない場合
    // setStartStatus();                      //初期ステータスを呼び出し
    hero1.setHp = StartStatus[0];
    hero1.setMhp = StartStatus[1];
    hero1.setGEx = StartStatus[2];
    hero1.setLv = StartStatus[3];
    hero1.setEnforce = StartStatus[4];
    hero1.setGItem = StartStatus[5];
    hero1.setSpeed = StartStatus[6];
    hero1.setGSword = StartStatus[7];
    hero1.setPlayerX = StartStatus[8] * TILESIZE + TILESIZE / 2;
    hero1.setPlayerY = StartStatus[9] * TILESIZE + TILESIZE / 2;
    hero1.setGAvoid = StartStatus[10];
  } else {
  //各ステータスにログの内容を代入
    hero1.setHp = Math.round(hero1.getMhp / 3);
    hero1.setMhp = StatusLog[1];
    hero1.setGEx = StatusLog[2];
    hero1.setLv = StatusLog[3];
    hero1.setEnforce = StatusLog[4];
    hero1.setGItem = StatusLog[5];
    hero1.setSpeed = StatusLog[6];
    hero1.setGSword = StatusLog[7];
    hero1.setPlayerX = StatusLog[8];
    hero1.setPlayerY = StatusLog[9];
    hero1.setGAvoid = StatusLog[10];
  }
}

//セーブ処理
function Save(){
StatusLog = [hero1.getHp, hero1.getMhp, hero1.getGEx, hero1.getLv, hero1.getEnforce, hero1.getGItem, hero1.getSpeed, hero1.getGSword, hero1.getPlayerX, hero1.getPlayerY, hero1.getGAvoid];
/*
for(let i = 0; i < StatusLog.length;i ++){
  console.log('ステータスログの中身 = ' + StatusLog[i]);
}
*/
}
