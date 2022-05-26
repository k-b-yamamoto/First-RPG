'use strict';

let gSirge = 0;                                             //戦闘時包囲要素
let recoilDamage;                                           //反動ダメージ要素

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

function CommandFight(){
  gPhase = 2;                                        //戦闘コマンド選択フェーズ
  setMessage('　戦う', '　逃げる');
  stuck = false;
  if(IsBossClass){
    setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
    setBossHP(BossClassNumber);
  } else {
    setEnemyHp(EnemyNumber);
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


//戦闘行動処理関数
function Action(){
  BossEvent();
  setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
  if(IsTrueBoss == 2){
    EnemyNumber = 10;
  }
  let d = GetDamage( gLv + 3) - EnemyNumber;                     //ダメージ計算取得結果
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
    /*
    Sword(gSword);
    d += swordAttack;
    */
    //console.log('装備攻撃力' + swordAttack + 'が加算されました');

    if (gPhase == 4){
      //console.log('現在のターンは ' + gPhase);
      Sword(gSword);
      d += swordAttack;
      if(stuckNumber == 4){
        stuck = true;
      }    
      //console.log('装備攻撃力' + swordAttack + 'が加算されました');  
      if( d <= 0){
        setMessage('ミス！', '攻撃を外した');
      } else if(IsBossClass){
        setMessage('勇者の攻撃！', gFileBossClass[BossClassNumber].name + ' に ' + d + ' のダメージ！');
      } else {
        setMessage('勇者の攻撃！', gFileMonster[EnemyNumber].name + 'に ' + d + ' のダメージ！');
      }
      if (kaishin == 1){
        gMessage1 = '会心の一撃！';
      }
      if (miracle == 7){
        gMessage1 = '奇跡の一撃!!';
      }
      if (magicAttack == 1){
        gMessage1 = '命削りの一撃!!';
        recoil(gHP);
        gHP = recoilDamage;
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
      if(stuck == true){
        if(gSword == 2){
          if(IsTrueBoss == 2){
            setMessage( gFileBossClass[BossClassNumber].name + ' は', 'こちらの剣を悲しげに見つめている');          
          } else if(IsBossClass){
            setMessage( gFileBossClass[BossClassNumber].name + 'は', '剣の威力にひるんで動けない');          
          } else {
            setMessage( gFileMonster[EnemyNumber].name + 'は', '剣の威力にひるんで動けない！');          
          }  
        } else if(gSword == 3){
          if(IsBossClass){
            setMessage( gFileBossClass[BossClassNumber].name + 'は', '魔剣の魔力で動けない！');          
          } else {
            setMessage( gFileMonster[EnemyNumber].name + 'は', '魔剣の魔力で動けない！');          
          }
        }
        if(gOrder > 0 || gSirge == 1) {                        //自分が先制攻撃した場合と逃げるコマンドで回り込まれた場合
          gSirge = 0;
          gPhase = 6;                                                 //戦闘コマンドへループ
        } else {
          //console.log('gSirge = ' + gSirge);
          gPhase = 4;
        }
        stuck = false;
        return;
      } else {
        let d = GetDamage( EnemyNumber + 2);
        if(IsBossClass){
          BossPower(BossClassNumber);
          //console.log('dSP = ' + dSP);
          setMessage( gFileBossClass[BossClassNumber].name + ' の攻撃！', dSP + ' のダメージ！');
          gHP -= dSP;
        } else {
        setMessage( gFileMonster[EnemyNumber].name + 'の攻撃！', d + ' のダメージ！');
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


//ダメージ量算出式
function GetDamage(a){
  return( Math.floor( a * ( 1 + Math.random())));    //攻撃力の１〜２倍
}

function GameOver(){
  switch(gCursor){
    case 0:                                          //「コンティニュー」を選択
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
      BossClassNumber = null;
    break;

    case 1:                                         //「はじめから」を選択
      setStartStatus();
      gAngle = 0;
      gCursor = 0;                                    
      IsBoss = 0;
      IsMid_Boss = 0;
      IsTrueBoss = 0;
      gItem = 0;
      gGuard = 0;
      gSword = 0;
      BossClassNumber = null;
      gPlayerX = START_X * TILESIZE + TILESIZE / 2;  //プレイヤー座標X
      gPlayerY = START_Y * TILESIZE + TILESIZE / 2;  //プレイヤー座標Y
    break;
  }
  return;
}
