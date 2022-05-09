'use strict';

const CHRHEIGHT = 16;                     //キャラの高さ
const CHRWIDTH =16;                       //キャラの幅
const FONT = "12px fantasy";              //使用フォント
const FONTSTYLE = "#ffffff";              //文字色
const WIDTH = 320;                        //仮想画面の幅を設定
const HEIGHT = 160;                       //仮想画面の高さを設定
const MAP_WIDTH = 32;                     //マップ幅
const MAP_HEIGHT = 32;                    //マップ高さ
const SCR_HEIGHT = 5;                     //画面のタイルサイズ高さの半分
const SCR_WIDTH = 10;                     //画面のタイルサイズ幅の半分
let SCROLL = 1;                           //スクロール速度
let gSpeed = SCROLL;                      //素早さ
const SMOOTH = 0;                         //ドットの補完処理の値
const START_HP = 20;                      //初期HP
const START_X = 8;                        //スタート位置x
const START_Y = 6;                        //スタート位置y
const TILECOLUMN = 8;                     //ドットの桁数
const TILEROW = 8;                        //ドットの行数
const TILESIZE = 16;                      //マスのサイズ
const WNDSTYLE = "rgba(0, 0, 0, 0.5)";    //ウィンドウの色
//const TilesizeX = 192;                  //タイルサイズX軸（ドット（＝ピクセル））
//const TilesizeY = 192;                  //タイルサイズY軸 

const gKey = new Uint8Array( 0x100 );     //キー入力バッファ

let gAngle = 0;                                             //プレイヤーの向き
let gEx = 0;                                                //プレイヤーの経験値
let gHP = START_HP;                                         //プレイヤーのHP
let gMHP = START_HP;                                        //プレイヤーの最大HP
let gLv = 1;                                                //プレイヤーのレベル 
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
let gItem = 0;                                              //所持アイテム
let gSword = 0;                                             //隠し武器要素
let gEnforce = 0;                                           //隠し強化要素
let gOrder;                                                 //行動順
let gGuard = 0;                                             //門番出現要素
let gPhase = 0;                                             //戦闘フェイズ
let gImgBoss;                                               //ボス画像
let gImgGuard1                                              //門番１の画像
let gImgGuard2                                              //門番2の画像
let gImgMidBoss;                                            //中ボス画像
let gImgMap;                                                //マップ画像
let gImgMonster;                                            //モンスター画像
let gImgTrueBoss;                                           //裏ボス画像
let IsBoss = 0;                                             //ボス要素
//let BossEvent;                                            //ボス出現条件
let IsMid_Boss = 0;                                         //中ボス要素
let IsTrueBoss = 0;                                         //裏ボス画像
let gSirge = 0;                                             //戦闘時包囲要素
let gTalk = 0;                                              //メッセージ表示条件要素
let T = null;                                               //モンスター引数
let gEnemyHP ;                                              //敵のHP設定
let gEnemyMHP;                                              //敵の初期HP
let gBossHP;                                                //ボスクラスのHP
let gBossMHP;                                               //ボスクラスの初期HP
let gImgPlayer;                                             //プレイヤー画像
let gPlayerX = START_X * TILESIZE + TILESIZE / 2;           //プレイヤー座標X
let gPlayerY = START_Y * TILESIZE + TILESIZE / 2;           //プレイヤー座標Y
const gFileBoss = "image/monster-image/m49.png";                                             //ボス画像
const gFileGuard1 = "image/monster-image/m50.png";                                           //門番１画像
const gFileGuard2 = "image/monster-image/m64.png";                                           //門番2画像
const gFileMap = "image/[mate]WorldMap8bit.png";                                             //マップ画像
const gFileMidBoss = "image/monster-image/m79.png";                                          //中ボス画像
const gFileTrueBoss = { name: '%E5%8B%87%E8%80%85', url : "image/monster-image/m72.png"};    //裏ボス画像
const gFileMonster = [
                      { name: '地獄蟲', url : "image/monster-image/m90.png"},
                      { name:'キャットボーイ', url: "image/monster-image/m69b.png"},
                      { name: 'スフィンクス', url : "image/monster-image/m63.png"},
                      { name: 'カルゴラ', url : "image/monster-image/m89.png"},
                      { name:'サタン', url : "image/monster-image/m61.png"},
                      { name: 'ナイトドラゴン', url : "image/monster-image/m87.png"}, 
                      { name: '金剛の騎士', url : "image/monster-image/m19.png"},
                      { name: '暗黒の騎士', url : "image/monster-image/m36.png"},
                      { name: 'オーディン', url : "image/monster-image/m62.png"},
                      { name:'ヒュドラ', url : "image/monster-image/m65.png" }
                    ];                                                                      //モンスター画像
