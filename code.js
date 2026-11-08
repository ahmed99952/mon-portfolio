document.getElementById("infoForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = this;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation : nom (30 caractères max) et email @gmail.com
  if (name.length > 30) {
    alert("Erreur : Le nom ne doit pas dépasser 30 caractères.");
    return;
  }
  if (!/^[^@\s]+@gmail\.com$/i.test(email)) {
    alert("Syntaxe invalide ! L'email doit se terminer par @gmail.com");
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;

  try {
    // Enregistrement dans la base de données Netlify
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      alert("Erreur lors de l'enregistrement : " + (result.error || response.statusText));
      return;
    }

    alert("Succès ! Votre message a bien été envoyé.");
    form.reset();
  } catch (err) {
    alert("Erreur réseau : impossible d'envoyer le message.");
  } finally {
    button.disabled = false;
  }
});
