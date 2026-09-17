# 10 — Architecture micro-services (et micro-fronts)

## Monolithe vs micro-services

Un **monolithe** : une seule grosse application back qui fait catalogue + stock + paiement + suivi. Simple au début, dur à faire évoluer à l’échelle d’un groupe.

Une architecture **micro-services** : **plusieurs petits programmes**, chacun **un métier**, déployés **indépendamment**.

Exemples plausibles e-commerce postal :

- service **catalogue** (nom, prix affiché, visuels) ;
- service **stock / éligibilité** ;
- service **panier / commande** ;
- service **paiement** ;
- service **tracking colis** ;
- service **compte client**.

L’offre dit « maîtrise d’une architecture micro-service ». On ne te demande pas de coder Kubernetes. On te demande de **ne pas concevoir le front comme s’il y avait une seule base magique**.

## Le front ne parle pas à 8 services

Si chaque carte produit appelle 4 hosts différents :

- cauchemar CORS, auth, versions, timeouts ;
- 4 pannes possibles par page ;
- tu couples l’UI à l’orga interne.

La solution s’appelle **BFF** (Backend For Frontend) ou **API Gateway** :

```
Navigateur  →  Nuxt / BFF  →  micro-services
```

**Un** (ou deux) domaine(s) pour le front. Le BFF **agrège** (« fiche produit = catalogue + stock + avis »). Si le service avis est down, le BFF peut renvoyer la fiche **sans** avis plutôt que tout casser.

Phrase d’entretien :

> Je consomme un contrat d’API stable. Le découpage micro-services est un détail d’infra que le BFF me masque. Je gère les erreurs métier (409 stock), les timeouts, les états partiels.

## Versioning et contrats

Les API évoluent (`/v1/products`, champs dépréciés). Le front **tolère** un champ en trop, et ne casse pas si un champ optionnel manque (`?` en TypeScript + fallback UI).

Les **feature flags** : on allume « nouveau tunnel » pour 10 % des users sans redéployer 12 services à la seconde près.

## Micro-frontends (souvent à La Poste / BGPN)

Un **micro-front** = un morceau d’UI **déployé séparément** (header groupe, suivi colis, tunnel) et assemblé dans une page.

Intérêt : une équipe « tracking » livre sans attendre la boutique. Risque : **incohérence** du design system, double Vue, perf. D’où **Storybook + DS unique** (chapitre 12).

Tu peux citer : « je factorise les composants dans une lib DS ; les apps Nuxt les consomment ; on évite de recopier le bouton primaire ».

## Ce que tu dessines au tableau (oral)

```
[Client navigateur]
        |
     [CDN]
        |
 [Nuxt SSR / app e-commerce]
        |
 [BFF / API Gateway]
     /     |      \
catalogue stock  commande
```

Plus Sentry (erreurs JS) et une CI GitLab. Ça suffit. N’invente pas 15 cases pour faire savant.

Chapitre 11 : le CSS qui ne pourrit pas en six mois.
