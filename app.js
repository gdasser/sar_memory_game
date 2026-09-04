let players=[], currentPlayer=0, deck=[], currentCard=null, currentQuestion=null;
let timerId=null, seconds=60, answerLocked=false;

const $=id=>document.getElementById(id);
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
  .replace(/[–—]/g,"-").replace(/[°]/g," degrees ").replace(/[^\w./+-]+/g," ").trim();
// matching-normaliser: also flatten "/" and "-" so "on-demand" ~ "on demand", "CSA / ASC" ~ "csa asc"
const mnorm=s=>norm(s).replace(/[\/_-]/g," ").replace(/\s+/g," ").trim();
const toks =s=>mnorm(s).split(" ").filter(t=>t.length>1);
const nums =s=>toks(s).filter(t=>/\d/.test(t));
const words=s=>toks(s).filter(t=>/[a-z]/.test(t)&&t.length>=3);

function renderNames(){
  const n=+$("playerCount").value;
  $("playerNames").innerHTML=Array.from({length:n},(_,i)=>
    `<label>Player ${i+1}<input id="p${i}" value="Player ${i+1}" maxlength="24"></label>`).join("");
}
$("playerCount").addEventListener("change",renderNames); renderNames();

$("startBtn").onclick=()=>{
  players=Array.from({length:+$("playerCount").value},(_,i)=>({name:$(`p${i}`).value.trim()||`Player ${i+1}`,score:0}));
  currentPlayer=0; deck=SATELLITES.map((_,i)=>i);
  $("setup").classList.add("hidden"); $("game").classList.remove("hidden");
  startTurn();
};

function hideReveal(){
  $("revealHeader").classList.add("hidden");
  $("revealImg").removeAttribute("src");
  $("revealName").textContent="";
}

function startTurn(){
  clearInterval(timerId);
  if(deck.length===0){endGame();return}
  $("turnPlayer").textContent=players[currentPlayer].name;
  $("scoreMini").textContent=players[currentPlayer].score;
  $("cardsLeft").textContent=deck.length;
  $("studyPanel").classList.remove("hidden");
  $("rollPanel").classList.add("hidden");
  $("questionPanel").classList.add("hidden");
  $("finishStudyBtn").disabled=false;
  hideReveal();
  currentCard=deck.splice(Math.floor(Math.random()*deck.length),1)[0];
  $("satelliteImage").src=`assets/${SATELLITES[currentCard].image}`;
  seconds=60; updateTimer();
  timerId=setInterval(()=>{seconds--;updateTimer();if(seconds<=0)finishStudy()},1000);
  renderScores();
}
function updateTimer(){$("timer").textContent=`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`}
$("finishStudyBtn").onclick=finishStudy;

function finishStudy(){
  if($("studyPanel").classList.contains("hidden"))return;
  clearInterval(timerId); $("finishStudyBtn").disabled=true;
  $("studyPanel").classList.add("hidden"); $("rollPanel").classList.remove("hidden");
  $("die").textContent="?"; $("rollBtn").disabled=false;
}
$("rollBtn").onclick=()=>{
  $("rollBtn").disabled=true;
  const value=Math.floor(Math.random()*6)+1;
  $("die").textContent=value;
  currentQuestion=QUESTIONS[value-1];
  setTimeout(()=>{
    $("rollPanel").classList.add("hidden");
    $("questionPanel").classList.remove("hidden");
    hideReveal();
    $("questionNumber").textContent=`Question ${value}`;
    $("questionText").textContent=currentQuestion.text;
    $("answer").value=""; $("answer").focus();
    $("feedback").innerHTML=""; $("feedback").className="";
    $("submitAnswerBtn").classList.remove("hidden");
    $("nextTurnBtn").classList.add("hidden");
    answerLocked=false;
  },500);
};

function expected(card,q){
  switch(q.field){
    case "country_operator": return `${card.country} / ${card.operator}`;
    case "availability":     return card.availability;
    case "operational":      return card.operational;
    case "sensor":           return card.sensor;
    case "revisit":          return card.revisit;
    case "los":              return card.los;
  }
}
function checkAnswer(input,card,q){
  const a=" "+mnorm(input)+" ";
  if(a.trim()==="")return false;
  const has=t=>a.includes(t);
  switch(q.field){
    case "country_operator":{
      const opHit=words(card.operator).some(has);
      const ctHit=words(card.country).some(has) || (card.country.includes("European") && (has("eu")||has("europe")));
      return opHit && ctHit;
    }
    case "sensor":{      const n=nums(card.sensor);       return n.length>0 && n.every(has); }
    case "operational":{ const n=nums(card.operational);  return n.length>0 && n.every(has); }
    case "availability":{const w=words(card.availability);return w.length>0 && w.every(has); }
    case "revisit":{     const t=toks(card.revisit);      return t.length>0 && t.every(has); }
    case "los":{         const t=toks(card.los);          return t.length>0 && t.every(has); }
  }
  return false;
}
function revealSatellite(card){
  $("revealImg").src=`assets/${card.image}`;
  $("revealName").textContent=card.name;
  $("revealHeader").classList.remove("hidden");
}
$("submitAnswerBtn").onclick=()=>{
  if(answerLocked)return;
  answerLocked=true;
  const card=SATELLITES[currentCard];
  const correct=checkAnswer($("answer").value,card,currentQuestion);
  revealSatellite(card);
  if(correct){
    players[currentPlayer].score++;
    $("feedback").className="correct";
    $("feedback").innerHTML=`✓ Correct! <strong>${card.name}</strong> is collected by ${players[currentPlayer].name}.`;
  }else{
    deck.push(currentCard);
    $("feedback").className="incorrect";
    $("feedback").innerHTML=`✗ Not correct. This was <strong>${card.name}</strong>.<br><br><strong>Correct answer:</strong> ${expected(card,currentQuestion)}`;
  }
  $("submitAnswerBtn").classList.add("hidden");
  $("nextTurnBtn").classList.remove("hidden");
  renderScores();
};
$("nextTurnBtn").onclick=()=>{
  currentPlayer=(currentPlayer+1)%players.length;
  startTurn();
};
function renderScores(){
  const max=Math.max(1,...players.map(p=>p.score));
  $("scoreboard").innerHTML=players.map(p=>`<div class="score-row"><div class="score-name">${escapeHtml(p.name)}</div><div class="bar"><i style="width:${p.score/max*100}%"></i></div><div class="score-num">${p.score}</div></div>`).join("");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function endGame(){
  clearInterval(timerId);
  const best=Math.max(...players.map(p=>p.score));
  const winners=players.filter(p=>p.score===best).map(p=>p.name).join(" & ");
  $("studyPanel").classList.add("hidden"); $("rollPanel").classList.add("hidden"); $("questionPanel").classList.add("hidden");
  $("game").innerHTML=`<section class="panel"><h1>🏆 Game over</h1><h2>${escapeHtml(winners)} win${winners.includes("&")?"":"s"} with ${best} satellite${best===1?"":"s"}!</h2><div id="scoreboard"></div><button class="primary" onclick="location.reload()">New game</button></section>`;
  renderScores();
}
$("helpBtn").onclick=()=>$("helpModal").classList.remove("hidden");
$("closeHelp").onclick=()=>$("helpModal").classList.add("hidden");
$("helpModal").onclick=e=>{if(e.target===$("helpModal"))$("helpModal").classList.add("hidden")};
