
# 💼 Plateforme de Gestion d’Offres d’Emploi
*Projet en JavaScript Vanilla – Front-End Interactif et Dynamique*

---

## 🧭 Description du projet
Cette application web est une **plateforme de gestion d’offres d’emploi** développée entièrement en **JavaScript Vanilla**, sans framework.  
Elle permet aux utilisateurs de :
- Gérer leur profil et leurs compétences
- Publier, modifier et supprimer des offres d’emploi
- Rechercher et filtrer des offres selon plusieurs critères
- Ajouter des offres à leurs favoris
- Profiter d’une expérience utilisateur fluide et responsive

Le projet met l’accent sur une **architecture JavaScript modulaire**, la **validation de formulaires** et la **persistance des données** via `localStorage`.

---

## 🚀 Fonctionnalités principales

### 1. Validation de formulaires
- Validation du **profil utilisateur** : nom, email, compétences
- Validation du **formulaire d’offre** : titre, entreprise, description
- **Feedback en temps réel** : messages d’erreur et de succès à la saisie
- Validation HTML5 + logique personnalisée en JavaScript

### 2. Recherche et filtrage avancé
- Recherche par mots-clés dans les titres, entreprises et descriptions
- Filtres multiples : compétences, type de contrat, localisation
- Filtrage combiné (recherche + filtres actifs)
- Résultats mis à jour instantanément

### 3. Opérations CRUD sur les offres
- **Créer** une nouvelle offre via un formulaire modal
- **Modifier** une offre existante
- **Supprimer** une offre avec confirmation
- **Afficher** les offres sous forme de cartes responsives

### 4. Système de favoris
- Ajout/retrait d’offres favorites
- Section “Mes Favoris” dédiée
- Persistance via `localStorage`

### 5. Gestion de profil utilisateur
- Ajout/suppression de compétences
- Sauvegarde automatique du profil
- Configuration des préférences (métier, localisation, etc.)

### 6. Gestion d’événements
- Suivi des interactions : clics, navigation, soumission de formulaires
- Navigation fluide entre les sections : *Toutes les offres*, *Mes Offres*, *Favoris*

---

## 🧰 Technologies utilisées

| Technologie | Description |
|--------------|-------------|
| **HTML5** | Structure sémantique et validation native |
| **CSS3 (Grid & Flexbox)** | Mise en page responsive et moderne |
| **JavaScript Vanilla (ES Modules)** | Logique fonctionnelle et interactions |
| **LocalStorage API** | Persistance des données (profil, favoris, offres) |
| **JSON** | Format d’échange et manipulation des offres |

---

## 🧠 Architecture du projet

# 📁 Structure du projet : sprint-2-brief-1 [job-listings-dom-js]

```bash
📦 sprint-2-brief-1 [job-listings-dom-js]
├── .idea/                 # Configuration de l'environnement JetBrains
├── assets/
│   ├── data/
│   │   └── data.json      # Données des offres d'emploi (fichier JSON)
│   ├── starter.js         # Script principal JavaScript
│   └── style.css          # Feuille de style principale (responsive et moderne)
├── .gitignore             # Fichiers/dossiers ignorés par Git
├── index.html             # Page principale de l’application
└── README.md              # Documentation du projet
```

**💡 Remarques :**
- Le dossier `assets/data/` contient les **données simulées** (offres d’emploi).  
- Le fichier `starter.js` gère la **logique du DOM**, les interactions et la manipulation des données.  
- Le fichier `style.css` contient le **design global**, les couleurs et la mise en page responsive.  
- L’application est **100% JavaScript Vanilla**, sans framework ni dépendances externes.

---