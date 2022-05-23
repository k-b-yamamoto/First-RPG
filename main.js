'use strict';

const FONT = "12px fantasy";              //使用フォント
const FONTSTYLE = "#ffffff";              //文字色
const WIDTH = 320;                        //仮想画面の幅を設定
const HEIGHT = 160;                       //仮想画面の高さを設定
const MAP_WIDTH = 32;                     //マップ幅
const MAP_HEIGHT = 32;                    //マップ高さ
const SCR_HEIGHT = 5;                     //画面のタイルサイズ高さの半分
const SCR_WIDTH = 10;                     //画面のタイルサイズ幅の半分
let SCROLL = 1;                           //スクロール速度
const SMOOTH = 0;                         //ドットの補完処理の値
const TILECOLUMN = 8;                     //ドットの桁数
const TILEROW = 8;                        //ドットの行数
const TILESIZE = 16;                      //マスのサイズ
const WNDSTYLE = "rgba(0, 0, 0, 0.5)";    //ウィンドウの色

const gKey = new Uint8Array( 0x100 );     //キー入力バッファ

let gAngle = 0;                                             //プレイヤーの向き
let gCursor = 0;                                            //カーソル位置
let gFrame = 0;                                             //内部カウンタ
let gWidth;                                                 //実画面の幅
let gHeight;                                                //実画面の高さ
let gMessage1 = null;                                       //表示メッセージの変数
let gMessage2 = null;                                       //表示メッセージの変数
let gMessage3 = null;                                       //表示メッセージの変数
let gMessage4 = null;                                       //表示メッセージの変数
let gMoveX = 0;                                             //移動量x
let gMoveY = 0;                                             //移動量y
let gOP = 1;                                                //スタート画面表示要素

let gOrder;                                                 //行動順
let gGuard = 0;                                             //門番出現要素
let gPhase = 0;                                             //戦闘フェイズ
let IsBossClass = false;                                    //ボス出現判定要素
let IsBoss = 0;                                             //ボス要素
let IsMid_Boss = 0;                                         //中ボス要素
let IsTrueBoss = 0;                                         //裏ボス画像
let gSirge = 0;                                             //戦闘時包囲要素
let gTalk = 0;                                              //メッセージ表示条件要素
let T = null;                                               //モンスター引数
let BN;                                                     //ボスクラス引数

const canvas = document.getElementById("main");                                             //メインキャンバスの要素
const g = canvas.getContext( "2d" );                                                        //2D描画コンテキストを取得

