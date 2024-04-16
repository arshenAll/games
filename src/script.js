
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
    console.log("cose "+cose);
    console.log("pregame "+preGame);
}
let playerSection=[];
function inizia(){
    //timer di gioco
    
    //div che andrà fatta scomparire
    //let players = document.getElementById("players")
    //players.innerHTML="ciapea";
    let players = document.getElementById("players");
    let numPlayers = players.value;
    preGame.innerHTML="";
    for(let i=0; i<numPlayers; i++){
       /* let */playerSection[i] = document.createElement("div");
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
        //playerSection.appendChild(points);
    }
    let conferma = document.createElement("button");
    conferma.innerHTML="conferma";
    conferma.onclick= function(){
        controllaGiocatori(numPlayers, playerSection)
       // generaColore()
    };
    preGame.appendChild(conferma);
    //select.innerHTML="ciao";
    //preGame.innerHTML= select;
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
        console.log("select: "+choicePlayer[i]);
        console.log(typeof choicePlayer[i]);
        /* if(selectId == "empty"|| selectId == ""){
            alert("campi mancanti");
        } */
        if(choicePlayer[i] == "empty"){
            flag = 0;
            alert("campi mancanti");
            //console.log(flag);
        }
        for(let j = 0; j<colorsId.length; j++){
//! ma che minchia ho scritto qui... sleep deprivhed who??
            if(choicePlayer[i] == colorsId[j] && choicePlayer[i] != "empty"){
                flag++;
                //console.log(flag);
                console.log(choicePlayer[i]+" colors "+colorsId[j]);
            }else{
                //console.log("else "+choicePlayer[i]+" "+colorsId[j]);
            }
        }
        if(flag == numPlayers){
        
            let color = generaColore();
            setTimeout(() =>{
                console.log("colore "+ colorRandomized);
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
    console.log(nPlayers);
    console.log(pointsPerPlayer);
    console.log(choicePlayer);
}
function confrontaRisultati(points, playerSection){
    console.log("sono quiii");
    for(let i=0; i<nPlayers.length; i++){
        if(choicePlayer[i] == colorsId[colorRandomized]){
            console.log("la scelta è "+choicePlayer[i]);
            pointsPerPlayer[i] ++;
            console.log("ho aumentato");
            if(pointsPerPlayer[i] > 1){
                console.log("togliamo?");
                playerSection[i].removeChild(playerSection[i].querySelector(".puntiGiocatore"));
               // playerSection[i].removeChild(playerSection[i].querySelector('p'));
                points[i] = document.createElement("p");
                points[i].className = "puntiGiocatore";
            }
            points[i].innerHTML = pointsPerPlayer[i];
            points[i].style.visibility = "visible";
            playerSection[i].appendChild(points[i]);
            //pointsOnScreen[i]= true;
            console.log("il giocatore "+nPlayers[i]+" scegliendo "+choicePlayer[i]+" ha un totale di "+pointsPerPlayer[i]+" punti");
        }else{
            noOne = true;
            console.log("nop")
        }
        
    } if(noOne = true){
        alert("nessuno ha indovinato :(")

    } 
}
//!per ora non funziona
function ripristina(){
    console.log("yup "+preGame);
    //console.log(cose);
    //preGame.innerHTML="";
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
        console.log("bleah"+colorsId[colorRandomized]);
    }
    console.log(colorsId[colorRandomized]);
    
},3000);
console.log("ciao "+colorRandomized);
}
let wheelFlag = 0;
let intervalloColori = null;
function scorriColori(){
    intervalloColori=null;
    console.log("ciao")
    console.log(wheelFlag);
    if(intervalloColori === null){

     intervalloColori = setInterval(() =>{
            let wheel = Math.floor(Math.random()*10)+1;
            wheelFlag++;
            console.log(wheelFlag);
            document.getElementsByTagName("body")[0].style = "background-color:" +colorsId[wheel];
                if(wheelFlag>20){
                    clearInterval(intervalloColori);
                    console.log("bro");

                }
            }, 100);
    } 
}