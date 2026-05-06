# Projet DevOps - Application Web Full Stack

Ce repository contient une application web full stack composée d'un frontend React/Vite et d'un backend Node.js/Express, avec une approche DevOps intégrée: pipeline CI, construction d'images Docker, scan de sécurité, publication d'images, et déploiement Kubernetes.

## Sommaire

1. Vue d'ensemble
2. Architecture technique
3. Arborescence du projet
4. Prerequis
5. Installation et execution en local
6. Variables d'environnement
7. Tests et qualite de code
8. CI/CD (GitHub Actions)
9. Conteneurisation Docker
10. Deploiement Kubernetes
11. Monitoring et observabilite
12. Securite et bonnes pratiques
13. Feuille de route DevOps

## Vue d'ensemble

Objectif du projet:

- Fournir une plateforme web avec contenu dynamique (evenements, equipe, galerie, projets, contact).
- Exposer une API REST securisee (authentification JWT).
- Industrialiser la chaine de livraison avec des controles qualite et securite.

## Architecture technique

### Frontend

- Stack: React 18 + TypeScript + Vite + Tailwind CSS.
- UI: composants reutilisables (ecosysteme shadcn/Radix).
- Configuration API via variable d'environnement `VITE_API_URL`.

### Backend

- Stack: Node.js + Express + Mongoose.
- Base de donnees: MongoDB.
- Authentification: JWT.
- Media: integration Cloudinary (upload d'images).

### DevOps

- CI: GitHub Actions.
- Qualite: ESLint + tests unitaires (Jest / Vitest).
- Securite: scan d'images Docker via Trivy.
- Analyse statique: SonarCloud.
- Runtime: Docker + Kubernetes.

## Arborescence du projet

```text
.
|- backend/            API Express + MongoDB + JWT
|- frontend/           Application React/Vite
|- k8s/                Manifests Kubernetes (Deployment/Service)
|- monitoring/         Dossier reserve a l'observabilite
|- Docker/             Dossier reserve aux assets Docker
|- .github/workflows/  Pipeline CI/CD (ci.yml)
```

## Prerequis

- Node.js 20+
- npm 9+
- Docker
- Un cluster Kubernetes (local ou distant) pour la phase de deploiement
- Compte Docker Hub (publication images)
- Compte SonarCloud (analyse qualite)

## Installation et execution en local

### 1. Cloner le projet

```bash
git clone <url-du-repository>
cd Projetdevops
```

### 2. Backend

```bash
cd backend
npm install
npm start
```

API exposee par defaut sur:

- `http://localhost:3001` (ou valeur `PORT` si definie)

### 3. Frontend

Dans un second terminal:

```bash
cd frontend
npm install
npm run dev
```

Application frontend disponible sur:

- `http://localhost:5173` (port Vite par defaut)

## Variables d'environnement

Important:

- Ne jamais versionner de secrets en clair.
- Fournir des fichiers `.env.example` pour standardiser la configuration.

### Backend (`backend/.env`)

Variables attendues:

- `PORT`
- `MONGO_URL`
- `JWT_SECRET`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`

### Frontend (`frontend/.env`)

- `VITE_API_URL`

Exemple recommande:

```env
VITE_API_URL=http://localhost:3001/api
```

## Tests et qualite de code

### Backend

```bash
cd backend
npm run lint
npm run test
```

### Frontend

```bash
cd frontend
npm run lint
npm run test -- --run
npm run build
```

## CI/CD (GitHub Actions)

Le pipeline est defini dans `.github/workflows/ci.yml`.

### Declenchement

- Sur `push` vers les branches `main` et `dev`.

### Jobs executes

1. Job `frontend`

- Installation des dependances.
- Lint.
- Tests.
- Build de production.
- Authentification Docker Hub.
- Build image `oussamazid/frontend:latest`.
- Scan Trivy (niveau `CRITICAL`, pipeline bloque en cas de faille).
- Push Docker Hub.

2. Job `backend`

- Installation des dependances.
- Lint.
- Tests.
- Authentification Docker Hub.
- Build image `oussamazid/backend:latest`.
- Scan Trivy (niveau `CRITICAL`).
- Push Docker Hub.

3. Job `sonar`

- Execute apres succes des jobs frontend/backend.
- Lance une analyse SonarCloud sur les sources frontend et backend.

### Secrets GitHub requis

- `DOCKER_USER`
- `DOCKER_PASS`
- `SONAR_TOKEN`

## Conteneurisation Docker

### Backend

- Fichier: `backend/dockerfile`
- Image base: `node:22-alpine`
- Commande de demarrage: `npm start`

Build manuel:

```bash
cd backend
docker build -t oussamazid/backend:latest .
docker run --env-file .env -p 3001:3001 oussamazid/backend:latest
```

### Frontend

- Fichier: `frontend/dockerfile`
- Build multi-stage:
	- Stage 1: build Vite avec Node
	- Stage 2: serveur Nginx
- Port expose: `80`

Build manuel:

```bash
cd frontend
docker build -t oussamazid/frontend:latest .
docker run -p 8080:80 oussamazid/frontend:latest
```

## Deploiement Kubernetes

Manifestes disponibles:

- `k8s/deployment.yaml`
- `k8s/service.yaml`

Application:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Verification:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

## Monitoring et observabilite

Etat actuel:

- Le dossier `monitoring/` est present mais vide.

Recommandations:

- Ajouter Prometheus + Grafana (metrics applicatives et infrastructure).
- Ajouter Loki/ELK pour centralisation des logs.
- Ajouter des probes Kubernetes (`livenessProbe`, `readinessProbe`).

## Securite et bonnes pratiques

- Activer une politique stricte de gestion des secrets (GitHub Secrets, Vault ou equivalent).
- Interdire le commit de fichiers `.env` de production.
- Versionner uniquement des templates (`.env.example`).
- Completer les scans avec dependabot et/ou npm audit dans la CI.
- Ajouter des tags d'image versionnes (ex: SHA Git), pas uniquement `latest`.

## Feuille de route DevOps

Priorites conseillees:

1. Corriger/aligner les variables d'environnement et ports entre frontend/backend.
2. Ajouter un job CD (deploiement automatique vers cluster de staging).
3. Ajouter des healthchecks applicatifs (`/health`) et probes Kubernetes.
4. Structurer l'observabilite (metrics, logs, alerting).
5. Mettre en place une strategie de rollback (Helm/Kustomize + tags immuables).

## Licence

Projet interne/academique. Ajouter une licence explicite (MIT, Apache-2.0, etc.) si publication open source.
