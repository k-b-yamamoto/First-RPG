'use strict';

let gImgMonster;                                            //モンスター画像

const gFileMonster = [
  { name: '地獄蟲', url : "image/monster-image/m90.png"},
  { name:'キャットボーイ', url: "image/monster-image/m69b.png"},
  { name: 'スフィンクス', url : "image/monster-image/m63.png"},
  { name: 'カルゴラ', url : "image/monster-image/m89.png"},
  { name:'サタン', url : "image/monster-image/m61.png"},
  { name: 'ナイトドラゴン', url : "image/monster-image/m87.png"}, 
  { name: '金剛の騎士', url : "image/monster-image/m19.png"},
  { name: '暗黒の騎士', url : "image/monster-image/m36.png"},
  { name: 'オーディン', url : "image/monster-image/m62.png"},
  { name:'ヒュドラ', url : "image/monster-image/m65.png" }
];                                                                      //モンスター画像

let gEnemyHP ;                                              //敵のHP設定
let gEnemyMHP;                                              //敵の初期HP

function setEnemyHp(T){
  gEnemyMHP = T * 3 + 5;                             //敵のHP設定
  gEnemyHP = gEnemyMHP;
  return;
}

function setMonsterNumber(){                            //敵のランダム選択と描画
  if(T === null){
    T = Math.abs( gPlayerX / TILESIZE - START_X) +
        Math.abs( gPlayerY / TILESIZE - START_Y);
    if( Math.random() * 5 < 1){
      T = Math.min(Math.floor( T / gFileMonster.length + T % gFileMonster.length), gFileMonster.length -1);         //敵強化＋上限処理
      //console.log('乱数変更');
      //console.log('モンスター番号＝ ' + T);
    } else {
      T = Math.floor(Math.min(T / Math.floor(TILESIZE / 3), gFileMonster.length - 1));
      //console.log('モンスター番号＝ ' + T);
    }
    if((332 <= gPlayerX && gPlayerX <= 430) && (12 <= gPlayerY && gPlayerY <= 104)){
      //console.log('判定強化');
      T = Math.min(T + 1, gFileMonster.length - 1);
    }
    if((288 <= gPlayerX && gPlayerX <= 450) && (276 <= gPlayerY && gPlayerY <= 428)){
      //console.log('判定強化');
      T = Math.min(T + (1 + Math.floor(Math.random() * 5)), gFileMonster.length - 1);
    }
    //console.log(gFileMonster[T].name);
    //console.log(gFileMonster[T].url);
  }
  return T;
}

function DrawMonster(T,g){
  gImgMonster = new Image(); gImgMonster.src = gFileMonster[T].url; //モンスター画像読み込み    
  g.drawImage( gImgMonster, WIDTH / 2 - gImgMonster.width / 4, HEIGHT / 2 - gImgMonster.height / 4, gImgMonster.width / 2, gImgMonster.height / 2);
}
