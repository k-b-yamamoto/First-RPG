'use strict';

let gSirge = 0;                                             //戦闘時包囲要素
let OrderDice;                                              //戦闘順序決定要素

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

function judgeOrder(gShoes){                         //戦闘行動順決定関数
  ShoesEffect(gShoes);
  // console.log('gplusspeed = ' + gPlusSpeed);
  OrderDice = Math.floor(Math.random() * (2 + Math.round(hero1.getSpeed + gPlusSpeed)));   //戦闘行動順
  // console.log('orderDice = ' + OrderDice);
  return OrderDice;
}


//戦闘行動処理関数
function operateFight(gOrder){
  BossEvent();
  setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard);
  if(IsTrueBoss == 2){
    EnemyNumber = 10;
  }
  if(gCursor == 0){                                                 //「戦う」を選択
    if (gPhase == 2 || gPhase == 3){                                //戦闘行動順を反映
      if(gOrder == 0){
        gPhase = 5;
      } else {
        gPhase = 4;
      }
    }

    if (gPhase == 4){
      //console.log('現在のターンは ' + gPhase);
      HeroAttack();                                                 //勇者の攻撃処理
      if(IsBossClass){                                               //ボスクラスダメージ処理
        gBossHP -= Math.max(d, -1);
        if(gBossHP <= 0){
          gPhase = 7;
          return;
        }
      } else {                                                      //敵ダメージ処理
        gEnemyHP -= Math.max(d, -1);
        console.log('ターン4終了時の敵HP = ' + gEnemyHP);
        if(gEnemyHP <= 0){
          gPhase = 7;
          return;
        }
      }
      // console.log('gOrder = ' + gOrder);
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
        StuckEffect(gSword);
        stuck = false;
      } else {
        MonsterAttack();
      }
      // console.log('戦闘ループ処理を開始します。');
      if (hero1.getHp <= 0){                                               //プレイヤーが死亡した場合
        hero1.setHp = 0;
        gPhase = 10;                                                //死亡フェイズ
      } else if(gOrder > 0 || gSirge == 1) {                        //自分が先制攻撃した場合と逃げるコマンドで回り込まれた場合
        // console.log('gSirge = ' + gSirge);
        gSirge = 0;
        gPhase = 6;                                                 //戦闘コマンドへループ
      } else {
        // console.log('gSirge = ' + gSirge);
        // console.log('gOrder = ' + gOrder);
        gPhase = 4;
      }
      return;
    }
  } else if(gCursor == 1){                                          //「逃げる」コマンド選択時
    ShoesEffect(gShoes);
    hero1.setSpeed = hero1.getSpeed + gPlusSpeed;
    Run();
    return;
  }
  gPhase ++;                                             //フェーズ経過
  return;
}