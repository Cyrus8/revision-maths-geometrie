# RévisionMaths

Catalogue de problèmes de maths interactifs, organisé par **classe → thème → chapitre → problème**. Chaque problème est un mini-examen de 6 questions à difficulté croissante, noté automatiquement sur 20, avec un système d'indices à faible malus et un bouton "je passe" (solution affichée, 0 point).

Seule la classe de **Seconde** est ouverte pour l'instant (10 chapitres, calqués sur les sous-parties du programme officiel, 3 problèmes par chapitre — soit 30 problèmes / 180 questions au total).

## Fonctionnalités

- **Élèves** : inscription email/mot de passe, connexion, mot de passe oublié, résolution des problèmes, historique personnel des notes (`/mes-resultats`).
- **Correction côté serveur** : la note affichée à l'élève est recalculée et enregistrée par le serveur à partir des réponses envoyées (pas seulement affichée côté client), pour éviter qu'un score falsifié soit stocké.
- **Admin** (mot de passe unique, `/admin`) : liste des problèmes avec CRUD complet, éditeur avec **mode aperçu en direct** (réutilise le lecteur de problème réel des élèves), et tableau de bord des élèves (historique des tentatives, progression d'un même problème dans le temps).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4
- PostgreSQL + Prisma 6 (même schéma en local et sur Neon)
- Zod pour la validation des entrées
- Sessions signées par cookie (HMAC / Web Crypto), mots de passe hashés avec `scrypt` (module `crypto` de Node) — aucune dépendance d'auth externe

## Démarrage en local

Prérequis : Node 20+, Docker (pour Postgres local).

```bash
npm install
cp .env.example .env        # ajuster si besoin (valeurs par défaut déjà cohérentes avec docker-compose)
docker compose up -d        # démarre Postgres sur localhost:5433
npm run db:migrate          # applique le schéma Prisma
npm run db:seed             # peuple la base avec les 10 chapitres / 30 problèmes
npm run dev
```

Le site est servi sur `http://localhost:3000` (ou le premier port libre si occupé). Mot de passe admin par défaut : voir `ADMIN_PASSWORD` dans `.env` (`admin123` par défaut — à changer avant toute mise en ligne).

Le seed est idempotent (`upsert` sur les slugs) : le relancer après une modification des fichiers `prisma/seed-data/*.ts` met à jour le contenu existant sans dupliquer.

## Déploiement / bascule vers Neon

Les identifiants Neon réels vivent dans `.env.neon`, un fichier **local, ignoré par Git** (jamais commité — voir `.gitignore`). Pour déployer :

1. Configurer `DATABASE_URL`, `ADMIN_PASSWORD` et `SESSION_SECRET` (générer de nouvelles valeurs, ne pas réutiliser celles du dev) dans les variables d'environnement de l'hébergeur.
2. Exécuter les migrations contre Neon : `DATABASE_URL=... npx prisma migrate deploy`.
3. Lancer le seed si besoin : `DATABASE_URL=... npx prisma db seed`.

## Limitations connues (à améliorer avant une mise en prod réelle)

- **Email non branché** : le flux "mot de passe oublié" génère un vrai jeton à usage unique et une page de réinitialisation fonctionnels, mais faute de service d'emailing configuré, le lien est affiché directement à l'écran (visible dans la réponse API) plutôt qu'envoyé par email. Brancher un fournisseur (Resend, Postmark, SMTP...) dans `app/api/auth/forgot-password/route.ts` avant un usage réel.
- **Pas de rendu LaTeX** : les formules utilisent une notation Unicode simple (√, ², ⩽, intervalles `[a ; b]`, etc.) plutôt qu'un moteur de rendu mathématique, pour rester dans le périmètre du projet.
- **Admin mono-utilisateur** : un seul mot de passe admin partagé (pas de comptes professeurs distincts). Une gestion multi-profs (chaque professeur avec sa/ses classes) est prévue comme évolution future.

## Conventions

- Tous les commentaires dans le code sont en **anglais**, même si l'UI et le contenu pédagogique sont en français.
- Les identifiants de connexion (base de données, secrets) ne sont jamais commités : `.env`, `.env.neon` sont ignorés par Git ; seul `.env.example` (avec des valeurs factices) est suivi.
