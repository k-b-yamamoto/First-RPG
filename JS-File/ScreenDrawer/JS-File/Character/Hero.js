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
const StartStatus = [START_HP, START_HP, START_Ex, START_Lv, START_Enforce, START_Item, START_Speed, START_Sword, START_X, START_Y, START_Speed];
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

const Hero = class {
  constructor(){
    this.gHP = StartStatus[0];
    this.gMHP = StartStatus[1];
    this.gEx = StartStatus[2];
    this.gLv = StartStatus[3];
    this.gEnforce = StartStatus[4];
    this.gItem = StartStatus[5];
    this.gSpeed = StartStatus[6];
    this.gSword = StartStatus[7];
    this.gPlayerX = StartStatus[8] * TILESIZE + TILESIZE / 2;
    this.gPlayerY = StartStatus[9] * TILESIZE + TILESIZE / 2;
    this.gAvoid = StartStatus[10];
    console.log('勇者インスタンスが作成されました');
  }

  get getHp(){
    // console.log('HP = ' + this.gHP);
    return this.gHP;
  }
  set setHp(gHP){
    // console.log('HP = ' + this.gHP);
    this.gHP = gHP;
  }
  get getMhp(){
    // console.log('HP = ' + this.gMHP);
    return this.gMHP;
  }
  set setMhp(gMHP){
    // console.log('HP = ' + this.gMHP);
    this.gMHP = gMHP;
  }
  get getGEx(){
    // console.log('Ex = ' + this.gEx);
    return this.gEx;
  }
  set setGEx(gEx){
    // console.log('Ex = ' + this.gEx);
    this.gEx = gEx;
  }
  get getLv(){
    // console.log('Lv = ' + this.gLv);
    return this.gLv;
  }
  set setLv(gLv){
    // console.log('Lv = ' + this.gLv);
    this.gLv = gLv;
  }
  get getEnforce(){
    return this.gEnforce;
  }
  set setEnforce(gEnforce){
    this.gEnforce = gEnforce;
  }
  get getGItem(){
    return this.gItem;
  }
  set setGItem(gItem){
    this.gItem = gItem;
  }
  get getSpeed(){
    return this.gSpeed;
  }
  set setSpeed(gSpeed){
    this.gSpeed = gSpeed;
  }
  get getGSword(){
    return this.gSword;
  }
  set setGSword(gSword){
    this.gSword = gSword;
  }
  get getPlayerX(){
    // console.log('gplayerx = ' + this.gPlayerX);
    return this.gPlayerX;
  }
  set setPlayerX(gPlayerX){
    this.gPlayerX = gPlayerX;
  }
  set setPlayerY(gPlayerY){
    this.gPlayerY = gPlayerY;
  }
  get getPlayerY(){
    return this.gPlayerY;
  }
  get getGAvoid(){
    return this.gAvoid;
  }
  set setGAvoid(gAvoid){
    this.gAvoid = gAvoid;
  }
}


/*
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
*/

//プレイヤー移動処理関数
function gMove(gMoveX, gMoveY, chMoveX, chMoveY){
    if(chMoveX != null || chMoveY != null){
      gMoveX = chMoveX;
      gMoveY = chMoveY;
    }
    ShoesEffect(gShoes);
    //console.log("SCROLL = " + SCROLL);
    hero1.setPlayerX = hero1.getPlayerX + gMoveX * SCROLL;
    hero1.setPlayerY = hero1.getPlayerY + gMoveY * SCROLL;
    //マップループ処理
    if(hero1.getPlayerX < 0){
      hero1.setPlayerX = MAP_WIDTH * TILESIZE + hero1.getPlayerX; 
    }
    if(hero1.getPlayerX > MAP_WIDTH * TILESIZE){
      hero1.setPlayerX = hero1.getPlayerX % (MAP_WIDTH * TILESIZE);
    }
    if(hero1.getPlayerY < 0){
      hero1.setPlayerY = MAP_HEIGHT * TILESIZE + hero1.getPlayerY; 
    }
    if(hero1.getPlayerY > MAP_HEIGHT * TILESIZE){
      hero1.setPlayerY = hero1.getPlayerY % (MAP_HEIGHT * TILESIZE);
    }   
    /*
    gPlayerX += (MAP_WIDTH * TILESIZE);
    gPlayerX %= (MAP_WIDTH * TILESIZE);
    gPlayerY += (MAP_HEIGHT * TILESIZE);
    gPlayerY %= (MAP_HEIGHT * TILESIZE); 
    */
};


//経験値加算関数
function GetExp( val ) {
  hero1.setGEx = hero1.getGEx + val;                                              //経験値加算
  setMessage(`${val} pt の経験値を獲得`, null);
  while( hero1.getLv * ( hero1.getLv + 1) * 2 <= hero1.getGEx){                     //レベルアップ条件
    hero1.setLv = hero1.getLv + 1;                                                 //レベルアップ
    hero1.setMhp = hero1.getMhp + 4 + Math.floor( Math.random() * 3 );           //最大HP上昇(4~6)
    hero1.setHp = Math.min(hero1.getHp + Math.floor(hero1.getMhp / 5), hero1.getMhp);      //レベルアップ時体力を一定回復
    hero1.setSpeed = hero1.getSpeed + 0.1;
    hero1.setGAvoid = hero1.getGAvoid + 0.1;
    gMessage2 = 'レベルが上がった！';
  }
}

function DrawHero(g){
  gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;             //プレイヤー画像読み込み
  g.drawImage(gImgPlayer,                                             //まだ定義していない描画関数にプレイヤーの情報を渡す
    (gFrame >> 3 & 1) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
    WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);
}