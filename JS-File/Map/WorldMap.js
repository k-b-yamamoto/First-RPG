'use strict';
//マップ
const MAP_WIDTH = 32;                     //マップ幅
const MAP_HEIGHT = 32;                    //マップ高さ
const TILESIZE = 16;                      //マスのサイズ
const TILECOLUMN = 8;                     //ドットの桁数
const TILEROW = 8;                        //ドットの行数
const SCR_HEIGHT = 5;                     //画面のタイルサイズ高さの半分
const SCR_WIDTH = 10;                     //画面のタイルサイズ幅の半分
const gFileMap = "Image/[mate]WorldMap8bit.png";                      //マップ画像
let gImgMap = new Image(); gImgMap.src = gFileMap;                    //マップ画像読み込み
const gMap = [
   0,  0, 11,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 16, 11,
  11, 11, 11, 11, 11, 11,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 11,  6,  7,  6, 11,  8,  8,  8,  8,
   8,  8, 11,  0,  0, 11,  8,  8,  8,  8,  8, 11, 11, 11, 11,  8,  8,  8,  8,  8, 11, 11, 11, 11,  7, 23,  7, 11,  8,  8,  8,  8,
   8,  8, 11,  0,  0, 11, 11, 11, 11, 11, 11, 11,  4,  4, 11, 11,  8,  8,  8,  8, 11, 12, 11, 11,  6, 31,  6, 11,  8,  8,  8,  8,
   8,  8, 11, 11,  0,  1,  1,  1,  1,  1,  1,  1,  4,  4,  0, 11,  8,  8,  8, 11, 11,  3, 11, 11,  6, 11,  6, 11,  8,  8,  8,  8, 
   8,  8,  8, 11,  0,  1,  1,  1,  1,  1, 25, 26,  4,  4,  0, 11, 11, 11, 11, 11,  3,  3, 11,  4,  4, 11, 11, 11,  8,  8,  8,  8, 
   8,  8,  8, 11, 11,  1,  1,  5,  5,  5,  1,  1,  1,  4,  4, 15,  4,  4, 15,  1,  2,  2,  2,  1,  1,  1,  1, 11,  8,  8,  8,  8,
   8,  8,   8,  8, 11, 11, 11, 11,  5,  1,  1,  1,  1,  1,  4,  4, 19, 20,  4,  4,  1,  1,  1,  1,  1,  1,  1, 11,  8,  8,  8, 8,
   8,  8,  8,  8,  8,  8,  8, 11,  1,  1,  1,  1,  1,  1,  4,  4, 27, 28,  4,  4,  1,  1,  1,  1,  1,  1,  1, 11,  8,  8,  8,  8, 
   8,  8,  8,  8,  8,  8,  8, 11,  1,  5,  1,  1,  1,  1,  4, 15,  4,  4, 15,  4,  1,  1,  1,  1,  1,  1,  1, 11,  8,  8,  8,  8, 
   8,  8,  8,  8,  8,  8, 11, 11,  5,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1,  1,  1, 11,  8,  8,  8,  8, 
   8,  8,  8,  8,  8, 11, 11,  1,  1,  5,  1,  1,  2,  2,  6,  0,  6,  0,  6,  0,  6,  0,  0,  0,  1,  5,  5, 11,  8,  8,  8,  8, 
   8, 35,  8,  8,  8, 11,  1,  1,  1,  5,  1,  1,  2,  2,  1, 24, 25, 26,  1,  6,  0,  0,  0,  5,  5,  5, 11, 11,  8,  8,  8,  8, 
   8, 35,  8,  8,  8, 11, 11, 11, 24,  5,  1,  1,  1,  1,  0,  0,  0,  1,  6,  0,  0,  0,  0,  5,  5,  5, 11, 11,  8,  8,  8,  8, 
   8, 35,  8,  8,  8,  8,  8, 11, 11,  5, 11, 11, 17,  1,  1,  1,  3,  0,  0,  0,  0,  0,  0, 23,  5,  5,  5, 11,  8,  8,  8,  8, 
   8, 35,  8,  8,  8,  8,  8,  8, 11,  5, 11,  8, 11,  1,  1,  3,  7,  3,  1,  1, 15,  9,  9, 31,  9,  9, 15, 11, 11, 11, 11, 11, 
   8, 35,  8,  8,  8,  8,  8,  8, 11, 11, 11,  8, 11,  1,  1,  3,  7,  3,  1, 15,  1,  1,  1,  1,  1,  1,  1, 15,  1,  1,  1, 11, 
   8, 35,  8,  8,  8,  8,  8,  8,  8,  8,  8, 11, 11,  1,  1,  4,  7,  1, 15,  1,  1,  1,  1,  1,  1,  1,  1,  1, 15,  1, 11, 11, 
   8, 35,  8,  8,  8,  8,  8,  8,  8,  8, 11, 11,  1,  1,  1,  4,  7, 15,  2,  2, 10, 10, 10, 10, 10, 10,  2, 11, 11, 15, 11,  8, 
   8, 35,  8,  8, 11, 11, 11, 11, 11, 11,  1,  1,  1,  1,  0,  0, 15,  0,  0,  2, 10, 10, 10, 10, 10, 10,  2, 11,  8,  8,  8,  8, 
   8, 35,  8,  8, 11,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 15,  9,  0,  0,  2, 10, 10, 21, 22, 10, 10,  2, 11,  8,  8,  8,  8, 
   8, 35,  8,  8, 11, 11, 11,  1,  1,  1,  1,  1,  1,  1,  0, 15,  9,  0,  1,  2, 10, 10, 29, 30, 10, 10,  2, 11,  8,  8,  8,  8, 
   8, 35,  8,  8, 16,  8, 11,  7, 14, 14,  1,  1,  1,  1,  0, 15,  9,  0,  1,  2, 10, 10, 35, 10, 10, 10,  2, 11, 11, 11,  8,  8, 
   8, 35, 11, 11, 11, 11,  7,  5,  5,  5, 16,  1,  1,  1,  7,  3, 15,  0,  1,  2, 10, 10, 35, 10, 10, 10,  2,  1,  1, 11,  8,  8, 
   8,  8,  8, 11, 11,  7,  1,  5,  5,  5, 16,  1,  1,  7,  1,  1,  1, 15,  1,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1, 11,  8,  8, 
   8,  8,  8,  8, 11,  7, 16,  5, 13,  5, 16,  1, 11, 11, 11, 11, 11,  1, 15,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11,  8,  8, 
   8,  8,  8,  8, 11, 11, 16,  5,  5,  5, 16, 11, 11,  8,  8, 11,  1,  1,  1, 15,  1,  1, 11,  1,  1,  1,  1,  1,  1, 11,  8,  8, 
   8,  8,  8,  8,  8, 11, 16, 16, 16, 16, 16,  1, 11, 11, 11, 11,  1,  1,  1,  1, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  8, 
   8,  8,  8,  8,  8,  8, 11,  1,  1,  1,  1,  1,  1,  1, 24, 11,  1,  1, 11, 11, 11,  8,  8,  8,  8,  8,  8,  8,  8,  8, 33,  8, 
   8,  8,  8,  8,  8,  8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,  1, 11,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 33,  8, 
  16, 16,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 11, 11, 11,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 11,  0, 11, 
  11, 16,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8, 11,  9
];

