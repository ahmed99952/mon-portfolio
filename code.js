/*      document.getElementById('infoForm').addEventListener('submit', function(event) {
  // Empêche le rechargement de la page par défaut
  event.preventDefault();

  // Récupération des valeurs
   userName = document.getElementById('name').value;


  // 1. Condition : Le nom ne doit pas dépasser 30 caractères
  //if (userName.length > 30) {
    //alert("Erreur : Le nom ne doit pas dépasser 30 caractères.");
    //return; // Arrête l'exécution
  //}


  // 2. Condition stricte : L'adresse doit obligatoirement se terminer par "@gmail.com"
  // On utilise une expression régulière pour être sûr à 100%
  /const gmailRegex = /@gmail\.com$/i; // Le '$' signifie "qui se termine par"
  
  if (!gmailRegex.test(userAddress)) {
    alert("Erreur : L'adresse doit obligatoirement se terminer par '@gmail.com'.");
    return; // Arrête l'exécution
  } 
/*function verifierEmail() {
    let email = document.getElementById(" email ").value;

    let pos = email.lastIndexOf(" @" );

    if (pos > 0 && email.substring(pos) == "gmail.com ") {
        return true;
    } else {
        alert(" Email invalide ! ");
        return false;
    }
}*/
function verifierEmail() {
  const email = document.getElementById("email").value.trim();
  const pos = email.indexOf("@");

  if (pos > 0 &&
      email.indexOf("@", pos + 1) === -1 &&
      email.endsWith("@gmail.com")) {
    alert("Email valide");
    return true;
  }

  alert("Syntaxe invalide ! L'email doit se terminer par @gmail.com");
  return false;
}