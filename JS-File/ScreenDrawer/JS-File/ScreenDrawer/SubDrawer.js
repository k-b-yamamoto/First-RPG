'use strict';

const FONT = "12px fantasy";              //使用フォント
const FONTSTYLE = "#ffffff";              //文字色
const WIDTH = 320;                        //仮想画面の幅を設定
const HEIGHT = 160;                       //仮想画面の高さを設定
const WNDSTYLE = "rgba(0, 0, 0, 0.5)";    //ウィンドウの色

let gMessage1 = null;                                       //表示メッセージの変数
let gMessage2 = null;                                       //表示メッセージの変数
let gMessage3 = null;                                       //表示メッセージの変数
let gMessage4 = null;                                       //表示メッセージの変数

let gMoveX = 0;                                             //移動量x
let gMoveY = 0;                                             //移動量y


//ステータス描画
function DrawStatus(g){
  if (gPhase < 12 && (!gOP)){                                          //ゲームオーバー画面以外
    g.font = FONT;
    g.fillStyle = FONTSTYLE;                                             //文字色
    g.fillText('LV.', 19, 25); DrawTextR( g, hero1.getLv, 61, 25);               //レヴェル描画
    g.fillText('HP', 19, 39); DrawTextR( g, hero1.getHp, 61, 39);                //HP描画
    g.fillText('EX.', 19, 53); DrawTextR( g, hero1.getGEx, 61, 53);               //経験値描画
  }
}
// テクスト整列関数
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

// メッセージ入力フォーマット
function setMessage(v1, v2){
  gMessage1 = v1;
  gMessage2 = v2;
}

//デバックウィンドウ
function DrawMarks( g ){
  g.fillStyle = WNDSTYLE;                             //ウィンドウの色
  g.fillRect (20, 3, 124, 15);                        //短形描画
  g.font = FONT;
  g.fillStyle = FONTSTYLE;                            //文字色
  //let mx = Math.floor( gPlayerX / TILESIZE);        
  //let my = Math.floor( gPlayerY / TILESIZE);
  //console.log("x= " + gPlayerX + "  y=" + gPlayerY);
  g.fillText('gPlayerX = ' + hero1.getPlayerX + 'gPlayerY = ' + hero1.getPlayerY, 25, 14);
  //g.fillText("x = "  + gPlayerX + "  " + " y= " + gPlayerY + "  "  + " m= " + gMap[ my * MAP_WIDTH + mx ], 25, 14);
}


