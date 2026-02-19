const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const Stripe = require('stripe');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// =============================================
// ⚙️ CONFIGURATION — METTEZ VOS CLÉS ICI
// =============================================
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_VOTRE_CLE_STRIPE_SECRETE';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'VOTRE_CLE_ANTHROPIC';
// =============================================

const stripe = new Stripe(STRIPE_SECRET_KEY);
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// Catégorie → description pour l'IA
const categoryDescriptions = {
  amour: "message d'amour tendre et affectueux",
  seduction: "message de séduction charmant et attractif",
  professionnel: "message professionnel et courtois",
  anniversaire: "message d'anniversaire chaleureux et festif",
  excuses: "message d'excuses sincère et touchant",
  amitie: "message d'amitié sincère et chaleureux",
  motivation: "message de motivation inspirant et énergisant",
  rupture: "message de rupture respectueux et honnête",
  felicitations: "message de félicitations enthousiaste",
  remerciements: "message de remerciements chaleureux et sincère",
  condoleances: "message de condoléances respectueux et compatissant",
  humour: "message humoristique et amusant"
};

const lengthInstructions = {
  court: "très court, 1 à 2 phrases maximum",
  moyen: "d'un paragraphe, environ 3 à 5 phrases",
  long: "long et complet, plusieurs paragraphes"
};

// ─── CRÉER UN PAYMENT INTENT STRIPE ──────────────────
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 30, // 30 centimes = 0.30€
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: { service: 'message-generator' }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GÉNÉRER LE MESSAGE AVEC CLAUDE ───────────────────
app.post('/api/generate', async (req, res) => {
  const { category, tone, context, length, language } = req.body;

  const categoryDesc = categoryDescriptions[category] || 'message personnalisé';
  const lengthDesc = lengthInstructions[length] || "d'un paragraphe";

  const prompt = `Tu es un expert en rédaction de messages personnalisés. 
Génère un ${categoryDesc} en ${language || 'français'}.

Ton du message: ${tone || 'sincère'}
Longueur: ${lengthDesc}
${context ? `Contexte et informations: ${context}` : ''}

Instructions:
- Le message doit être authentique, touchant et parfaitement adapté
- Évite les clichés trop communs
- Adapte le niveau de langue au contexte
- Ne mets aucune introduction comme "Voici votre message:" — commence directement le message
- Le message doit sembler écrit par un humain, pas par une IA

Génère maintenant le message:`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const message = response.content[0].text.trim();
    res.json({ message });
  } catch (err) {
    console.error('Anthropic error:', err);
    res.status(500).json({ error: 'Erreur de génération' });
  }
});

// ─── DÉMARRAGE ────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ MessageGenius lancé sur http://localhost:${PORT}`);
});