const gFilePlayer = "image/Hero01_mate.png";                                                //プレイヤー画像

const canvas = document.getElementById("main");                                             //メインキャンバスの要素
const g = canvas.getContext( "2d" );                                                        //2D描画コンテキストを取得

//マス毎のエンカウント率設定
const gEncounter = [1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 2, 2, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                      //敵エンカウント確率

//マップ
const gMap = [
  0, 0, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 16, 11,
  11, 11, 11, 11, 11, 11, 8, 8, 8, 8, 8, 8,  8, 8, 8,  8, 8, 8, 8, 8, 8, 8, 8, 11,   6,   7,   6, 11, 8, 8, 8, 8,
  8, 8, 11,  0,  0, 11, 8, 8, 8, 8, 8, 11, 11, 11, 11, 8, 8, 8, 8, 8, 11, 11, 11, 11, 7, 23, 7, 11, 8, 8, 8, 8,
  8, 8, 11,  0,  0, 11,11,11,11,11,11, 11,  4,  4, 11, 11,8, 8, 8, 8, 11, 12, 11, 11, 6, 31, 6, 11, 8, 8, 8, 8,
  8, 8, 11, 11,  0,  1, 1, 1, 1, 1, 1,  1,  4,  4,  0, 11, 8, 8, 8, 11,11, 3, 11, 11, 6, 11, 6, 11, 8, 8, 8, 8, 
  8, 8,  8, 11,  0,  1, 1, 1, 1, 1, 25, 26, 4,  4,  0, 11,11,11,11, 11, 3, 3, 11,  4, 4, 11,11, 11, 8, 8, 8, 8, 
  8, 8,  8, 11, 11,  1, 1, 5, 5, 5,  1,  1, 1,  4,  4, 15, 4, 4, 15, 1, 2, 2, 2, 1, 1, 1, 1, 11, 8, 8, 8, 8, 8, 8,
  8, 8,  11, 11, 11, 11, 5, 1, 1, 1, 1, 1, 4, 4, 19, 20, 4, 4, 1, 1, 1, 1, 1, 1, 1, 11, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 8, 8, 11, 1, 1, 1, 1, 1, 1, 4, 4, 27, 28, 4, 4, 1, 1, 1, 1, 1, 1, 1, 11, 8, 8, 8, 8, 
  8, 8, 8, 8, 8, 8, 8, 11, 1, 5, 1, 1, 1, 1, 4, 15, 4, 4, 15, 4, 1, 1, 1, 1, 1, 1, 1, 11, 8, 8, 8, 8, 
  8, 8, 8, 8, 8, 8, 11,11, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 11, 8, 8, 8, 8, 
  8, 8, 8, 8, 8, 11, 11, 1, 1, 5, 1, 1, 2, 2, 6, 0, 6, 0, 6, 0, 6, 0, 0, 0, 1, 5, 5, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 8, 11, 1, 1, 1, 5, 1, 1, 2, 2, 1, 24, 25, 26, 1, 6, 0, 0, 0, 5, 5, 5, 11, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 8, 11, 11, 11, 24, 5, 1, 1, 1, 1, 0, 0, 0, 1, 6, 0, 0, 0, 0, 5, 5, 5, 11, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 8, 8, 8, 11, 11, 5, 11, 11, 17, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 23, 5, 5, 5, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 8, 8, 8, 8, 11, 5, 11, 8, 11, 1, 1, 3, 7, 3, 1, 1, 15, 9, 9, 31, 9, 9, 15, 11, 11, 11, 11, 11, 
  8, 35, 8, 8, 8, 8, 8, 8, 11, 11, 11,  8, 11, 1, 1, 3, 7, 3, 1, 15, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 11, 
  8, 35, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 1, 1, 4, 7, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 11, 11, 
  8, 35, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 1, 1, 1, 4, 7, 15, 2, 2, 10, 10, 10, 10, 10, 10, 2, 11, 11, 15, 11, 8, 
  8, 35, 8, 8, 11, 11, 11, 11, 11, 11, 1, 1, 1, 1, 0, 0, 15, 0, 0, 2, 10, 10, 10, 10, 10, 10, 2, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 9, 0, 0, 2, 10, 10, 21, 22, 10, 10, 2, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 11, 11, 11, 1, 1, 1, 1, 1, 1, 1, 0, 15, 9, 0, 1, 2, 10, 10, 29, 30, 10, 10, 2, 11, 8, 8, 8, 8, 
  8, 35, 8, 8, 16, 8, 11, 7, 14, 14, 1, 1, 1, 1, 0, 15, 9, 0, 1, 2, 10, 10, 35, 10, 10, 10, 2, 11, 11, 11, 8, 8, 
  8, 35, 11, 11, 11, 11, 7, 5, 5, 5, 16, 1, 1, 1, 7, 3, 15, 0, 1, 2, 10, 10, 35, 10, 10, 10, 2, 1, 1, 11, 8, 8, 
  8, 8, 8, 11, 11, 7, 1, 5, 5, 5, 16, 1, 1, 7, 1, 1, 1, 15, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 11, 8, 8, 
  8, 8, 8, 8, 11, 7, 16, 5, 13, 5, 16, 1, 11, 11, 11, 11, 11, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 8, 8, 
  8, 8, 8, 8, 11,11,16, 5, 5, 5, 16, 11, 11, 8, 8, 11, 1, 1, 1, 15, 1, 1, 11, 1, 1, 1, 1, 1, 1, 11, 8, 8, 
  8, 8, 8, 8, 8, 11, 16, 16, 16, 16, 16, 1, 11, 11, 11, 11, 1, 1, 1, 1, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 8, 
  8, 8, 8, 8, 8, 8, 11, 1, 1, 1, 1, 1, 1, 1, 16, 11, 1, 1, 11, 11, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 33, 8, 
  8, 8, 8, 8, 8, 8, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 1, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 33,8, 
  16,16, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,  8, 11, 11, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 0, 11, 
  11,16, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 9,
];

//戦闘行動処理関数
function Action(){
  if(IsTrueBoss == 2){
    T = 10;
  }
  let d = GetDamage( gLv + 3) - T;                     //ダメージ計算取得結果
  /*console.log('モンスター番号＝ ' + T);
  console.log('敵HP = ' + gEnemyHP);
  */
 let SpA = Math.floor(Math.random() * 3);              //会心の一撃確率
 console.log('SpA = ' + SpA);

  if(gCursor == 0){                                    //「戦う」を選択
    if (gPhase == 2 || gPhase == 3){
      if(gOrder == 0){
        gPhase = 5;
      } else {
        gPhase = 4;
      }
    }
    if (gSword == 2){
      d += 30;
    }
    if (gSword == 1 && SpA == 0){
      d += 50;
    }
    if (gPhase == 4){
      if( d <= 0){
        setMessage('ミス！', '攻撃を外した');
      } else if(IsBoss == 1){
        setMessage('勇者の攻撃！', '魔王デマオン に ' + d + ' のダメージ！');
        if (gSword == 1 && SpA == 0){
          gMessage1 = '会心の一撃！';
        }
      } else if(IsTrueBoss == 2){
          setMessage('勇者の攻撃！', gFileTrueBoss.name +  ' に ' + d + ' のダメージ！');
          if (gSword == 1 && SpA == 0){
            gMessage1 = '会心の一撃！';
          }
      } else if(IsMid_Boss == 1){
        setMessage('勇者の攻撃！', '薄氷の王女 に ' + d + ' のダメージ！');
        if (gSword == 1 && SpA == 0){
          gMessage1 = '会心の一撃！';
        }
      } else if(gGuard == 1){
        setMessage('勇者の攻撃！', '魔塔の番犬 に ' + d + ' のダメージ！');
        if (gSword == 1 && SpA == 0){
          gMessage1 = '会心の一撃！';
        }
      } else if(gGuard == 3){
        setMessage('勇者の攻撃！', '魔王城の門番 に ' + d + ' のダメージ！');
        if (gSword == 1 && SpA == 0){
          gMessage1 = '会心の一撃！';
        }
      } else {
        setMessage('勇者の攻撃！', gFileMonster[T].name + 'に ' + d + ' のダメージ！');
        if (gSword == 1 && SpA == 0){
          gMessage1 = '会心の一撃！';
        }
      }
      
      if(IsBoss == 1 || IsMid_Boss == 1 || IsTrueBoss == 2 || gGuard == 1 || gGuard == 3){
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
      console.log('gOrder = ' + gOrder);
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
      let dSP = 0;                                                  //ボス級用ダメージ計算要素
      if(IsBoss == 1){
        dSP = Math.floor( 20 + (1 + Math.random() * 21));
        setMessage('魔王デマオン の攻撃！ ' + dSP + ' のダメージ！');
      } else if(IsMid_Boss == 1){
        dSP = Math.floor( 5 + (1 + Math.random() * 11));
        setMessage('薄氷の王女 の攻撃！ ' + dSP + ' のダメージ！');
      } else if(IsTrueBoss == 2){
        dSP = Math.floor( 20 + (1 + Math.random() * 81));
        setMessage( gFileTrueBoss.name + ' の攻撃！ ' + dSP + ' のダメージ！');
      } else if(gGuard == 1){
        dSP = Math.floor( 3 + (1 + Math.random() * 18));
        setMessage('魔塔の番犬 の攻撃！ ' + dSP + ' のダメージ！');
      } else if(gGuard == 3){
        dSP = Math.floor( 8 + (1 + Math.random() * 9));
        setMessage('魔王城の門番 の攻撃！ ' + dSP + ' のダメージ！');
      } else {
      setMessage( gFileMonster[T].name + 'の攻撃！', d + ' のダメージ！');
      }
      if(IsBoss == 1 || IsMid_Boss == 1 || IsTrueBoss == 2 || gGuard == 1 || gGuard == 3){
        gHP -= dSP;
      } else {
        gHP -= d;
      }
      if (gHP <= 0){                                               //プレイヤーが死亡した場合
        gHP = 0;
        gPhase = 10;                                                //死亡フェイズ
      } else if(gOrder > 0 || gSirge == 1) {                        //自分が先制攻撃した場合と逃げるコマンドで回り込まれた場合
        gSirge = 0;
        gPhase = 6;                                                 //戦闘コマンドへループ
      } else {
        //console.log('gSirge = ' + gSirge);
        gPhase = 4;
      }
      return;
    }
  };
  if(gCursor == 1){
    if(IsBoss == 1 || IsMid_Boss == 1 || IsTrueBoss == 2 || gGuard == 1 || gGuard == 3){
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

function AppearEnemy(){
  gPhase = 1;                                          //敵出現フェイズ
  //console.log(gFileMonster[T].name);
  if(IsTrueBoss == 2){
    setMessage('奇声と共に', '突然何者かが襲いかかってきた！');
    return;
  }
  if (IsBoss == 1){
    setMessage('「一人とは愚かな。看取る者なく消えるがいい」', '" 魔王デマオン "が現れた！');
    return;
  }
  if(IsMid_Boss == 1){
    setMessage('「お前一人で私の相手になるとでも？」', '" 薄氷の王女"が現れた');
    return;
  }
  if(gItem == 0 && gGuard == 1){
    setMessage('「ここ・・・通さナイ・・・」', '” 魔塔の番犬 ”が現れた');
    return;
  }
  if(gItem == 1 && gGuard == 3){
    setMessage('「俺様の門をくぐれると思ったか！」', '" 魔王城の門番 "が現れた');
    return;
  }
  setMessage ('魔物が襲いかかってきた！', null);            //ランダムエンカウント
}

function CommandFight(){
  gPhase = 2;                                        //戦闘コマンド選択フェーズ
  setMessage('　戦う', '　逃げる');
  gEnemyMHP = T * 3 + 5;                             //敵のHP設定
  //console.log('gEnemyMHP = ' + gEnemyMHP);
   gEnemyHP = gEnemyMHP
  //console.log('gEnemyHP = ' + gEnemyHP);
  if(IsTrueBoss == 2){
    gBossMHP = 300;
    gBossHP = gBossMHP;
  } else if (IsBoss == 1){
    gBossMHP = 100;
    gBossHP = gBossMHP;
  } else if(IsMid_Boss == 1){
    gBossMHP = 40;
    gBossHP = gBossMHP;
  } else if(gGuard == 1){
    gBossMHP = 25;
    gBossHP = gBossMHP;
  } else if(gGuard == 3){
    gBossMHP = 35;
    gBossHP = gBossMHP;
  }
}

function CommandFightII(){
  gPhase = 3;                                        //戦闘コマンド選択フェーズ
  setMessage('　戦う', '　逃げる');
  console.log('敵の残存HP = ' + gEnemyHP);
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
    if(IsBoss == 1 || IsBoss == 2){
      g.drawImage( gImgBoss, WIDTH / 2 - gImgBoss.width / 2.4, HEIGHT / 2 - gImgBoss.height / 2.4, gImgBoss.width / 1.2, gImgBoss.height / 1.2);
    } else if(IsMid_Boss == 1 || IsMid_Boss == 2){
      g.drawImage( gImgMidBoss, WIDTH / 2 - gImgBoss.width / 4, HEIGHT / 2 - gImgBoss.height / 4, gImgBoss.width / 2, gImgBoss.height / 2);
    } else if(IsTrueBoss == 2 || IsTrueBoss == 3){
      g.drawImage( gImgTrueBoss, WIDTH / 2 - gImgTrueBoss.width / 4, HEIGHT / 2 - gImgTrueBoss.height / 4, gImgTrueBoss.width / 2, gImgTrueBoss.height / 2);
    } else if( gGuard == 1){
      g.drawImage( gImgGuard1, WIDTH / 2 - gImgGuard1.width / 4, HEIGHT / 2 - gImgGuard1.height / 4, gImgGuard1.width / 2, gImgGuard1.height / 2);
    } else if( gGuard == 3){
      g.drawImage( gImgGuard2, WIDTH / 2 - gImgGuard2.width / 4, HEIGHT / 2 - gImgGuard2.height / 4, gImgGuard2.width / 2, gImgGuard2.height / 2);
    } else{
      //モンスターの描画
      if(T === null){
         T = Math.abs( gPlayerX / TILESIZE - START_X) +
             Math.abs( gPlayerY / TILESIZE - START_Y);
        if( Math.random() * 5 < 1){
          T = Math.min(Math.floor( T / gFileMonster.length + T % gFileMonster.length), gFileMonster.length -1);         //敵強化＋上限処理
          console.log('乱数変更');
          console.log('モンスター番号＝ ' + T);
        } else {
          T = Math.floor(Math.min(T / Math.floor(TILESIZE / 3), gFileMonster.length - 1));
          //console.log('モンスター番号＝ ' + T);
        }
        if((332 <= gPlayerX && gPlayerX <= 430) && (12 <= gPlayerY && gPlayerY <= 104)){
          //console.log('判定強化');
          T = Math.min(T + 1, gFileMonster.length - 1);
        }
        if((288 <= gPlayerX && gPlayerX <= 450) && (276 <= gPlayerY && gPlayerY <= 428)){
          console.log('判定強化');
          T = Math.min(T + (1 + Math.floor(Math.random() * 5)), gFileMonster.length - 1);
        }
        //console.log(gFileMonster[T].name);
        //console.log(gFileMonster[T].url);
      } 
      gImgMonster = new Image(); gImgMonster.src = gFileMonster[T].url; //モンスター画像読み込み    
      g.drawImage( gImgMonster, WIDTH / 2 - gImgMonster.width / 4, HEIGHT / 2 - gImgMonster.height / 4, gImgMonster.width / 2, gImgMonster.height / 2);
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

  console.log('スタート画面です');
  return;
}



//マップ描画処理
function DrawField( g ){
  let mx = Math.floor( gPlayerX / TILESIZE);  //プレイヤーのタイル座標x
  let my = Math.floor( gPlayerY / TILESIZE);  //プレイヤーのタイル座標y
  console.log('T = ' + T);
    
  for( let dy = - SCR_HEIGHT; dy <= SCR_HEIGHT; dy++){
    let ty = my + dy;
    let py = ( my + dy + MAP_HEIGHT ) % 32;
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

    //プレイヤーの描画
  g.drawImage( gImgPlayer,
               (gFrame >> 3 & 1) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
               WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);
  
  g.fillStyle = WNDSTYLE;                             //ウィンドウの色
  g.fillRect (12, 11, 54, 50);                        //短形描画
  DrawStatus(g);                                      //ステータス描画
  DrawMessage(g);

    
}

function DrawMain(){
  const g = TUG.GR.mG;                               //仮想画面の2D描画コンテクストを取得
  if(gOP == 1){
    DrawOP( g );
  } else if(gPhase <= 1){
    DrawField( g );                                  //マップ描画
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
  g.fillRect (25, 110, 270, 35);                       //短形描画
  
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
  if (gPhase < 11 || gOP == 0){                                          //ゲームオーバー画面以外
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
  if(gCursor == 0){                                  //「戦う」を選択
      if(IsBoss == 1){                               //ボスに負けた場合
        IsBoss = 0;
      }
      if(IsMid_Boss == 1){                           //中ボスに負けた場合
        IsMid_Boss = 0;
      }
      if(IsTrueBoss == 2){                           //裏ボスに負けた場合
        IsTrueBoss = 1;
      }
      if(gGuard == 1){
        gGuard -= 1;
        gItem = 0;
      }
      if(gGuard == 3){
        gGuard -= 1;
      }
      gHP = Math.round(gMHP / 3);
      gPhase = 13;
    }
    if(gCursor == 1) {                               //初期化処理
      gAngle = 0;
      gEx = 0;  
      gHP = START_HP; 
      gMHP = START_HP;
      gLv = 1;                                         
      gCursor = 0;                                    
      IsBoss = 0;
      IsMid_Boss = 0;
      IsTrueBoss = 0;
      gItem = 0;
      gGuard = 0;
      gEnforce = 0;

      gPlayerX = START_X * TILESIZE + TILESIZE / 2;  //プレイヤー座標X
      gPlayerY = START_Y * TILESIZE + TILESIZE / 2;  //プレイヤー座標Y

      gPhase = 13;
    }
  gPhase = 12;
  return;
}

function LoadImage(){
  gImgBoss = new Image(); gImgBoss.src = gFileBoss;                 //ボス画像読み込み
  gImgTrueBoss = new Image(); gImgTrueBoss.src = gFileTrueBoss.url; //裏ボス画像読み込み
  gImgGuard1 = new Image(); gImgGuard1.src = gFileGuard1;           //門番画像読み込み
  gImgGuard2 = new Image(); gImgGuard2.src = gFileGuard2;           //門番画像読み込み
  gImgMidBoss = new Image(); gImgMidBoss.src = gFileMidBoss;        //中ボス画像読み込み
  gImgMap = new Image(); gImgMap.src = gFileMap;                    //マップ画像読み込み
  gImgPlayer = new Image(); gImgPlayer.src = gFilePlayer;           //プレイヤー画像読み込み
}

function TickField(){

  if(gPhase != 0){
    return;
  } else if( gKey[37]) {
      gAngle = 1; 
      gMoveX = -2;                                                         //左
      gmEffect();
    } else if( gKey[38]) {
      gAngle = 3; 
      gMoveY = - 2;                                                        //上
      gmEffect();
    } else if( gKey[39]) {
      gAngle = 2;
      gMoveX= 2;                                                           //右
      gmEffect();
    } else if( gKey[40]) {
      gAngle = 0; 
      gMoveY = 2;                                                          //下
      gmEffect();
    };
  gPlayerX += gMoveX * (SCROLL * 0.7);
  gPlayerY += gMoveY * (SCROLL * 0.7);

  function gmEffect() {
    //移動後のタイル座標判定
    let fmx = Math.floor(( gPlayerX + gMoveX)/ TILESIZE );                    //移動後のタイル座標X
    let fmy = Math.floor(( (gPlayerY + gMoveY) + TILESIZE / 3 ) / TILESIZE);  //移動後のタイル座標Y
    fmx += MAP_WIDTH;                                                         //マップループ処理
    fmx %= MAP_WIDTH;                                                         //マップループ処理
    fmy += MAP_HEIGHT;                                                        //マップループ処理
    fmy %= MAP_HEIGHT;                                                        //マップループ処理
    let fm = gMap[ fmy * MAP_WIDTH + fmx];                                    //タイル番号
    //console.log(fm);
    if(fm <= 2 || fm == 4 || fm == 5 || fm == 11){
      gTalk = 0;
    }
    if(( 16 <= gPlayerX && gPlayerX <= 32) && ( 160 <= gPlayerY && gPlayerY <= 190)){
      if(IsTrueBoss == 1){
        IsTrueBoss ++;
        AppearEnemy();
      } else {
        setMessage('行き止まりだ', '波さえも静まりかえっている');
      }
    }
    if(( 130 <= gPlayerX && gPlayerX <= 142 ) && ( 206 <= gPlayerY && gPlayerY <= 218)){
      if(gTalk == 0){
        setMessage ('祈っていましょう', 'きっと死者たちが守ってくださる');
        gTalk = 1;
      }
    }
    if(( 165 <= gPlayerX && gPlayerX <= 180 ) && ( 78 <= gPlayerY && gPlayerY <= 90)){
      if(gTalk == 0 || gTalk == 2){
        setMessage  ('魔王を倒して！', null);
        gTalk = 1;
      }
    }
    if(( 242 <= gPlayerX && gPlayerX <= 268 ) && ( 191 <= gPlayerY && gPlayerY <= 201)){
      if(gTalk == 0 || gTalk == 2){
        setMessage ('助けてください！', '北の城から来る魔物で街はめちゃくちゃです');
        gTalk = 1;
      }
    }
    if(( 322 <= gPlayerX && gPlayerX <= 344 ) && ( 178 <= gPlayerY && gPlayerY <= 186)){
      if(gTalk == 0){
        setMessage ('兵士の亡骸が血で滲んだメモを握っている', '”北•の•に••城•のカ•がある”');
        gTalk = 1;
      }
    }
    if (fm == 1){
      if(gItem == 1 && gGuard == 3){
        AppearEnemy();
     }
    }
    if ((fm == 8) || (fm == 7) || (fm == 14)|| (fm == 15) ){                   //侵入不可地形の場合
      gMoveX = 0;                                                              //移動禁止
      gMoveY = 0;
      console.log('移動禁止');
    }
    if((fm == 4) || (fm == 11)) {
      parseInt(gMoveX /= 2, 10);                                              //スローダウン
      parseInt(gMoveY /= 2, 10);
      console.log('slow down');
    }
    if(fm == 5 && gHP < gMHP){
      if(Math.random() * 20 < 1){                                             //ランダムで体力回復
      gHP += Math.floor(gMHP / 20);
      console.log('ランダムで体力回復');
      }
    }
    if(fm == 16){
      gPlayerX += TILESIZE;
      gPlayerY += TILESIZE;
      setMessage('強い流れに押し流される', null);
      console.log('渦潮');
    } 
    if(fm == 9) {
      if(gHP == 1){
        gHP = 0;
      } else if( 2 <= gHP && gHP <= 4 ){
        gHP = 1;
      } else {
        gHP = Math.floor( gHP/4 ) + gHP % 4;
      }
      setMessage('猛毒に身体が蝕まれる', null);
      console.log('毒')                                    // HPが1の場合は0を代入、HPが2<=4ならば1を代入、HPが5以上ならば4で割った商+余りを代入
    }
    if(fm == 10){
      if(gHP == 1){
        gHP = 0;
      } else {
        gHP = 1;
      }
      setMessage('マグマが身体を焼く', null);
      console.log('マグマ')                                 // HPに0を代入
    } 
    if (fm == 12){
      if(gTalk == 0){
        setMessage('” 俊足の靴 ”を手に入れた！', '移動速度が上がった');
        SCROLL *= 2;
        if (SCROLL >= 3){
          setMessage('元の靴に履き替えた', '通常の移動速度に戻った');
          SCROLL = 1;
        }
        gTalk == 1;
      }
    }
    if(fm == 13){
        gHP = gMHP;
        if(gTalk == 0){
          setMessage ('懐かしい声を聞いた気がした', '”いってらっしゃい”とその声は言った');
          gTalk = 1;
        } 
    }
    if((150 <= gPlayerX && gPlayerX <= 152) && (255 <= gPlayerY && gPlayerY <= 262)){
      gPlayerX = 8 * TILESIZE + TILESIZE / 2;           //プレイヤー座標X       //ワープ処理
      gPlayerY = 25 * TILESIZE + TILESIZE / 2;           //プレイヤー座標X
      gMoveX = 0;
      gMoveY = 0;
      if(gEnforce == 0){
        gMHP += 100;
        gEnforce = 1;
      }
      console.log('ワープ')
    }
    if(fm == 17){
      if(gTalk == 0){
        setMessage  ('墓標の下にこそ祝福あり', null);
        gTalk = 1;
      }
    }
    if(( (fm == 19) || (fm == 20) || (fm == 27) || (fm == 28) )){
      if(IsMid_Boss == 0){
        IsMid_Boss = 1;
        AppearEnemy();
      } else if(gTalk == 0){
        setMessage('城内に冷たい風が吹く', 'すすり泣きの声に似ている');
        gTalk = 1;
      }
    }
    if(fm == 31){
      if(gGuard == 0){
        gGuard = 1;
        AppearEnemy();
      }
    }
    if((240 <= gPlayerX && gPlayerX <= 254) && (363 <= gPlayerY && gPlayerY <= 376)){
      if(gTalk == 0){
        if (IsBoss == 2 && gSword < 2){
          setMessage('" 勇者のつるぎ "を見つけた！', '攻撃力が上がった');
          gSword = 2;
        } else if (gSword == 0 && gLv < 10){
          setMessage('" 奇跡のつるぎ "を見つけた！', '会心の一撃を放てるようになった');
          gSword = 1;
        } else if( gSword >= 1 ){
          setMessage('元の装備に戻した', null);
          gSword = 0;
        }
        gTalk = 1;
      }
    }
    if(( 368 <= gPlayerX && gPlayerX <= 385 ) && ( 228 <= gPlayerY && gPlayerY <= 246)){
      if(gItem == 0){                                                           //カギ未所持の場合
        gPlayerY -= TILESIZE;                                                   //一マス上へ移動
        setMessage ('扉が閉ざされている', 'カギが必要なようだ');
      } else if(gItem == 1 && gGuard < 4){
        if(gTalk == 0){
          setMessage ('" 魔王城へのカギ "を差し込んだ','扉が開いた' );
          gTalk = 1;
        }
        gGuard = 3;
      }

    }
    if((400 <= gPlayerX && gPlayerX <= 414) && (28 <= gPlayerY && gPlayerY <= 42) && (gItem == 0 && gGuard == 2)){
      gItem = 1;                                                                //カギ入手処理
      setMessage ('” 魔王城へのカギ ” を手に入れた', null);
    }
    if(24 <= fm && fm <= 26){
      gHP = gMHP;                                                               //街で休憩
      console.log('休憩');
    }
    if(fm == 26){
      if(gTalk == 0 || gTalk == 1){
        setMessage ('ダメだ もうおしまいなんだぁ〜', null);
        gTalk = 2;
      }
    }
    if((fm == 21) || (fm == 22) || (fm == 30)){
      if(gTalk == 0){
        setMessage ('城内を奇妙な静けさが支配している', 'ただ魔物たちが王を偲ぶ声だけが聞こえる');
        gTalk = 1;
      } 
    }
    if( Math.random() * 100 < gEncounter[ fm ]){
      LoadImage();
      AppearEnemy();
    }
    if( fm == 29 && IsBoss == 0){
      IsBoss = 1;
      AppearEnemy();                                        //ボスエンカウント
    }
    };

  

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
      console.log('gOrder =' + gOrder );
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
      console.log('gOrder =' + gOrder );
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
    if(IsBoss == 1){
      setMessage('" 魔王デマオン "をやっつけた！', null);
    } else if(IsMid_Boss == 1){
      setMessage('" 薄氷の王女 "をやっつけた！', null);
    } else if(gGuard == 1){
      setMessage('" 魔塔の番犬 "をやっつけた！', null);
    } else if(gGuard == 3){
      setMessage('" 魔王城の門番 "をやっつけた！', null);
    } else if(IsTrueBoss == 2){
      setMessage(gFileTrueBoss.name + 'が動きを止めた', null);
    } else {
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
    } else if(IsBoss == 1 || IsMid_Boss == 1 || IsTrueBoss == 2 || gGuard == 1 || gGuard == 3){
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
    gPhase = 9;
    return;
  }

  if (gPhase == 9){
    console.log('現在' + gPhase + 'ターン');
    T = null;  
    if(IsTrueBoss == 3){
      setMessage('「%E5%AF%82%E3%81%97%E3%81%84」', '何かを呟いてそれは消えていった');
      IsTrueBoss ++;
      IsTrueBoss = 0;
    }if(IsBoss == 2){
      setMessage('魔王を倒し', '世界に平和が訪れた');
      IsBoss ++;
      IsTrueBoss = 1;
    }
    if(IsMid_Boss == 2){
      setMessage('「デマオン•••悲しまないで」', '薄氷の王女は風に消えていった');
      IsMid_Boss ++;
    }
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
      console.log('エンターボタン押下');
      GameOver();
      gPhase = 13;
    } else {
      console.log('カーソル移動');
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
