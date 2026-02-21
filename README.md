# 📚 LinkedList<T> — Implémentation TypeScript

Implémentation pédagogique et générique d’une **liste chaînée simplement liée** en TypeScript.  
Chaque version introduit progressivement de nouvelles fonctionnalités et optimisations.

---

## 🔹 **V1 — Version initiale**

### Fonctionnalités

- Liste chaînée simplement liée (`head`, `currentSize`, `size`)
- Ajout : `addFirst`, `addLast`, `addAtPosition`
- Suppression : `deleteFirst`, `deleteLast`, `deleteAtPosition`
- Lecture : `getValue`, `hasValue`, `show`
- Inversion : `reverseList` (itératif)

### Complexités

| Méthode          | Complexité temporelle | Complexité spatiale |
| ---------------- | --------------------- | ------------------- |
| show             | O(n)                  | O(1)                |
| addFirst         | O(1)                  | O(1)                |
| addLast          | O(n)                  | O(1)                |
| addAtPosition    | O(n)                  | O(1)                |
| deleteFirst      | O(1)                  | O(1)                |
| deleteLast       | O(n)                  | O(1)                |
| deleteAtPosition | O(n)                  | O(1)                |
| hasValue         | O(n)                  | O(1)                |
| getValue         | O(n)                  | O(1)                |
| reverseList      | O(n)                  | O(1)                |

---

## 🔹 **V2 — Ajout d’un pointeur `tail`**

### Objectif

Optimiser l’ajout en fin de liste (`addLast`) et simplifier certaines opérations.

### Nouveautés

- Propriété `tail` pointant vers le dernier élément
- Mise à jour automatique lors des insertions et suppressions

### Impacts

| Méthode    | Complexité avant | Complexité après                              |
| ---------- | ---------------- | --------------------------------------------- |
| addLast    | O(n)             | O(1)                                          |
| deleteLast | O(n)             | O(n) (reste inchangé pour une simple chaînée) |

---

## 🔹 **V3 — Algorithmes de tri**

### 1️⃣ Tri par insertion (Insertion Sort)

- Tri stable adapté aux listes chaînées
- Utilise uniquement les pointeurs
- Complexité :
  - Temporelle : O(n²)
  - Spatiale : O(1)

### 2️⃣ Merge Sort (Tri fusion)

- Tri optimal pour listes chaînées
- Fusion efficace via pointeurs
- Complexité :
  - Temporelle : O(n log n)
  - Spatiale : O(log n) (récursion)

---

## 🔹 **V4 — Vérification de cycle**

### Objectif

Détecter les boucles dans la liste pour éviter les corruptions.

### Méthode

- Algorithme de Floyd (tortue & lièvre)
- Complexité :
  - Temporelle : O(n)
  - Spatiale : O(1)

---

## 🔹 **V5 — Ajout d’un iterator**

### Objectif

Permettre d’itérer facilement sur la liste avec `for...of`.

### Méthode

- Implémentation de `[Symbol.iterator]()`
- Complexité :
  - Itération complète : O(n)
  - Mémoire : O(1)

---

# 🎯 Objectif pédagogique global

- Compréhension complète des **listes chaînées**
- Maîtrise des pointeurs et des opérations sur les noeuds
- Analyse des **complexités** temporelle et spatiale
- Optimisations progressives (tail, tri efficace, détection de cycle)
- Introduction aux concepts avancés TypeScript (génériques, iterators, symboles)
