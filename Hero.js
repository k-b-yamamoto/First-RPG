'use storict';

const CHRHEIGHT = 16;                                       //キャラの高さ
const CHRWIDTH =16;                                         //キャラの幅
const START_HP = 20;                                        //初期HP
const START_Ex = 0;
const START_Lv = 1;
const START_Enforce = 0;
const START_Item = 0;
const START_Speed = SCROLL;
const START_Sword = 0;
const START_X = 8;                        //スタート位置x
const START_Y = 6;                        //スタート位置y
let gPlayerX;           //プレイヤー座標X
let gPlayerY;           //プレイヤー座標Y
const gFilePlayer = "image/Hero01_mate.png";                //プレイヤー画像

let gHP;                                                    //プレイヤーのHP
let gMHP;                                                   //プレイヤーの最大HP
let gEx;                                                    //プレイヤーの経験値
let gLv;                                                    //プレイヤーのレベル 
let gEnforce;                                               //隠し強化要素
let gItem;                                                  //所持アイテム
let gSpeed;                                                 //素早さ
let gSword;                                                 //隠し武器要素
let gImgPlayer;                                             //プレイヤー画像
let gAngle = 0;                                             //プレイヤーの向き

function setStartStatus(){
  gHP = START_HP;                                         //プレイヤーのHP
  gMHP = START_HP;                                        //プレイヤーの最大HP
  gEx = START_Ex;                                                //プレイヤーの経験値
  gLv = START_Lv;                                                //プレイヤーのレベル 
  gEnforce = START_Enforce;                                           //隠し強化要素
  gItem = START_Item;                                              //所持アイテム
  gSpeed = START_Speed;                                        //素早さ
  gSword = START_Sword;                                             //隠し武器要素
  gPlayerX = START_X * TILESIZE + TILESIZE / 2;           //プレイヤー座標X
  gPlayerY = START_Y * TILESIZE + TILESIZE / 2;           //プレイヤー座標Y

  return;
}

//経験値加算関数
function GetExp( val ) {
  gEx += val;                                          //経験値加算
  setMessage(`${val} pt の経験値を獲得`, null);
  while( gLv * ( gLv + 1) * 2 <= gEx){                 //レベルアップ条件
    gLv++;                                             //レベルアップ
    gMHP += 4 + Math.floor( Math.random() * 3 );       //最大HP上昇(4~6)
    gHP = Math.min(gHP + Math.floor(gMHP / 5), gMHP);  //レベルアップ時体力を一定回復
    gMessage2 = 'レベルが上がった！';
  }
}


function DrawHero(g){
  gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;           //プレイヤー画像読み込み
  g.drawImage(gImgPlayer,                                             //まだ定義していない描画関数にプレイヤーの情報を渡す
    (gFrame >> 3 & 1) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
    WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);
}