//戦闘行動処理関数
function Action(){
  BossEvent();
  setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
  if(IsTrueBoss == 2){
    T = 10;
  }
  let d = GetDamage( gLv + 3) - T;                     //ダメージ計算取得結果
  /*console.log('モンスター番号＝ ' + T);
  console.log('敵HP = ' + gEnemyHP);
  */
  if(gCursor == 0){                                    //「戦う」を選択
    if (gPhase == 2 || gPhase == 3){
      if(gOrder == 0){
        gPhase = 5;
      } else {
        gPhase = 4;
      }
    }
    Sword(gSword);
    d += swordAttack;
    //console.log('装備攻撃力' + swordAttack + 'が加算されました');

    if (gPhase == 4){
      if( d <= 0){
        setMessage('ミス！', '攻撃を外した');
      } else if(IsBossClass){
        setMessage('勇者の攻撃！', gFileBossClass[BN].name + 'に ' + d + ' のダメージ！');
      } else {
        setMessage('勇者の攻撃！', gFileMonster[T].name + 'に ' + d + ' のダメージ！');
      }
      if (swordAttack == 50){
        gMessage1 = '会心の一撃！';
      }
      if (swordAttack == 100){
        gMessage1 = '奇跡の一撃!!';
      }
      
      if(IsBossClass){
        gBossHP -= Math.max(d, -1);
        if(gBossHP <= 0){
          gPhase = 7;
          return;
        }
      } else {
        gEnemyHP -=  Math.max(d, -1);
        //console.log('ターン4終了時の敵HP = ' + gEnemyHP);
        if(gEnemyHP <= 0){
          gPhase = 7;
          return;
        }
      }
      //console.log('gOrder = ' + gOrder);
      if(gOrder == 0){
        gPhase = 6;
        //console.log('ループを脱します');
        return;
      } else {
        gPhase = 5;
        return;
      }
    }
    if (gPhase == 5){
      //console.log('ターン5開始時の敵HP = ' + gEnemyHP);

      let d = GetDamage( T + 2);
      if(IsBossClass){
        BossPower(BN);
        console.log('dSP = ' + dSP);
        setMessage( gFileBossClass[BN].name + 'の攻撃！', dSP + ' のダメージ！');
        gHP -= dSP;
      } else {
      setMessage( gFileMonster[T].name + 'の攻撃！', d + ' のダメージ！');
        gHP -= d;
      }

      if (gHP <= 0){                                               //プレイヤーが死亡した場合
        gHP = 0;
        gPhase = 10;                                                //死亡フェイズ
      } else if(gOrder > 0 || gSirge == 1) {                        //自分が先制攻撃した場合と逃げるコマンドで回り込まれた場合
        gSirge = 0;
        gPhase = 6;                                                 //戦闘コマンドへループ
      } else {
        console.log('gSirge = ' + gSirge);
        gPhase = 4;
      }
      return;
    }
  };
  if(gCursor == 1){
    if(IsBossClass){
      setMessage('逃げることができない！', null);
      gPhase = 5;
      gCursor = 0;
      gSirge = 1;
      return;
    } else if(Math.random() < 0.7){                         //「逃げる」成功
        setMessage('なんとか逃げ切れた', null);
        //console.log('逃走経験値 = ' + (gEnemyMHP - gEnemyHP));
        gPhase = 8;
        return;
    } else {                                               //「逃げる」失敗
      setMessage('回り込まれてしまった', null);
      gPhase = 5;
      gCursor = 0;
      gSirge = 1;
      return;
    }
  };
    gPhase ++;                                             //フェーズ経過
    return;
}

//経験値加算関数
function AddExp( val ) {
  gEx += val;                                          //経験値加算
  setMessage(`${val} pt の経験値を獲得`, null);
  while( gLv * ( gLv + 1) * 2 <= gEx){                 //レベルアップ条件
    gLv++;                                             //レベルアップ
    gMHP += 4 + Math.floor( Math.random() * 3 );       //最大HP上昇(4~6)
    gHP = Math.min(gHP + Math.floor(gMHP / 5), gMHP);  //レベルアップ時体力を一定回復
    gMessage2 = 'レベルが上がった！';
  }
}

function AppearEnemy(fm){
  gPhase = 1;                                          //敵出現フェイズ
  //console.log(gFileMonster[T].name);
  console.log('gHp = ' + StatusLog[0]);
  console.log('gMHp = ' + StatusLog[1]);
  console.log('gex = ' + StatusLog[2]);
  console.log('glv = ' + StatusLog[3]);
  console.log('genforce = ' + StatusLog[4]);
  console.log('gitem = ' + StatusLog[5]);
  console.log('gspeed = ' + StatusLog[6]);
  console.log('gsword = ' + StatusLog[7]);
  console.log('gplayerx = ' + StatusLog[8]);
  console.log('gplayerY = ' + StatusLog[9]);
  BossEvent();
  if(IsBossClass){
    setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard); //BN取得
    getBossMessage(BN, gPhase);                            //メッセージ取得
    setMessage(M1, M2);                                    //メッセージ表示
  } else {
    setMessage ('魔物が襲いかかってきた！', null);            //ランダムエンカウント
  }
}

function BossEvent(){
  if(IsBoss == 1 || IsMid_Boss == 1 || IsTrueBoss == 2 || gGuard == 1 || gGuard == 3){
    IsBossClass = true;
  } else {
    IsBossClass = false;
  }
  return;
}