//マス毎のエンカウント率設定
const gEncounter = [1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 2, 2, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                      //敵エンカウント確率

let vN;                                                                          //村メッセージ要素
let gTalk = 0;                                                                   //メッセージ表示条件要素
let insertMessage = false;                                                       //メッセージ割り込み要素


//マップ描画処理
function DrawField( g ){
  let mx = Math.floor( gPlayerX / TILESIZE);  //プレイヤーのタイル座標x
  let my = Math.floor( gPlayerY / TILESIZE);  //プレイヤーのタイル座標y
    
  for( let dy = - SCR_HEIGHT; dy <= SCR_HEIGHT; dy++){
    let ty = my + dy;
    let py = ( my + dy + MAP_HEIGHT) % 32;
    for( let dx = - SCR_WIDTH; dx <= SCR_WIDTH; dx++){
    let tx = mx + dx;
    let px = ( mx + dx + MAP_WIDTH ) % 32;
       DrawTile( g, 
                tx * TILESIZE + WIDTH / 2 - gPlayerX,
                ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                gMap[ py * MAP_WIDTH + px ]
                );   
      }
    }
    /*g.fillStyle = "#ff0000";
    g.fillRect( 0, HEIGHT / 2 - 1, WIDTH, 2);
    g.fillRect( WIDTH / 2 - 1, 0, 2, HEIGHT);*/         //中心線
}

// マス描画
function DrawTile( g, x , y, idx){
  const ix = (idx % TILECOLUMN) * TILESIZE;
  const iy = Math.floor(idx / TILEROW) * TILESIZE;
  //drawImage(使用するイメージ, 使用範囲の開始x座標, 開始y座標, 使用範囲の幅, 使用範囲の高さ, イメージを描画するx座標, y座標, 描画の幅,描画高さ)
  g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE,  x, y, TILESIZE, TILESIZE);
};

