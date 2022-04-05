

window.onload = function () {
    initialiserPage();
}

function initialiserPage(){
    console.log("initialiserPage");
    zoneBodyTableau=document.getElementById("bodyTableau");
    zoneLeague=document.getElementById("league");
    zoneSaison=document.getElementById("saison");
    zoneClassement=document.getElementById("classement")

    loadClassementWithAjax();
}

function loadClassementWithAjax(){
    //************ CODE A ANALYSER ET COMPRENDRE EN TP ***************************
    makeAjaxGetRequest("../classement/2020/61" ,  function(texteReponse){
        console.log(texteReponse);
        tabClass = JSON.parse(texteReponse /* au format json string */);
        /* //old simulated values:
        tabDevises.push({code:'EUR' , nom : 'Euro' , change : 1})
        tabDevises.push({code:'USD' , nom : 'Dollar' , change : 1.1})
        */
            addTeamRow(tabClass);
            /*zoneLeague.innerHTML = tabClass.league.name;
            zoneSaison.innerHTML = tabClass.league.season;*/
    });
}

function addTeamRow(tabClass){
    //ajout de nouvelleDevise dans le tableau HTML (partie zoneBodyTableau)
    for(i=0;i<tabClass.league.standings.length;i++) {

        var newRow = zoneBodyTableau.insertRow(-1) ;//-1 pour ajout à la fin
        newRow.setAttribute("id","tr_"+i);
        if(i<4) {
            newRow.style.backgroundColor = "#2CBC48";
        }

        else if(i>16) {
            newRow.style.backgroundColor = "#FF6363";
        }
        //pour acces rapide future suppression et autre
        newRow.insertCell(0).innerHTML = tabClass.league.standings[i].rank
        newRow.insertCell(1).innerHTML = tabClass.league.standings[i].team.name;
        newRow.insertCell(2).innerHTML = tabClass.league.standings[i].points;
        newRow.insertCell(3).innerHTML = tabClass.league.standings[i].all.played;
        newRow.insertCell(4).innerHTML = tabClass.league.standings[i].all.win;
        newRow.insertCell(5).innerHTML = tabClass.league.standings[i].all.lose;
        newRow.insertCell(6).innerHTML = tabClass.league.standings[i].all.draw;
        newRow.insertCell(7).innerHTML = tabClass.league.standings[i].goalsDiff;
        newRow.insertCell(8).innerHTML = tabClass.league.standings[i].form;
        
    }
 
    
}


/*function selectionnerDevise(code){
    idSelected=code;
    console.log("idSelected="+idSelected);
    currentDevise=tabDeviseElementFromCode(idSelected);
    displayDevise(currentDevise);
    document.getElementById("bntAdd").disabled = true; 
    document.getElementById("bntUpdate").disabled = false; 
    document.getElementById("bntDelete").disabled = false; 
}

function displayDevise(devise){
    //afficher les parties de l'objet devise dans les zones de la page
     zoneCode.value=devise.code ;
     zoneNom.value=devise.nom ;
     zoneChange.value=devise.change;
}

function mettreEnValeurLigneSelectionnee(selectedTr){
    var trNodeList = zoneBodyTableau
            .getElementsByTagName("tr");
    var nbLines = trNodeList.length;
    for(i=0;i<nbLines;i++){
        var tr = trNodeList.item(i);
        if(tr == selectedTr){
            tr.querySelector("td").style.backgroundColor="lightblue";
        }else{
            tr.querySelector("td").style.backgroundColor="white";
        }
    }
}


function tabDeviseElementFromCode(code){
    var d = null;
    for(i=0;i<tabDevises.length;i++){
        if(tabDevises[i].code == code){
            d=tabDevises[i]; break;
        }
    }
    return d;
}*/