function CommandFight(){
  gPhase = 2;                                        //戦闘コマンド選択フェーズ
  setMessage('　戦う', '　逃げる');
  if(IsBossClass){
    setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
    setBossHP(BN);
  } else {
    setEnemyHp(T);
    //console.log('gEnemyMHP = ' + gEnemyMHP);
    //console.log('gEnemyHP = ' + gEnemyHP);
  }
}

function CommandFightII(){
  gPhase = 3;                                        //戦闘コマンド選択フェーズ
  setMessage('　戦う', '　逃げる');
  //console.log('敵の残存HP = ' + gEnemyHP);
  //console.log('ボスの残存HP = ' + gBossHP);
}

//ダメージ量算出式
function GetDamage(a){
  return( Math.floor( a * ( 1 + Math.random())));    //攻撃力の１〜２倍
}

//戦闘画面描画処理
function DrawFight ( g ){
  g.fillStyle = '#000000';                           //背景色
  g.fillRect(0, 0, WIDTH, HEIGHT);                   //画面全体を矩形描画

  if( gPhase < 8){                                   //敵が生存している場合
    if(IsBossClass){
      setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
      DrawBossClass(BN, g);
    } else {
      //モンスターの描画
      setMonsterNumber();
      DrawMonster(T, g);
    }
  }


  DrawStatus(g);                                                                  //ステータス描画
  DrawMessage(g);
  if( gPhase == 2 || gPhase == 3 || gPhase == 12 || gPhase == 13){                //戦闘フェーズがコマンド選択中の場合
    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText('▶︎', 40, 125 + 14 * gCursor);                                      //カーソル描画
  }
}

function DrawOP( g ){
  gPhase = 14;

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
/*    g.fillStyle = WNDSTYLE;                             //ウィンドウの色
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

//ステータス描画
function DrawStatus(g){
  if (gPhase < 11 && gOP == 0){                                          //ゲームオーバー画面以外
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

function DrawTile( g, x , y, idx){
  const ix = (idx % TILECOLUMN) * TILESIZE;
  const iy = Math.floor(idx / TILEROW) * TILESIZE;
  //drawImage(使用するイメージ, 使用範囲の開始x座標, 開始y座標, 使用範囲の幅, 使用範囲の高さ, イメージを描画するx座標, y座標, 描画の幅,描画高さ)
  g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE,  x, y, TILESIZE, TILESIZE);
};

function GameOver(){
  if(gCursor == 0){                                  //「コンティニュー」を選択
      if(IsBoss == 1){                               //ボスに負けた場合
        IsBoss = 0;
      }
      if(IsMid_Boss == 1){                           //中ボスに負けた場合
        IsMid_Boss = 0;
      }
      if(IsTrueBoss == 2){                           //裏ボスに負けた場合
        IsTrueBoss = 4;
      }
      if(gGuard == 1){
        gGuard -= 1;
        gItem = 0;
      }
      if(gGuard == 3){
        gGuard -= 1;
      }
      LoadData();
      gAngle = 0;
      gPhase = 13;
      BN = null;
    }
    if(gCursor == 1) {                               //初期化処理
      setStartStatus();
      gAngle = 0;
      gCursor = 0;                                    
      IsBoss = 0;
      IsMid_Boss = 0;
      IsTrueBoss = 0;
      gItem = 0;
      gGuard = 0;
      gSword = 0;
      BN = null;

      gPlayerX = START_X * TILESIZE + TILESIZE / 2;  //プレイヤー座標X
      gPlayerY = START_Y * TILESIZE + TILESIZE / 2;  //プレイヤー座標Y

      gPhase = 13;
    }
  gPhase = 12;
  return;
}

function LoadImage(){
  gImgMap = new Image(); gImgMap.src = gFileMap;                    //マップ画像読み込み
}

function TickField(){

  if(gPhase != 0){
    return;
  } else if( gKey[37]) {
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
  };

  function gMove(gMoveX, gMoveY){
    gPlayerX += gMoveX * SCROLL;
    gPlayerY += gMoveY * SCROLL;
    setInterval(gPlayerX = Math.round(gPlayerX), 2000);
    setInterval(gPlayerY = Math.round(gPlayerY), 2000);
      
    /*if (gMoveX != 0 || gMoveY != 0){}       //移動中は座標を動かさない
    else if( gKey[37]) gMoveX = - TILESIZE; 
    else if( gKey[38]) gMoveY = - TILESIZE; 
    else if( gKey[39]) gMoveX =   TILESIZE;
    else if( gKey[40]) gMoveY =   TILESIZE;

    gPlayerX += Math.sign(gMoveX);          //プレイヤー移動座標X
    gPlayerY += Math.sign(gMoveY);          //プレイヤー移動座標y
    gMoveX -= Math.sign(gMoveX);            //移動量消費x
    gMoveY -= Math.sign(gMoveY);            //移動量消費Y   マス移動に切り替え*/

    //マップループ処理
    gPlayerX += (MAP_WIDTH * TILESIZE);
    gPlayerX %= (MAP_WIDTH * TILESIZE);
    gPlayerY += (MAP_HEIGHT * TILESIZE);
    gPlayerY %= (MAP_HEIGHT * TILESIZE);
  };