//フィールド進行処理関数
function TickField(){
  if(gPhase != 0){                                                         //フィールド移動ターン以外の場合はリターン
    return;
  } else {
    /*入力されたキーごとに「移動」とキャラの「向き」の値を設定
      移動の値を引数に、移動後のマスの種類とエフェクトを取得
    */
    if( gKey[37]) {
      gAngle = 1; 
      gMoveX = -2;                                                         //左
      landJudge(gMoveX, gMoveY);
    } else if( gKey[38]) {
      gAngle = 3; 
      gMoveY = - 2;                                                        //上
      landJudge(gMoveX, gMoveY);
    } else if( gKey[39]) {
      gAngle = 2;
      gMoveX= 2;                                                           //右
      landJudge(gMoveX, gMoveY);
    } else if( gKey[40]) {
      gAngle = 0; 
      gMoveY = 2;                                                          //下
      landJudge(gMoveX, gMoveY);
    }
    //エフェクトを加味した上で移動処理関数を呼び出す
    gMove(gMoveX, gMoveY, chMoveX, chMoveY);
    chMoveX = null;                                                        //移動エフェクトの初期化
    chMoveY = null;
  }
};


function landJudge(gMoveX, gMoveY) {
  //移動後のタイル座標判定
  let fmx = Math.floor(( gPlayerX + gMoveX)/ TILESIZE );                    //移動後のタイル座標X
  let fmy = Math.floor(( (gPlayerY + gMoveY) + TILESIZE / 3 ) / TILESIZE);  //移動後のタイル座標Y
  fmx += MAP_WIDTH;                                                         //マップループ処理
  fmx %= MAP_WIDTH;                                                         //マップループ処理
  fmy += MAP_HEIGHT;                                                        //マップループ処理
  fmy %= MAP_HEIGHT;                                                        //マップループ処理
  let fm = gMap[ fmy * MAP_WIDTH + fmx];                                    //タイル番号
  //console.log(fm);
  
  //タイル判定に従って各マスのエフェクトを呼び出す
  if (fm == 1){                                                             //割り込みメッセージの初期化
    insertMessage = false;
  }
  if(fm <= 2 || fm == 4 || fm == 5 || fm == 11){
    if(IsTrueBoss == 4){
      IsTrueBoss = 1;
    }
    gTalk = 0;
  }
  if(( 16 <= gPlayerX && gPlayerX <= 32) && ( 160 <= gPlayerY && gPlayerY <= 190)){    //裏ボスマス
     PlaceOfTB();
  }
  if(( 130 <= gPlayerX && gPlayerX <= 142 ) && ( 206 <= gPlayerY && gPlayerY <= 218)){
      if(gTalk == 0){
        if(IsTrueBoss == 1){
          vN = 8;
        } else if(IsTrueBoss == 5){
          vN = 9;
        } else {
          vN = 0;
        }
        village(vN);
        gTalk = 1;
      }
  }
  if(( 165 <= gPlayerX && gPlayerX <= 180 ) && ( 78 <= gPlayerY && gPlayerY <= 90)){
    if(gTalk == 0 || gTalk == 2){
      if(IsBoss > 1){
        vN = 6;
      } else {
        vN = 1;  
      }
      village(vN);
      gTalk = 1;
    }
  }
  if(( 224 <= gPlayerX && gPlayerX <= 238) && ( 446 <= gPlayerY && gPlayerY <= 458)){
    if(gTalk == 0){
      if(IsTrueBoss == 5){
        vN = 10;
      } else if(IsTrueBoss >= 1){
        vN = 11;
      } else {
        vN = 2;
      }
      village(vN);
      gTalk = 1;
    }
  }
  if(( 242 <= gPlayerX && gPlayerX <= 268 ) && ( 191 <= gPlayerY && gPlayerY <= 201)){
    if(gTalk == 0 || gTalk == 2){
      if(IsMid_Boss == 0){
        vN = 3;
      } else if(IsMid_Boss > 1){
        vN = 5;
      }
      village(vN);
      gTalk = 1;
    }
  }
  if(( 322 <= gPlayerX && gPlayerX <= 344 ) && ( 178 <= gPlayerY && gPlayerY <= 186)){
    if(gTalk == 0){
      setHintI();
      gTalk = 1;
    }
  }
  if(( 500 <= gPlayerX && gPlayerX <= 511 ) && ( 493 <= gPlayerY && gPlayerY <= 500)){
    if(gSword != 3){
      getMagicSword();
    } else {
      insertMessage = false;
    }
    gTalk = 1;
  }

  if (fm == 1){
    if(gItem == 1 && gGuard == 3){                                           //門番１出現判定
      AppearEnemy();
   }
  }
  if ((fm == 8) || (fm == 7) || (fm == 14)|| (fm == 15) ){                   //海、山判定
    inviolable(gMoveX, gMoveY);                                                            //移動禁止
  }
  if((fm == 4) || (fm == 11)) {
    slowDown(gMoveX, gMoveY);                                                              //スローダウン
  }
  if(fm == 5){
    sacredSand();                                                            //準聖地
  }
  if(fm == 16){
    rapidStream();                                                           //急流
  } 
  if(fm == 9){
    poison();                                                               //毒地形
  }
  if(fm == 10){
    magma();
  } 
  if(fm == 12){
    if(gTalk == 0){
      cave();
      gTalk = 1;
    }
  }
  if(fm == 13){
    sacredPlace();                                                         //聖地判定
  }
  if((150 <= gPlayerX && gPlayerX <= 152) && (255 <= gPlayerY && gPlayerY <= 262)){
      secretPassage();
  }
  if(fm == 17){
    if(gTalk == 0){
      setHintII();
      gTalk = 1;
    }
  }
  if(( (fm == 19) || (fm == 20) || (fm == 27) || (fm == 28) )){
    midBossCastle();
  }
  if(fm == 31){
    guardCastle();
  }
  if((240 <= gPlayerX && gPlayerX <= 254) && (363 <= gPlayerY && gPlayerY <= 376)){
    placeOfSword();
  }
  if(( 368 <= gPlayerX && gPlayerX <= 385 ) && ( 228 <= gPlayerY && gPlayerY <= 246)){
    gate();
  }
  if((400 <= gPlayerX && gPlayerX <= 414) && (28 <= gPlayerY && gPlayerY <= 42) && (gItem == 0 && gGuard == 2)){
    chest();
  }
  if((494 <= gPlayerX && gPlayerX <= 510) && (271 <= gPlayerY && gPlayerY <= 281)){
    if(gTalk == 0){
      setHintIII();
      gTalk = 1;
    }
  }
  if(fm == 26){
    if(gTalk == 0 || gTalk == 1){
      if(IsBoss > 1){
        vN = 7;
      } else {
        vN = 4;
      }
      village(vN);
      gTalk = 2;
    }
  }
  if( Math.random() * 100 < gEncounter[ fm ]){            //敵エンカウント判定
    AppearEnemy(fm);
  }
  if((fm == 21) || (fm == 22) || (fm == 29) ||(fm == 30) ){
    bossCastle();
  }
};
