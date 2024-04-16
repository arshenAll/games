let immagini = ["cheeta", "crocodile", "deer", "elephant", "flamingo", "fox", "giraffe", "rabbit", "tiger"];
let statoCarte = [];
let quanteScoperte = 0;
let qualeCarta = [];
let totaleCarte = 10;
let metaCarte = totaleCarte / 2;
let totDisabled = 0;
let numeroUscito = [];
let giaUscito = [];
let numero = 0;
let firstRandomized = false;
let areCreated = false;
let buttonIsGenerated = false;

// functions

function controllaCarte() {
    let input = document.getElementById("nCards");
    let inputV = input.value;
    if (inputV % 2 == 0) {
        console.log("è pari")
        totaleCarte = inputV
        metaCarte = totaleCarte / 2;
        return 1;
    } else {
        console.log("è dispari")
        return 0;
    }
}

function generaCarte() {
    console.log("cliccatoo")
    if (controllaCarte() == 1) {
        for (let i = 0; i < metaCarte; i++) {
            giaUscito[i] = 0;
            qualeCarta[i] = ""
        }
        if (numeroUscito.length <= totaleCarte - 1) {

            for (let i = 0; i < totaleCarte; i++) {
                if (firstRandomized == false) {
                    numero = Math.round(Math.random() * (metaCarte - 1));
                    numeroUscito[i] = numero;
                    giaUscito[numero] = 1;
                    firstRandomized = true;
                } else {
                    numero = Math.round(Math.random() * (metaCarte - 1));

                    if (giaUscito[numero] < 2) {
                        numeroUscito[i] = numero;
                        giaUscito[numero]++;

                    } else if (giaUscito[numero] == 2 && numeroUscito.length < totaleCarte) {
                        //! devo mettere i controlli qui
                        while (giaUscito[numero] == 2) {
                            numero = Math.round(Math.random() * (metaCarte - 1));
                        }
                        numeroUscito[i] = numero;
                        giaUscito[numero]++;
                    } else {
                        console.log("errore credo")
                    }
                }

            }

        } else if (numeroUscito.length == totaleCarte) {
            console.log("hey");

        }
        if (areCreated == false) {
            creaCarte()
        }
    } else {
        alert("inserire un numero pari")
    }
}

function creaCarte() {
    areCreated = true;
    let tavolo = document.getElementById("pickCard");
    numeroUscito.forEach((numUsc, index) => {

        let carta = document.createElement("div");
        let cartaDentro = document.createElement("div");
        let cartaDavanti = document.createElement("div");
        let cartaDietro = document.createElement("div");

        carta.appendChild(cartaDentro);
        cartaDentro.appendChild(cartaDavanti);
        cartaDentro.appendChild(cartaDietro);
        cartaDentro.className = "dentro";
        cartaDavanti.className = "davanti";
        cartaDietro.className = "dietro";
        let imgFronte = document.createElement("img");
        let imgRetro = document.createElement("img");

        imgFronte.src = "../images/" + immagini[numeroUscito[index]] + ".png";


        cartaDavanti.appendChild(imgFronte);
        cartaDietro.appendChild(imgRetro);
        carta.setAttribute("class", "carta carta" + numUsc);
        carta.className = "carta carta" + numUsc;
        carta.id = index;
        carta.onclick = function () { giraCarte(index) };
        tavolo.appendChild(carta);
    })
}
function giraCarte(index) {

    let card1;
    let card2;
    let carta = document.getElementById(index);
    carta.classList.add("ruota");

    if (quanteScoperte < 2) {

        qualeCarta[quanteScoperte] = index;
        quanteScoperte++;
    }
    if (quanteScoperte == 2) {

        card1 = document.getElementById(qualeCarta[0]);
        card2 = document.getElementById(qualeCarta[1]);

        if (card1.classList.toString() == card2.classList.toString()) {  

            quanteScoperte = 0;
            setTimeout(() => {

                card1.onclick = "return false;"

                card2.onclick = "return false;"

                totDisabled += 2;

                if (totDisabled == totaleCarte) {

                    alert("complimenti hai vinto");
                    setTimeout(() => {

                        if (buttonIsGenerated == false) {

                            let bottone = document.createElement("button");
                            bottone.innerHTML = "reset";
                            bottone.onclick = restart
                            document.body.appendChild(bottone)
                            buttonIsGenerated = true;
                        }
                    }, 500)
                }
            }, 500)



        } else {
            setTimeout(() => {
                card1.classList.remove("ruota");
                card2.classList.remove("ruota");
                quanteScoperte = 0;
            }, 500)
        }
    }

}
function restart() {

    for (let i = 0; i < totaleCarte; i++) {
        numeroUscito[i] = 0;
    }
    giaUscito = [];
    let tavolo = document.getElementById("pickCard");
    tavolo.innerHTML = "";
    numeroUscito = [];
    areCreated = false
    totDisabled = 0;

}
