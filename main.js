'use strict';

let SCROLL = 1;                           //スクロール速度
let gWidth;                               //実画面の幅
let gHeight;                              //実画面の高さ
const SMOOTH = 0;                         //ドットの補完処理の値
const TILESIZE = 16;                      //マスのサイズ
const MAP_WIDTH = 32;                     //マップ幅
const MAP_HEIGHT = 32;                    //マップ高さ
const gKey = new Uint8Array( 0x100 );     //キー入力バッファ
let gFrame = 0;                                             //内部カウンタ


window.onload = SetScreen();                                //ブラウザ起動時にスクリーンサイズ等セッティング
TUG.onTimer =  function( dif ){                             //タイマーイベント発生時の処理
  if( !gMessage1 ){
    while( dif -- ){
      gFrame++                  //内部カウンタを追加
      TickField();              //フィールド進行処理
    }
  }
  Wmprint();
};
window.onkeydown = function (ev){                           //　キー（down）入力イベント
  let c = ev.keyCode;           //キーコード取得
  PhaseOperate(c);               //ターン処理を行なってターンを進める
}
window.onkeyup = function(ev){                              //　キー（up）入力停止イベント
  gKey[ ev.keyCode] = 0;
  gMoveX *= 0;                  //移動の値を0にする
  gMoveY *= 0;
  //console.log('キー押し解除');
};



function Wmprint(){
  //メイン画面を描画
  DrawMain();
  const g = canvas.getContext( "2d" );                                                                     //2D描画コンテキストを取得
  g.drawImage( TUG.GR.mCanvas, 0, 0, TUG.GR.mCanvas.width, TUG.GR.mCanvas.height, 0, 0, gWidth, gHeight);  //仮想画面のイメージを実画面へ転送
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

//プレイヤー移動処理関数
function gMove(gMoveX, gMoveY, chMoveX, chMoveY){
    if(chMoveX != null || chMoveY != null){
      gMoveX = chMoveX;
      gMoveY = chMoveY;
    }
    gPlayerX += gMoveX * SCROLL;
    gPlayerY += gMoveY * SCROLL;
    setInterval(gPlayerX = Math.round(gPlayerX), 2000);
    setInterval(gPlayerY = Math.round(gPlayerY), 2000);

    //マップループ処理
    gPlayerX += (MAP_WIDTH * TILESIZE);
    gPlayerX %= (MAP_WIDTH * TILESIZE);
    gPlayerY += (MAP_HEIGHT * TILESIZE);
    gPlayerY %= (MAP_HEIGHT * TILESIZE);
};



