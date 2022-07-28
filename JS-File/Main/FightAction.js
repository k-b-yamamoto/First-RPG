'use strict';

let d = 0;                                                  //戦闘ダメージ要素

//ダメージ量算出式
function GetDamage(a){
  return( Math.floor( a * ( 1 + Math.random())));    //攻撃力の１〜２倍
}

//勇者の攻撃処理
function HeroAttack(){
  d = GetDamage( hero1.getLv + 3) - EnemyNumber;                     //ダメージ計算取得結果
  Sword(hero1.getGSword);
  d += swordAttack;
  //console.log('ダメージ = ' + d);
  //console.log('装備攻撃力' + swordAttack + 'が加算されました');
  if(stuckNumber == 4){
    stuck = true;
  }    
  //console.log('装備攻撃力' + swordAttack + 'が加算されました');  
  if( d <= 0){
    setMessage('ミス！', '攻撃が効かない');
  } else if(IsBossClass){
    setMessage('勇者の攻撃！', boss.getEnemyName + ' に ' + d + ' のダメージ！');
    if(Math.floor(Math.random() * 101) > boss.getEnemyMHP){
      gMessage2 = `しかし${boss.getEnemyName}は攻撃をかわした！`;
      d = 0;
      // console.log('ダメージ = ' + d);
    }
  } else {
    setMessage('勇者の攻撃！', monster.getEnemyName + 'に ' + d + ' のダメージ！');
    if(Math.floor(Math.random() * (10 - EnemyNumber)) > 5){
      gMessage2 = `しかし${monster.getEnemyName}は攻撃をかわした！`;
      d = 0;
    }
  }
  if (kaishin == 1){
    gMessage1 = '会心の一撃！';
  }
  if (miracle == 7){
    gMessage1 = '奇跡の一撃!!';
  }
  if (magicAttack == 1){
    gMessage1 = '命削りの一撃!!';
    recoil(hero1.getHp);
    hero1.setHp = recoilDamage;
  }
  return d;
}

function MonsterAttack(){
  let d = GetDamage( EnemyNumber + 2);
  ShoesEffect(gShoes);
  if(IsBossClass){
    BossPower(BossClassNumber);
    //console.log('dSP = ' + dSP);
    let avoidJudge = Math.floor(Math.random() * (Math.floor(boss.getEnemyMHP / 5)));
    //console.log("gavoid = " + gAvoid);
    //console.log("avoidjudge = " + avoidJudge);
    setMessage( boss.getEnemyName + ' の攻撃！', dSP + ' のダメージ！');
    if(Math.floor(hero1.getGAvoid) > avoidJudge){
      dSP = 0;
      gMessage2 = 'しかし勇者はヒラリとかわした！';
    }
    hero1.setHp = hero1.getHp - dSP;
  } else {
    let avoidJudge = Math.floor(Math.random() * (EnemyNumber + 5));  
    setMessage( monster.getEnemyName + 'の攻撃！', d + ' のダメージ！');
    if(Math.floor(hero1.getGAvoid) > avoidJudge){
      d = 0;
      gMessage2 = 'しかし勇者はヒラリとかわした！';
    }
    hero1.setHp = hero1.getHp - d;
    // return gHP;
  }
}

function StuckEffect(gSword){
  if(gSword == 2){
    if(IsTrueBoss == 2){
      setMessage( boss.getEnemyName + ' は', 'こちらの剣を悲しげに見つめている');          
    } else if(IsBossClass){
      setMessage( boss.getEnemyName + 'は', '剣の威力にひるんで動けない');          
    } else {
      setMessage( monster.getEnemyName + 'は', '剣の威力にひるんで動けない！');          
    }  
  } else if(gSword == 3){
    if(IsBossClass){
      setMessage( boss.getEnemyName + 'は', '魔剣の魔力で動けない！');          
    } else {
      setMessage( monster.getEnemyName + 'は', '魔剣の魔力で動けない！');          
    }
  }
  return gPhase;
}

// ゲームオーバー時復帰処理
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
      hero1.setHp = StartStatus[0];
      hero1.setMhp = StartStatus[1];
      hero1.setGEx = StartStatus[2];
      hero1.setLv = StartStatus[3];
      hero1.setEnforce = StartStatus[4];
      hero1.setGItem = StartStatus[5];
      hero1.setSpeed = StartStatus[6];
      hero1.setGSword = StartStatus[7];
      hero1.setPlayerX = StartStatus[8] * TILESIZE + TILESIZE / 2;
      hero1.setPlayerY = StartStatus[9] * TILESIZE + TILESIZE / 2;
      hero1.setGAvoid = StartStatus[10];
      gAngle = 0;
      gCursor = 0;                                    
      IsBoss = 0;
      IsMid_Boss = 0;
      IsTrueBoss = 0;
      BossClassNumber = null;
    break;
  }
  return;
}

function Run(){
  if(IsBossClass){
    setMessage('逃げることができない！', null);
    gPhase = 5;
    gCursor = 0;
    gSirge = 1;
  } else if(Math.floor(Math.random() * (10 * hero1.getSpeed)) > 2){                         //「逃げる」成功
    setMessage('なんとか逃げ切れた', null);
    //console.log('逃走経験値 = ' + (gEnemyMHP - gEnemyHP));
    gPhase = 8;
  } else {                                               //「逃げる」失敗
    setMessage('回り込まれてしまった', null);
    gPhase = 5;
    gCursor = 0;
    gSirge = 1;
  }
  return gPhase;
}


// ゲームオーバー時メッセージ
function setGOMessage(){
  setMessage('    コンティニュー', '    はじめから');
  gMessage3 = 'Game Over';  
}
