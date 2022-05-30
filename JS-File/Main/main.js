'use strict';

const canvas = document.getElementById("main");                                             //メインキャンバスの要素
const g = canvas.getContext( "2d" );                                                        //2D描画コンテキストを取得

let SCROLL = 1;                           //スクロール速度
let gWidth;                               //実画面の幅
let gHeight;                              //実画面の高さ
const gKey = new Uint8Array( 0x100 );     //キー入力バッファ
let gFrame = 0;                           //内部カウンタ


window.onload = SetScreenSize();          //ブラウザ起動時にスクリーンサイズ等セッティング

TUG.onTimer =  function( dif ){           //タイマーイベント発生ごとにフィールド進行処理をした上でメイン画面を描画
  if( !gMessage1 ){
    while( dif -- ){
      gFrame++                  //内部カウンタを追加
      TickField();              //フィールド進行処理
    }
  }
  DrawMain();                   //メイン画面を仮想画面上に描画
  g.drawImage( TUG.GR.mCanvas, 0, 0, TUG.GR.mCanvas.width, TUG.GR.mCanvas.height, 0, 0, gWidth, gHeight);  //仮想画面のイメージを実画面へ転送
};

window.onkeydown = function (ev){                           //　キー（down）入力イベント
  let c = ev.keyCode;            //キーコード取得
  PhaseOperate(c);               //ターン処理を行なってターンを進める
}

window.onkeyup = function(ev){                              //　キー（up）入力停止イベント
  gKey[ ev.keyCode] = 0;
  gMoveX *= 0;                  //移動の値を0にする
  gMoveY *= 0;
  //console.log('キー押し解除');
};