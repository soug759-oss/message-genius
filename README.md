# ✨ MessageGenius — Générateur de Messages IA

Site de génération de messages personnalisés par IA, avec paiement de 0,30€ par Stripe.

---

## 🚀 MISE EN LIGNE EN 10 MINUTES (sur Render.com — GRATUIT)

### Étape 1 — Créer vos comptes
1. **Stripe** : https://stripe.com → Créer un compte → Récupérer vos clés API dans "Développeurs > Clés API"
2. **Anthropic** : https://console.anthropic.com → Créer un compte → Récupérer votre clé API
3. **GitHub** : https://github.com → Créer un compte
4. **Render** : https://render.com → Créer un compte (gratuit)

### Étape 2 — Mettre le code sur GitHub
1. Créez un nouveau dépôt sur GitHub (bouton "New repository")
2. Uploadez tous les fichiers du dossier (index.html, server.js, package.json)

### Étape 3 — Déployer sur Render
1. Allez sur render.com > "New Web Service"
2. Connectez votre dépôt GitHub
3. Configuration :
   - Build Command : `npm install`
   - Start Command : `npm start`
4. Ajoutez vos variables d'environnement :
   - `STRIPE_SECRET_KEY` = votre clé secrète Stripe (sk_live_...)
   - `ANTHROPIC_API_KEY` = votre clé Anthropic
5. Cliquez "Deploy" → Votre site est en ligne !

### Étape 4 — Mettre votre clé Stripe publique dans index.html
Dans le fichier `index.html`, ligne ~240, remplacez :
```
stripePublicKey: 'pk_test_VOTRE_CLE_STRIPE_ICI'
```
Par votre vraie clé publique Stripe (pk_live_...)

---

## 💰 Combien ça vous rapporte ?
- Stripe prend ~1,4% + 0,25€ par transaction
- Sur 0,30€ : vous touchez environ **0,04€ net par message**
- Pour gagner 100€/mois : ~2500 messages générés

## 📋 Fichiers inclus
- `index.html` — Le site web (frontend)
- `server.js` — Le serveur (backend)
- `package.json` — Les dépendances
- `README.md` — Ce guide

---

*Propulsé par Claude d'Anthropic et Stripe*
