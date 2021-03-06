'use strict';

let EnemyNumber = null;                                               //モンスター引数


const gFileMonster = [
  { name: '地獄蟲', url : "Image/monster-image/m90.png"},
  { name:'キャットボーイ', url: "Image/monster-image/m69b.png"},
  { name: 'スフィンクス', url : "Image/monster-image/m63.png"},
  { name: 'カルゴラ', url : "Image/monster-image/m89.png"},
  { name:'サタン', url : "Image/monster-image/m61.png"},
  { name: 'ナイトドラゴン', url : "Image/monster-image/m87.png"}, 
  { name: '金剛の騎士', url : "Image/monster-image/m19.png"},
  { name: '暗黒の騎士', url : "Image/monster-image/m36.png"},
  { name: 'オーディン', url : "Image/monster-image/m62.png"},
  { name:'ヒュドラ', url : "Image/monster-image/m65.png" }
];                                                                      //モンスター画像
let gImgMonster;                                            //モンスター画像
let gEnemyName;
let gEnemyHP ;                                              //敵のHP設定
let gEnemyMHP;                                              //敵の初期HP

const Monster = class{

  get getEnemyHP(){
    return this.gEnemyHP;
  }
  set setEnemyHp(gEnemyHP){
    this.gEnemyHP = gEnemyHP;
    console.log('monsterのHPを' + gEnemyHP + 'に変更しました');
  }

  get getEnemyMHP(){
    return this.gEnemyMHP;
  }
  set setEnemyMHp(EnemyNumber){
    this.gEnemyMHP = EnemyNumber * 3 + 5;                             //敵のHP設定
  }

  get getEnemyName(){
    return this.gEnemyName;
  }
  set setEnemyName(EnemyNumber){
    this.gEnemyName = gFileMonster[EnemyNumber].name;
  }

  get getGImgEnemy(){
    return this.gImgEnemy;
  }
  // set setGImgEnemy(EnemyNumber){
  //   this.gImgEnemy = gFileMonster[EnemyNumber].url;
  // }

  // constructor(EnemyNumber){
  //   console.log('EnemyNumber = ' + EnemyNumber);
  //   // gImgEnemy = setGImgEnemy(EnemyNumber);
  //   gEnemyName = gFileMonster[EnemyNumber].name;
  //   gEnemyMHP = EnemyNumber * 3 + 5;
  //   gEnemyHP = gEnemyMHP;
  //   // monster.setEnemyName(EnemyNumber);
  //   // monster.setEnemyMHp(EnemyNumber);
  //   // monster.setEnemyHp(gEnemyMHP);
  // }
}

function AppearEnemy(){
  gPhase = 1;                                          //敵出現フェイズ
  //console.log(gFileMonster[T].name);
  BossEvent();
  if(IsBossClass){
    setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard); //BossClassNumber取得
    getBossMessage(BossClassNumber, gPhase);                            //メッセージ取得
    setMessage(M1, M2);                                    //メッセージ表示
  } else {
    setMessage ('魔物が襲いかかってきた！', null);            //ランダムエンカウント
  }
}


// function setEnemyHp(EnemyNumber){
//   gEnemyMHP = EnemyNumber * 3 + 5;                             //敵のHP設定
//   gEnemyHP = gEnemyMHP;
//   return;
// }

function setMonsterNumber(){                            //敵のランダム選択と描画
  if(EnemyNumber == null){
    EnemyNumber = Math.abs( hero1.getPlayerX / TILESIZE - START_X) +
        Math.abs( hero1.getPlayerY / TILESIZE - START_Y);
    if( Math.random() * 5 < 1){
      EnemyNumber = Math.min(Math.floor( EnemyNumber / gFileMonster.length + EnemyNumber % gFileMonster.length), gFileMonster.length -1);         //敵強化＋上限処理
      //console.log('乱数変更');
      //console.log('モンスター番号＝ ' + EnemyNumber);
    } else {
      EnemyNumber = Math.floor(Math.min(EnemyNumber / Math.floor(TILESIZE / 3), gFileMonster.length - 1));
      //console.log('モンスター番号＝ ' + EnemyNumber);
    }
    if((332 <= gPlayerX && gPlayerX <= 430) && (12 <= gPlayerY && gPlayerY <= 104)){
      //console.log('判定強化');
      EnemyNumber = Math.min(EnemyNumber + 1, gFileMonster.length - 1);
    }
    if((288 <= gPlayerX && gPlayerX <= 450) && (276 <= gPlayerY && gPlayerY <= 428)){
      //console.log('判定強化');
      EnemyNumber = Math.min(EnemyNumber + (1 + Math.floor(Math.random() * 5)), gFileMonster.length - 1);
    }
    //console.log(gFileMonster[EnemyNumber].name);
    //console.log(gFileMonster[EnemyNumber].url);
  }
  return EnemyNumber;
}

function DrawMonster(EnemyNumber,g){
  gImgMonster = new Image(); 
  gImgMonster.src = gFileMonster[EnemyNumber].url; //モンスター画像読み込み    
  g.drawImage( gImgMonster, WIDTH / 2 - gImgMonster.width / 4, HEIGHT / 2 - gImgMonster.height / 4, gImgMonster.width / 2, gImgMonster.height / 2);
}