function Wmprint(){
  DrawMain();

  const g = canvas.getContext( "2d" );                                                                     //2D描画コンテキストを取得
  g.drawImage( TUG.GR.mCanvas, 0, 0, TUG.GR.mCanvas.width, TUG.GR.mCanvas.height, 0, 0, gWidth, gHeight);  //仮想画面のイメージを実画面へ転送
};

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
  

//タイマーイベント発生時の処理
TUG.onTimer =  function( dif ){
  if( !gMessage1 ){
    while( dif -- ){
      gFrame++                  //内部カウンタを追加
      TickField();              //フィールド進行処理
    }
  }
  Wmprint();
};

//　キー（down）入力イベント
window.onkeydown = function(ev){
  let c = ev.keyCode;           //キーコード取得
  
  if( gKey[ c ] != 0){          //既に押下中の場合（キーリピート）
    return;
  }
  gKey[c] = 1;
  gMessage1 = null;
  gMessage2 = null;
  gMessage3 = null;
  gMessage4 = null;


  if(gPhase == 0 && gHP <= 0){
    setMessage('勇者は死んでしまった', null);
    gHP = 0;
    gPhase = 10;
    return;
  }

  if( gPhase == 1){                                        //敵が現れた 
    console.log('現在' + gPhase + 'ターン');
    gCursor = 0;
    CommandFight();
    return;
  }
  if (gPhase == 2){ 
    console.log('現在' + gPhase + 'ターン');
    CommandFight();
    if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
      gOrder = Math.floor(Math.random() * (2 + gSpeed));   //戦闘行動順
      //console.log('gOrder =' + gOrder );
      Action();                                            //戦闘行動処理
      } else {
         gCursor = 1 - gCursor;                            //カーソル移動
      }
      return;
  }
  if (gPhase == 3){ 
    console.log('現在' + gPhase + 'ターン');
    CommandFightII();
    if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
      gOrder = Math.floor(Math.random() * (2 + gSpeed));   //戦闘行動順
      //console.log('gOrder =' + gOrder );
      Action();                                            //戦闘行動処理
      } else {
         gCursor = 1 - gCursor;                            //カーソル移動
      }
      return;
  }
  if(gPhase == 4){
    console.log('現在' + gPhase + 'ターン');
    Action();
    return;
  }

  if(gPhase == 5){
    console.log('現在' + gPhase + 'ターン');
    Action();
    //gPhase = 9;
    return;
  }

  if(gPhase == 6){
    console.log('現在' + gPhase + 'ターン');
    CommandFightII();                                      //戦闘コマンド
    return;
  }

  if (gPhase == 7){
    console.log('現在' + gPhase + 'ターン');
    setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
    //console.log('BN = ' + BN);
    if(BN != null){
      if(BN == 4){
        setMessage(gFileBossClass[BN].name + 'が動きを止めた', null);
      } else if(BN < 4){
        setMessage(`" ${gFileBossClass[BN].name} "をやっつけた！`, null);
      }
    } else {
      //console.log('T = ' + T);
      setMessage(gFileMonster[T].name + 'をやっつけた！', null);     
    }
    gPhase = 8;
    return;
  }
  
  if (gPhase == 8){
    console.log('現在' + gPhase + 'ターン');
    //console.log('gBossHP = ' + gBossMHP);
    if(gCursor == 1 && gHP > 0){
      if((gEnemyMHP - gEnemyHP) == 0){
        T = null;
        gPhase = 0;
        return;
      } else {
      AddExp(Math.max( gEnemyMHP - gEnemyHP, 0));
      gCursor = 0;
      }
    } else if(IsBossClass){
      AddExp(gBossMHP);
    } else {
    AddExp((T + 1)* 3 + Math.floor(Math.random() * 4));
    }
    if(IsBoss == 1){
      IsBoss ++;
    }
    if(IsMid_Boss == 1){
      IsMid_Boss ++;
    }
    if(gGuard == 1 || gGuard == 3){
      gGuard ++;
    }
    if (IsTrueBoss == 2){
      IsTrueBoss ++;
    }
    //if(fm != 9 && fm != 10){
      Save();
    //}
    gPhase = 9;
    return;
  }

  if (gPhase == 9){
    console.log('現在' + gPhase + 'ターン');
    T = null;
    setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
    console.log('BN = ' + BN);
    if(BN){
      getBossMessage(BN, gPhase);
      setMessage(M1, M2);
    }
    if(IsTrueBoss == 3){
      IsTrueBoss = 5;
    }if(IsBoss == 2){
      IsBoss ++;
      IsTrueBoss = 1;
    }
    if(IsMid_Boss == 2){
      IsMid_Boss ++;
    }
    BN = null;
    gPhase = 0;
    return;
  }

  if(gPhase == 10){
    console.log('現在' + gPhase + 'ターン');
    setMessage('勇者は死んでしまった', null);
    gPhase = 11;
  }

  if(gPhase == 11){
    console.log('現在' + gPhase + 'ターン');
    T = null;
    setMessage('    コンティニュー', '    はじめから');
    gMessage3 = 'Game Over';  
    GameOver(); 
    return;
  }

  if (gPhase == 12){
    setMessage('    コンティニュー', '    はじめから');
    gMessage3 = 'Game Over';
      console.log('現在' + gPhase + 'ターン');
    if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
      //console.log('エンターボタン押下');
      GameOver();
      gPhase = 13;
    } else {
      //console.log('カーソル移動');
      gCursor = 1 - gCursor;                               //カーソル移動
    }
  }

  if(gPhase == 13){
    console.log('現在' + gPhase + 'ターン');
    gPhase = 0;
    gMessage1 = null;
    gMessage2 = null;
    gMessage3 = null;
    gMessage4 = null;
    return;  
  }

  if (gPhase == 14){
    console.log('現在' + gPhase + 'ターン');
    if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
      console.log('エンターボタン押下');
      gOP = 0;
      gPhase = 0;
      setStartStatus();
      return;
    }
  }
};


//　キー（up）入力停止イベント
window.onkeyup = function(ev){
  gKey[ ev.keyCode] = 0;
  gMoveX *= 0;
  gMoveY *= 0;
  //console.log('キー押し解除');
};

//ブラウザ起動イベント
window.onload = function(){
  LoadImage();

  WmSize();                                                 //画面サイズ初期化
  window.addEventListener("resize", function(){WmSize()});  //ブラウザサイズ変更時にWmSize関数を呼び出してサイズ調整
  TUG.init();
}
