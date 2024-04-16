
//inizio gioco indovina colore
let colori = [" ","rosso", "blu", "verde", "giallo", "grigio", "nero", "viola", "corallo", "cremisi","ciano"];
let colorsId = ["empty","red", "blue", "green", "yellow", "grey", "black","purple", "coral", "crimson", "cyan"];
let flagWheel=0;
let nPlayers = [];
let pointsPerPlayer = [];
let choicePlayer = [];
let points = [];
let pointsOnScreen = [];
let noOne = false;
window.onload = function init(){
    var preGame = document.getElementById("preGame");
    var cose = document.getElementById("preGame").innerHTML;

}
let playerSection=[];
function inizia(){

    let players = document.getElementById("players");
    let numPlayers = players.value;
    preGame.innerHTML="";
    for(let i=0; i<numPlayers; i++){
        playerSection[i] = document.createElement("div");
        playerSection[i].className = "singlePlayer";
        preGame.appendChild(playerSection[i]);
        let pl = document.createElement("p");
        pl.className = "scritte";
        pl.innerHTML = "giocatore"+(i+1);
        playerSection[i].appendChild(pl);
        
        
        let select = document.createElement("select");
        select.id = "select"+i;
        playerSection[i].appendChild(select);
        for(let j=0; j<colori.length; j++){
            let option = document.createElement("option");
            option.value = colorsId[j];
            option.text = colori[j];
            select.appendChild(option);
        }
    }
    let conferma = document.createElement("button");
    conferma.innerHTML="conferma";
    conferma.onclick= function(){
        controllaGiocatori(numPlayers, playerSection)
 
    };
    preGame.appendChild(conferma);

}
function controllaGiocatori(numPlayers, playerSection){
    let flag=0;
    for(let i=0; i<numPlayers; i++){
        //indice giocatore == indice del suo punteggio
        nPlayers[i] = i+1;
        points[i] = document.createElement("p");
        points[i].innerHTML = pointsPerPlayer[i];
        points[i].className = "puntiGiocatore";
        if(pointsPerPlayer.length == 0 || pointsPerPlayer.length < numPlayers ){
            pointsPerPlayer[i] = 0;
            pointsOnScreen[i] = false;
            points[i].style.visibility = "hidden";
        }
                

        let select = document.getElementById("select"+i);
        choicePlayer[i] = select.value;
        if(choicePlayer[i] == "empty"){
            flag = 0;
            alert("campi mancanti");
        }
        for(let j = 0; j<colorsId.length; j++){
//! ma che minchia ho scritto qui... sleep deprivhed who??
            if(choicePlayer[i] == colorsId[j] && choicePlayer[i] != "empty"){
                flag++;
            }else{
            }
        }
        if(flag == numPlayers){
        
            let color = generaColore();
            setTimeout(() =>{
                confrontaRisultati(points, playerSection);
                for(let i = 0; i<numPlayers; i++){
                    if(pointsPerPlayer[i]==0){

                    }else if(pointsPerPlayer[i]==1 && pointsOnScreen[i]==false){
                        playerSection[i].appendChild(points[i]);
                        pointsOnScreen[i] = true;
                    }
                }
            }

            ,5000)}
            
    }
}
function confrontaRisultati(points, playerSection){
    for(let i=0; i<nPlayers.length; i++){
        if(choicePlayer[i] == colorsId[colorRandomized]){
            pointsPerPlayer[i] ++;
            if(pointsPerPlayer[i] > 1){
                playerSection[i].removeChild(playerSection[i].querySelector(".puntiGiocatore"));
                points[i] = document.createElement("p");
                points[i].className = "puntiGiocatore";
            }
            points[i].innerHTML = pointsPerPlayer[i];
            points[i].style.visibility = "visible";
            playerSection[i].appendChild(points[i]);

        }else{
            noOne = true;
        }
        
    } if(noOne = true){
        alert("nessuno ha indovinato :(")

    } 
}
//!per ora non funziona
function ripristina(){
    document.getElementById("preGame").innerHTML = "<label for=\"players\">Inserisci numero Giocatori: </label><input type=\"number\" id=\"players\" min=\"1\" max=\"4\"><button onclick=\"inizia()\">Iniziamo</button>";
}
let colorRandomized;
function generaColore(){
    scorriColori();
    setTimeout(() => {

        colorRandomized = Math.floor(Math.random()*10)+1;
        if(wheelFlag>20){  
            wheelFlag=0;
        document.getElementsByTagName("body")[0].style = "background-color:" +colorsId[colorRandomized];
    }
    
},3000);
}
let wheelFlag = 0;
let intervalloColori = null;
function scorriColori(){
    intervalloColori=null;
    if(intervalloColori === null){

     intervalloColori = setInterval(() =>{
            let wheel = Math.floor(Math.random()*10)+1;
            wheelFlag++;
            document.getElementsByTagName("body")[0].style = "background-color:" +colorsId[wheel];
                if(wheelFlag>20){
                    clearInterval(intervalloColori);

                }
            }, 100);
    } 
}