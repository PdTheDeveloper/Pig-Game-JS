var dice1,dice2,winningScore,scores,diceDOM1,diceDOM2,currentScore1,currentScore2,hasRolledSix,activePlayer;

init();

function setScores(){
    document.getElementById("score-1").textContent=scores[0]
    document.getElementById("score-2").textContent=scores[1]
    document.getElementById("current-1").textContent=currentScore1
    document.getElementById("current-2").textContent=currentScore2
}

function init(){
    document.getElementById("roll").disabled=false
    document.getElementById("hold").disabled=false
    document.getElementById("name-1").classList.remove("winner")
    document.getElementById("name-2").classList.remove("winner")
    // document.getElementById("player-1-panel").classList.remove("winner")
    // document.getElementById("player-2-panel").classList.remove("winner")
    hasRolledSix=false
    activePlayer=1
    // alert("Enter the winning score:")
    winningScore=prompt("Enter the winning score:")
    scores=[0,0]
    currentScore1=0
    currentScore2=0
    setScores()
    document.getElementById("name-1").textContent="Player 1"
    document.getElementById("name-2").textContent="Player 2"
    document.getElementById("panel-1").classList.remove("active")
    document.getElementById("panel-2").classList.remove("active")
    document.getElementById("panel-1").classList.add("active")
    document.getElementById("dice-1").style.display="none"        
    document.getElementById("dice-2").style.display="none"
    document.getElementById("roll").disabled=false
    document.getElementById("hold").disabled=false

}

function roll(){
    // console.log(Math.floor(Math.random()))
    dice1=Math.floor((Math.random())*6)+1
    dice2=Math.floor((Math.random())*6)+1
    diceDOM1 =document.getElementById("dice-1")
    diceDOM2 =document.getElementById("dice-2")
    diceDOM1.style.display="block"
    diceDOM1.src=dice1 + ".png"    
    diceDOM2.style.display="block"
    diceDOM2.src=dice2 + ".png"
    if((dice1==6 || dice2==6) && hasRolledSix){
        scores[activePlayer-1]=0
        setScores()
        nextPlayer()
        hasRolledSix=false
        return
    }
    else if((dice1==6 || dice2==6) && !(dice1==1 || dice2==1)){
        hasRolledSix=true
    } 
    else{
        hasRolledSix=false
    }
    if(dice1==1 || dice2==1){
        nextPlayer()
        return
    }
    switch(activePlayer){
        case 1:
            currentScore1+=dice1
            currentScore1+=dice2
            setScores()
            break
        case 2:
            currentScore2+=dice1
            currentScore2+=dice2
            setScores()
            break        
    }
}

function nextPlayer(){
    hasRolledSix=false
    currentScore1=0
    currentScore2=0
    setScores()
    document.getElementById("panel-1").classList.toggle("active")
    document.getElementById("panel-2").classList.toggle("active")
    if(activePlayer==1) {
        activePlayer=2
    }
    else{
        activePlayer=1  
    } 
}

function hold(){
    scores[activePlayer-1]+=currentScore1+currentScore2;
    currentScore1=0
    currentScore2=0
    setScores()
    if(scores[activePlayer-1]>=winningScore){
        document.getElementById("name-" +activePlayer).textContent="Winner!"
        document.getElementById("name-" +activePlayer).classList.add("winner")
        document.getElementById("panel-"+activePlayer).classList.add("winner")
        // console.log(document.getElementById("roll"))
        document.getElementById("roll").disabled=true
        document.getElementById("hold").disabled=true
    }
    else{
        nextPlayer()
    }
}

document.getElementById("roll").addEventListener("click",roll)

document.getElementById("hold").addEventListener("click",hold)

document.getElementById("new").addEventListener("click",init)








