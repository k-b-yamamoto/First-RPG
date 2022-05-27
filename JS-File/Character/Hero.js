'use storict';

const CHRHEIGHT = 16;                                       //キャラの高さ
const CHRWIDTH =16;                                         //キャラの幅
const START_HP = 20;                                        //初期HP
const START_Ex = 0;                                         //初期経験値
const START_Lv = 1;                                         //初期レベル
const START_Enforce = 0;                                    //強化判定要素
const START_Item = 0;                                       //アイテム獲得要素
const START_Speed = 1;                                      //素早さ
const START_Sword = 0;                                      //隠し武器要素
const START_X = 8;                                          //スタート位置x
const START_Y = 6;                                          //スタート位置y
let gPlayerX;                                               //プレイヤー座標X
let gPlayerY;                                               //プレイヤー座標Y
const gFilePlayer = "Image/Hero01_mate.png";                //プレイヤー画像

let gHP;                                                    //プレイヤーのHP
let gMHP;                                                   //プレイヤーの最大HP
let gEx;                                                    //プレイヤーの経験値
let gLv;                                                    //プレイヤーのレベル 
let gEnforce;                                               //隠し強化要素
let gItem;                                                  //所持アイテム
let gSpeed;                                                 //素早さ
let gAvoid;                                                 //回避力
let gSword;                                                 //隠し武器要素
let gImgPlayer;                                             //プレイヤー画像
let gAngle = 0;                                             //プレイヤーの向き


//ステータスに初期値を代入する関数
function setStartStatus(){
  gHP = START_HP;
  gMHP = START_HP;
  gEx = START_Ex;
  gLv = START_Lv;
  gEnforce = START_Enforce;
  gItem = START_Item;
  gSpeed = START_Speed;
  gSword = START_Sword;
  gPlayerX = START_X * TILESIZE + TILESIZE / 2;
  gPlayerY = START_Y * TILESIZE + TILESIZE / 2;
  gAvoid = START_Speed;
  return;
}

//経験値加算関数
function GetExp( val ) {
  gEx += val;                                              //経験値加算
  setMessage(`${val} pt の経験値を獲得`, null);
  while( gLv * ( gLv + 1) * 2 <= gEx){                     //レベルアップ条件
    gLv++;                                                 //レベルアップ
    gMHP += 4 + Math.floor( Math.random() * 3 );           //最大HP上昇(4~6)
    gHP = Math.min(gHP + Math.floor(gMHP / 5), gMHP);      //レベルアップ時体力を一定回復
    gSpeed += 0.1;
    gAvoid += 0.1;
    gMessage2 = 'レベルが上がった！';
  }
}


function DrawHero(g){
  gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;             //プレイヤー画像読み込み
  g.drawImage(gImgPlayer,                                             //まだ定義していない描画関数にプレイヤーの情報を渡す
    (gFrame >> 3 & 1) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
    WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);
}
