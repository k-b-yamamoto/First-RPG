'use strict';

let gOP = true;                                                //スタート画面表示要素

// メイン画面描画処理
function DrawMain(){
  const g = TUG.GR.mG;                               //仮想画面の2D描画コンテクストを取得
  if(gOP){
    DrawOP( g );                //オープニング画面
  } else if(gPhase <= 1){
    // console.log('現在' + gPhase + 'ターン');
    DrawExploration( g );          //探索画面
    DrawMarks( g );               //デバッグ用ウィンドウ
  } else {
    DrawFight( g );             //戦闘画面
  }
};


// スタート画面描画処理
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

// 探索画面描画処理
function DrawExploration( g ){
  DrawField( g );                                  //マップ描画
  DrawHero(g);                                     //プレイヤーの描画
  g.fillStyle = WNDSTYLE;                             //ウィンドウの色
  g.fillRect (12, 11, 54, 50);                        //短形描画
  DrawStatus(g);                                      //ステータス描画
  DrawMessage(g);
}


//戦闘画面描画処理
function DrawFight ( g ){
  g.fillStyle = '#000000';                           //背景色
  g.fillRect(0, 0, WIDTH, HEIGHT);                   //画面全体を矩形描画

  if( gPhase < 8){                                   //敵が生存している場合
    if(IsBossClass){
      setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
      DrawBossClass(BossClassNumber, g);
    } else {
      //モンスターの描画
      setMonsterNumber();
      DrawMonster(EnemyNumber, g);
    }
  }
  DrawStatus(g);                                                                  //ステータス描画
  DrawMessage(g);
  if( gPhase == 2 || gPhase == 3 || gPhase == 12){                //戦闘フェーズがコマンド選択中の場合
    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText('▶︎', 40, 125 + 14 * gCursor);                                      //カーソル描画
  }
}
