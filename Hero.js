'use storict';

const CHRHEIGHT = 16;                                       //キャラの高さ
const CHRWIDTH =16;                                         //キャラの幅
const START_HP = 20;                                        //初期HP
const gFilePlayer = "image/Hero01_mate.png";                //プレイヤー画像

let gEx;                                                //プレイヤーの経験値
let gHP;                                         //プレイヤーのHP
let gMHP;                                        //プレイヤーの最大HP
let gLv;                                                //プレイヤーのレベル 
let gSpeed;                                        //素早さ
let gItem;                                              //所持アイテム
let gSword;                                             //隠し武器要素
let gEnforce;                                           //隠し強化要素
let gImgPlayer;                                             //プレイヤー画像


function StartStatus(){
  gEx = 0;                                                //プレイヤーの経験値
  gHP = START_HP;                                         //プレイヤーのHP
  gMHP = START_HP;                                        //プレイヤーの最大HP
  gLv = 1;                                                //プレイヤーのレベル 
  gSpeed = SCROLL;                                        //素早さ
  gItem = 0;                                              //所持アイテム
  gSword = 0;                                             //隠し武器要素
  gEnforce = 0;                                           //隠し強化要素
  return;
}

function DrawHero(g){
  gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;           //プレイヤー画像読み込み
  g.drawImage(gImgPlayer,                                             //まだ定義していない描画関数にプレイヤーの情報を渡す
    (gFrame >> 3 & 1) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
    WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);
}
