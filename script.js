    // Importation des fonctions nécessaires depuis Firebase SDK
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

    // Configuration Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAXgwHt9qOSCPee2bzOR-Hl6myxEdIWKhc",
      authDomain: "portofolio-87390.firebaseapp.com",
      projectId: "portofolio-87390",
      storageBucket: "portofolio-87390.firebasestorage.app",
      messagingSenderId: "1019312072851",
      appId: "1:1019312072851:web:87825c6c315a75da80c566"
    };

    // Initialisation de Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Sélection du conteneur pour afficher les projets
    const container = document.getElementById('projets-container');

    // Fonction pour afficher les projets depuis Firestore
    async function afficherProjets() {
      try {
        const projetsRef = collection(db, "projets");  // Nom de la collection
        const snapshot = await getDocs(projetsRef);  // Récupère tous les documents de la collection

        console.log('Nombre de projets récupérés:', snapshot.size);  // Log du nombre de projets récupérés

        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            const projet = doc.data();
            const div = document.createElement('div');
            div.className = 'projet';
            div.innerHTML = `
              <h2>${projet.titre}</h2>
              <p>${projet.description}</p>
              <div class="images">
                <img src="${projet.image1}" alt="Image 1">
                <img src="${projet.image2}" alt="Image 2">
                <img src="${projet.image3}" alt="Image 3">
                <img src="${projet.image4}" alt="Image 4">
              </div>
              <p><a href="${projet.lien}" target="_blank">Voir le projet</a></p>
            `;
            container.appendChild(div);
          });
        } else {
          console.log("Aucun projet trouvé.");
          container.innerHTML = "<p>Aucun projet trouvé.</p>";
        }
      } catch (error) {
        console.error("Erreur de récupération des projets:", error);
        container.innerHTML = "<p>Erreur de chargement des projets.</p>";
      }
    }

    // Appel de la fonction pour afficher les projets
    afficherProjets();