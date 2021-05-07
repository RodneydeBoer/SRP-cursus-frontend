// ophalen van de elementen
const takenVeld = document.querySelector("input");
const toevoegKnop = document.querySelector("section button");
const overzicht = document.querySelector("ul");
const resetKnop = document.querySelector("footer button");


// Bij het toevoegen van een letter/woord
takenVeld.onkeyup = () => {
    let ingevoerdeTaak = takenVeld.value; //getting user entered value
    if (ingevoerdeTaak.trim() != 0) { //Wanneer de input letters zijn en geen spatie
        toevoegKnop.classList.add("actief"); //het toevoegen van een active class aan de button, zodat deze klikbaar wordt
    } else {
        toevoegKnop.classList.remove("actief"); //Als er niets ingevoerd wordt of het alleen spaties staan wordt automatisch de actieve stand verwijderd, dus ook als je iets ingevoerd had en weer hebt verwijderd
    }
}

VertoonTaken(); // Het standaard uitvoeren van de functie hieronder

toevoegKnop.onclick = () => { //Wanneer de gebruiker op de toevoegknop drukt
    let ingevoerdeTaak = takenVeld.value; //ophalen van inputwaarde uit de takenbox
    let lokaleOpslag = localStorage.getItem("Nieuwe Taak"); //ophalen lokale opslag
    if (lokaleOpslag == null) { // checken of lokaleOpslag data heeft
        takenLijst = []; //Aanmaken lege array voor de takenlijst
    } else {
        takenLijst = JSON.parse(lokaleOpslag); //omzetten van json string naar een js object
    }
    takenLijst.push(ingevoerdeTaak); //de nieuwe waarde teoveogen aan de takenlijst
    localStorage.setItem("Nieuwe Taak", JSON.stringify(takenLijst)); //omzetten van json string naar een js object
    VertoonTaken(); //aanroepen van de functie
    toevoegKnop.classList.remove("actief"); //deactiveren van de toevoegknop
}

function VertoonTaken() {
    let lokaleOpslag = localStorage.getItem("Nieuwe Taak");
    if (lokaleOpslag == null) {
        takenLijst = [];
    } else {
        takenLijst = JSON.parse(lokaleOpslag);
    }
    const actieveTaken = document.querySelector("span span");
    actieveTaken.textContent = takenLijst.length; //Het doorgeven van het aantal taken in de array naar de span
    if (takenLijst.length > 0) {
        resetKnop.classList.add("actief"); //activeren van resetknop als er taken bestaan
    } else {
        resetKnop.classList.remove("actief");
    }
    let nieuweTaak = "";
    takenLijst.forEach((element, index) => {
        nieuweTaak += `<li>${element}<span class="icoon" onclick="verwijderTaak(${index})"><i class="fa fa-trash"></i></span></li>`;
    }); // foreach loop om per taak in de takenlijst een verwijderknop toe te voegen
    overzicht.innerHTML = nieuweTaak; //toevoegen van nieuwe LI's
    takenVeld.value = ""; //resetten van inputveld, nadat taak is toegevoegd
}

// taak verwijder functie
function verwijderTaak(index) {
    let lokaleOpslag = localStorage.getItem("Nieuwe Taak");
    takenLijst = JSON.parse(lokaleOpslag);
    takenLijst.splice(index, 1); //verwijderen van de LI
    localStorage.setItem("Nieuwe Taak", JSON.stringify(takenLijst));
    VertoonTaken(); //verversen van de takenlijst
}

// resetten van de takenlijst
resetKnop.onclick = () => {
    takenLijst = []; //empty the array
    localStorage.setItem("Nieuwe Taak", JSON.stringify(takenLijst));
    VertoonTaken(); //verversen takenlijst
}