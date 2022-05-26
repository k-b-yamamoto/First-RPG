'use strict';

const canvas = document.getElementById("main");                                             //メインキャンバスの要素
const g = canvas.getContext( "2d" );                                                        //2D描画コンテキストを取得
const FONT = "12px fantasy";              //使用フォント
const FONTSTYLE = "#ffffff";              //文字色
const WIDTH = 320;                        //仮想画面の幅を設定
const HEIGHT = 160;                       //仮想画面の高さを設定
const SCR_HEIGHT = 5;                     //画面のタイルサイズ高さの半分
const SCR_WIDTH = 10;                     //画面のタイルサイズ幅の半分
const TILECOLUMN = 8;                     //ドットの桁数
const TILEROW = 8;                        //ドットの行数
const WNDSTYLE = "rgba(0, 0, 0, 0.5)";    //ウィンドウの色

let gOP = 1;                                                //スタート画面表示要素

let gMessage1 = null;                                       //表示メッセージの変数
let gMessage2 = null;                                       //表示メッセージの変数
let gMessage3 = null;                                       //表示メッセージの変数
let gMessage4 = null;                                       //表示メッセージの変数

let gMoveX = 0;                                             //移動量x
let gMoveY = 0;                                             //移動量y



function DrawOP( g ){
  gPhase = 13;
  g.fillStyle = '#000000';                           //背景色
  g.fillRect(0, 0, WIDTH, HEIGHT);                   //画面全体を矩形描画

  DrawMessage( g );
  setMessage('     ゲームを始める', null);
  gMessage4 = 'RPG-Alone';
  
  g.font = FONT;
  g.fillStyle = FONTSTYLE;
  g.fillText('▶︎', 40, 125 + 14 * gCursor);              //カーソル描画

  //console.log('スタート画面です');
  return;
}

function DrawMain(){
  const g = TUG.GR.mG;                               //仮想画面の2D描画コンテクストを取得
  if(gOP == 1){
    DrawOP( g );
  } else if(gPhase <= 1){
    DrawField( g );                                  //マップ描画
    DrawHero(g);                                     //プレイヤーの描画
    g.fillStyle = WNDSTYLE;                             //ウィンドウの色
    g.fillRect (12, 11, 54, 50);                        //短形描画
    DrawStatus(g);                                      //ステータス描画
    DrawMessage(g);   
  } else {
    DrawFight( g );
  }   

    //デバックウィンドウ
  /*
    g.fillStyle = WNDSTYLE;                             //ウィンドウの色
    g.fillRect (20, 3, 124, 15);                        //短形描画
    g.font = FONT;
    g.fillStyle = FONTSTYLE;                            //文字色
    //let mx = Math.floor( gPlayerX / TILESIZE);        
    //let my = Math.floor( gPlayerY / TILESIZE);
    //console.log("x= " + gPlayerX + "  y=" + gPlayerY);
    g.fillText('gPlayerX = ' + gPlayerX + 'gPlayerY = ' + gPlayerY, 25, 14);
    //g.fillText("x = "  + gPlayerX + "  " + " y= " + gPlayerY + "  "  + " m= " + gMap[ my * MAP_WIDTH + mx ], 25, 14);
  */
};

function DrawTile( g, x , y, idx){
  const ix = (idx % TILECOLUMN) * TILESIZE;
  const iy = Math.floor(idx / TILEROW) * TILESIZE;
  //drawImage(使用するイメージ, 使用範囲の開始x座標, 開始y座標, 使用範囲の幅, 使用範囲の高さ, イメージを描画するx座標, y座標, 描画の幅,描画高さ)
  g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE,  x, y, TILESIZE, TILESIZE);
};


//ステータス描画
function DrawStatus(g){
  if (gPhase < 12 && gOP == 0){                                          //ゲームオーバー画面以外
    g.font = FONT;
    g.fillStyle = FONTSTYLE;                                             //文字色
    g.fillText('LV.', 19, 25); DrawTextR( g, gLv, 61, 25);               //レヴェル描画
    g.fillText('HP', 19, 39); DrawTextR( g, gHP, 61, 39);                //HP描画
    g.fillText('EX.', 19, 53); DrawTextR( g, gEx, 61, 53);               //経験値描画
  }
}

function DrawTextR(g, str, x, y){
  g.textAlign = 'right';
  g.fillText(str, x, y);
  g.textAlign = 'left';
}

// メッセージ描画
function DrawMessage(g){
  if(!gMessage1){                                      //メッセージ内容が存在しない場合
    return;
  }
  g.fillStyle = WNDSTYLE;                              //ウィンドウの色
  g.fillRect (25, 110, 275, 35);                       //短形描画
  
  g.font = FONT;
  g.fillStyle = FONTSTYLE;                             //文字色
  g.fillText(gMessage1, 40, 125);                      //メッセージ１行目描画
  if(gMessage2){
  g.fillText(gMessage2, 40, 140);                      //メッセージ２行目描画
  }
  if(gMessage3){
    g.font = "30px fantasy";
    g.fillStyle = '#a31717';
    g.fillText(gMessage3, WIDTH / 2 - 70, HEIGHT / 2 - 15);
  }
  if(gMessage4){
    g.font = "30px fantasy";
    g.fillStyle = '#ada817';
    g.fillText(gMessage4, WIDTH / 2 - 70, HEIGHT / 2 - 15);
  }
};

function setMessage(v1, v2){
  gMessage1 = v1;
  gMessage2 = v2;
}


