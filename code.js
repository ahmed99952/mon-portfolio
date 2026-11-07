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
// Initialisation de Supabase avec vos cles
const SUPABASE_URL = 'https://fantastic-travesseiro-981c17.netlify.app/';
const SUPABASE_ANON_KEY = 'sb_publishable_qcjRUID5Q-6cKGcj1cPUfA_egg-IqG8';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('infoForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const userName = document.getElementById('name').value;
  const userAddress = document.getElementById('address').value;

  // 1. Validation nom et email (@gmail.com)
  if (userName.length > 30) {
    alert("Erreur : Le nom ne doit pas dépasser 30 caractères.");
    return;
  }
  if (!userAddress.toLowerCase().endsWith("@gmail.com")) {
    alert("Erreur : L'adresse doit se terminer par '@gmail.com'.");
    return;
  }
  // 2. Enregistrement dans la base de données Supabase
  const { data, error } = await supabase
    .from('messages_contact')
    .insert([{ name: userName, email: userAddress }]);

  if (error) {
    alert("Erreur lors de l'enregistrement : " + error.message);
  } else {
    alert("Succès ! Données enregistrées dans la base de données.");
    this.reset();
  }
  




  
});

  alert("Syntaxe invalide ! L'email doit se terminer par @gmail.com");
  return false;
}
