'use strict';

var TUG = TUG || {}
TUG.GR = {};

TUG.mCurrentFrame = 0;                           //経過フレーム数
TUG.mFPS = 60;                                   //フレームレート
TUG.mWidth = 320;                               //仮想画面・幅
TUG.mHeight = 160;                              //仮想画面・高さ

TUG.onTimer = function(){}

TUG.init = function(){
  TUG.GR.mCanvas = document.createElement("canvas");   //仮想画面を作成
  TUG.GR.mCanvas.width = TUG.mWidth;
  TUG.GR.mCanvas.heught =TUG.mHeight;
  TUG.GR.mG = TUG.GR.mCanvas.getContext("2d");     //仮想画面の2D描画コンテクストを取得

  requestAnimationFrame( TUG.wmTimer );
}

TUG.wmTimer = function(){
  if( !TUG.mCurrentStart ){                         //初回呼び出し時
    TUG.mCurrentStart = performance.now();          //開始時刻を設定
  }

  let dif = Math.floor( (performance.now() - TUG.mCurrentStart) * TUG.mFPS / 1000) - TUG.mCurrentFrame ; //現在時刻と開始時刻との差分を測定
  //console.log(dif);
    if( dif > 0){
      TUG.onTimer( dif );
      TUG.mCurrentFrame += dif;
    }
  requestAnimationFrame( TUG.wmTimer );
}