'use strict';

//ブラウザ起動イベント
function SetScreen(){
  WmSize();                                                 //画面サイズ初期化
  window.addEventListener("resize", function(){WmSize()});  //ブラウザサイズ変更時にWmSize関数を呼び出してサイズ調整
  TUG.init();
}

function WmSize(){                    //ブラウザサイズ変更イベント
  canvas.width = window.innerWidth;   //キャンバスの幅をブラウザの幅に変更
  canvas.height = window.innerHeight; //キャンバスの高さをブラウザの高さに変更

  const g = canvas.getContext( "2d" );                            //2D描画コンテキストを取得
  g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;   //ドットの補完処理
  

  //実画面サイズを計測（ドットのアスペクト比を維持したまま最大サイズを計測する）
  gWidth = canvas.width;
  gHeight = canvas.height;
  if( gWidth / WIDTH < gHeight / HEIGHT){
    gHeight = gWidth * HEIGHT / WIDTH;
  }else{
    gWidth = gHeight * WIDTH / HEIGHT;
  }
};
