'use strict';

let chMoveX;                                                                    //移動値変更要素X
let chMoveY;                                                                    //移動値変更要素Y

function inviolable(){
  chMoveX = 0;
  chMoveY = 0;
  console.log('移動禁止');
}
function slowDown(gMoveX, gMoveY){
  //parseInt(gMoveX /= 2, 10);
  //parseInt(gMoveY /= 2, 10);
  chMoveX = gMoveX / 2;
  chMoveY = gMoveY / 2;
  console.log('slow down');
}
function sacredSand(){
  if(gHP < gMHP){
    if(Math.random() * 20 < 1){                                             //ランダムで体力回復
    gHP += Math.floor(gMHP / 20);
    console.log('ランダムで体力回復');
    }    
  } else{}
}
function rapidStream(){
  gPlayerX += TILESIZE;
  gPlayerY += TILESIZE;
  setMessage('強い流れに押し流される', null);
  console.log('渦潮');
}
function poison(){
  if(gHP == 1){
    gHP = 0;
  } else if( 2 <= gHP && gHP <= 4 ){
    gHP = 1;
  } else {
    gHP = Math.floor( gHP/4 ) + gHP % 4;
  }
  setMessage('猛毒に身体が蝕まれる', null);
  console.log('毒')                                    // HPが1の場合は0を代入、HPが2<=4ならば1を代入、HPが5以上ならば4で割った商+余りを代入
}
function magma(){
  if(gHP == 1){
    gHP = 0;
  } else {
    gHP = 1;
  }
  setMessage('マグマが身体を焼く', null);
  console.log('マグマ')                                 // HPに0を代入
}
function sacredPlace(){
  if(gEnforce == 0){
    gMHP += 100;
    gEnforce = 1;
  }
  gHP = gMHP;
  if(gTalk == 0){
    setMessage ('懐かしい声を聞いた気がした', '”いってらっしゃい”とその声は言った');
    gTalk = 1;
  } 
}
function secretPassage(){
  gPlayerX = 8 * TILESIZE + TILESIZE / 2;           //プレイヤー座標X       //ワープ処理
  gPlayerY = 25 * TILESIZE + TILESIZE / 2;           //プレイヤー座標X
  gMoveX = 0;
  gMoveY = 0;
  console.log('ワープ')
}
function placeOfSword(){
  if(gTalk == 0){
  if (IsBoss == 3 && gSword < 2){
    setMessage('" 勇者のつるぎ "を見つけた！', '攻撃力が上がった');
    gSword = 2;
  } else if (gSword == 0 && gLv < 10){
    setMessage('" 奇跡のつるぎ "を見つけた！', '会心の一撃を放てるようになった');
    gSword = 1;
  } else if( gSword > 0 ){
    setMessage('元の装備に戻した', null);
    gSword = 0;
  }
  gTalk = 1;
  }    
}
function cave(){
  if(gTalk == 0){
  setMessage('” 俊足の靴 ”を手に入れた！', '移動速度が上がった');
  SCROLL *= 2;
  if (SCROLL >= 3){
    setMessage('元の靴に履き替えた', '通常の移動速度に戻った');
    SCROLL = 1;
  }
  gTalk == 1;
  }
}
function setHintI(){
  setMessage('兵士の亡骸が血で滲んだメモを握っている', '”北•の•に••城•のカ•がある”')
}
function setHintII(){
  setMessage  ('墓標の下にこそ祝福あり', null);
}

