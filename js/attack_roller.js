function rollD20() {
    return Math.floor((Math.random() * 20) + 1);
}
function resolveAttack (form) {
    var RoF = form.RoF.value;
    var attackBonus = form.attackBonus.value;
    var targetsAC = form.targetsAC.value;
    var critThreat = form.critThreat.value;
    var weaponVariant = form.variant.value;

    var attackDetails = "";

    var numberOfHits = 0;
    var numberOfcritHits = 0;
    var numberOfCritFailures = 0;

    for (var i = 0; i < RoF; i++) {
        var rollResult = rollD20();
        var totalAttack = +rollResult + +attackBonus;
        attackDetails += (i+1) + " támadás: " + rollResult + " + " + attackBonus + " = " + totalAttack + " vs " + targetsAC;
        if (rollResult === 1) {
            numberOfCritFailures++;
            attackDetails += " Balsiker!";
            var botchRoll = rollD20() -+weaponVariant;
            attackDetails += " Kritikus vétés dobás eredménye: " + botchRoll;
            if (botchRoll > 10 ) {
                attackDetails += " A támadás megszakadt!"
                break;
            }
        } else {
            if (totalAttack > targetsAC) {
                if (rollResult > critThreat) {
                    var confirmationRoll = rollD20();
                    var confirmationTotalAttack = +confirmationRoll + +attackBonus;
                    attackDetails += " Kritikus veszélyeztetés, konfirmáló dobás: " + confirmationRoll + " + " + attackBonus + " = " + confirmationTotalAttack + " vs " + targetsAC;
                    if ( confirmationTotalAttack > targetsAC) {
                        numberOfcritHits++;
                        attackDetails += " Kritikus találat!";
                    } else {
                        numberOfHits++;
                        attackDetails += " Normál találat!";
                    }
                } else {
                    numberOfHits++;
                    attackDetails += " Találat!";
                }
            }
        }
        attackDetails += "<br>";
    }
    document.getElementById("numberOfHits").innerHTML = "Összesen: " + numberOfHits + " találat. " + numberOfcritHits + " kritkus találat. " + numberOfCritFailures + " balsiker.";
    document.getElementById("attackDetails").innerHTML = attackDetails;
}