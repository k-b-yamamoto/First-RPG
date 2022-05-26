'use strict';

let gCursor = 0;                                            //カーソル位置
let gOrder;                                                 //行動順
let gGuard = 0;                                             //門番出現要素
let gPhase = 0;                                             //戦闘フェイズ
let IsBossClass = false;                                    //ボス出現判定要素
let IsBoss = 0;                                             //ボス要素
let IsMid_Boss = 0;                                         //中ボス要素
let IsTrueBoss = 0;                                         //裏ボス画像

function PhaseOperate(c){
  if( gKey[ c ] != 0){          //既に押下中の場合（キーリピート）
    return;
  }
  gKey[c] = 1;
  gMessage1 = null;
  gMessage2 = null;
  gMessage3 = null;
  gMessage4 = null;

  switch(gPhase){

    case 0:
      if(gHP <= 0){
        setMessage('勇者は死んでしまった', null);
        gHP = 0;
        gPhase = 11;    
      }
    break;

    case 1:
      //console.log('現在' + gPhase + 'ターン');
      gCursor = 0;
      CommandFight();
    break;

    case 2:
      //console.log('現在' + gPhase + 'ターン');
      CommandFight();
      if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
        gOrder = Math.floor(Math.random() * (2 + gSpeed));   //戦闘行動順
        //console.log('gOrder =' + gOrder );
        Action();                                            //戦闘行動処理
        } else {
          gCursor = 1 - gCursor;                            //カーソル移動
      }
    break;

    case 3:
      //console.log('現在' + gPhase + 'ターン');
      CommandFightII();
      if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
        gOrder = Math.floor(Math.random() * (2 + gSpeed));   //戦闘行動順
        //console.log('gOrder =' + gOrder );
        Action();                                            //戦闘行動処理
        } else {
          gCursor = 1 - gCursor;                            //カーソル移動
        }
    break;

    case 4:
      //console.log('現在' + gPhase + 'ターン');
      Action();
    break;

    case 5:
      //console.log('現在' + gPhase + 'ターン');
      Action();
    break;

    case 6:
      //console.log('現在' + gPhase + 'ターン');
      CommandFightII();                                      //戦闘コマンド
    break;

    case 7:
      //console.log('現在' + gPhase + 'ターン');
      setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
      //console.log('BossClassNumber = ' + BossClassNumber);
      if(BossClassNumber != null){
        if(BossClassNumber == 4){
          setMessage(gFileBossClass[BossClassNumber].name + ' が動きを止めた', null);
        } else if(BossClassNumber < 4){
          setMessage(` ${gFileBossClass[BossClassNumber].name} をやっつけた！`, null);
        }
      } else {
        //console.log('T = ' + EnemyNumber);
        setMessage(gFileMonster[EnemyNumber].name + 'をやっつけた！', null);     
      }
      gPhase = 8;
    break;

    case 8:
      //console.log('現在' + gPhase + 'ターン');
      //console.log('gBossHP = ' + gBossMHP);
      if(gCursor == 1 && gHP > 0){
        if((gEnemyMHP - gEnemyHP) == 0){
          EnemyNumber = null;
          gPhase = 0;
          return;
        } else {
          GetExp(Math.max( gEnemyMHP - gEnemyHP, 0));
          gCursor = 0;
        }
      } else if(IsBossClass){
        GetExp(gBossMHP);
      } else {
        GetExp((EnemyNumber + 1)* 3 + Math.floor(Math.random() * 4));
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
      Save();
      gPhase = 9;
    break;

    case 9:
      //console.log('現在' + gPhase + 'ターン');
      EnemyNumber = null;
      setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
      //console.log('BossClassNumber = ' + BossClassNumber);
      if(BossClassNumber){
        getBossMessage(BossClassNumber, gPhase);
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
      BossClassNumber = null;
      gPhase = 0;
    break;

    case 10:
      //console.log('現在' + gPhase + 'ターン');
      setMessage('勇者は死んでしまった', null);
      gPhase = 11;
    break;

    case 11:
      //console.log('現在' + gPhase + 'ターン');
      EnemyNumber = null;
      setMessage('    コンティニュー', '    はじめから');
      gMessage3 = 'Game Over';  
      gPhase = 12;
    break;

    case 12:
      setMessage('    コンティニュー', '    はじめから');
      gMessage3 = 'Game Over';
      //console.log('現在' + gPhase + 'ターン');
      if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
        //console.log('エンターボタン押下');
        GameOver();
        gMessage1 = null;
        gMessage2 = null;
        gMessage3 = null;
        gMessage4 = null;  
        gPhase = 0;
      } else {
        //console.log('カーソル移動');
        gCursor = 1 - gCursor;                               //カーソル移動
      }
    break;

    case 13:
      //console.log('現在' + gPhase + 'ターン');
      if( c == 13 || c == 90){                               //Enterキー、またはZキーの場合
        //console.log('エンターボタン押下');
        gOP = 0;
        gPhase = 0;
        setStartStatus();
        return;
      }
    break;
  }
}