export class Noeud<T> {
  value: T;
  next: Noeud<T> | null;

  constructor(value: T, next: Noeud<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: Noeud<T> | null;
  size: number;
  currentSize: number;
  tail: Noeud<T> | null;

  constructor(
    size: number,
    head: Noeud<T> | null = null,
    tail: Noeud<T> | null = null,
  ) {
    this.size = size;
    this.head = head;
    this.currentSize = 0;
    this.tail = tail;
  }

  show(): void {
    let current = this.head;
    let listeString = "";

    while (current) {
      listeString += current.value + " -> ";
      current = current.next;
    }

    console.log(
      listeString +
        "null" +
        "avec a la tete " +
        this.head?.value +
        " et la queue " +
        this.tail?.value,
    );
    console.log("La liste contient " + this.currentSize + " éléments");
  }
  addFirst(value: T): void {
    if (this.currentSize >= this.size) {
      throw new Error("Capacité maximale atteinte");
    }
    const newNode = new Noeud(value, this.head);
    this.head = newNode;
    this.currentSize++;
    if (this.currentSize === 1) {
      this.tail = this.head;
    }
  }
  addLast(value: T): void {
    if (this.currentSize >= this.size) {
      throw new Error("Capacité maximale atteinte");
    }
    const newNode = new Noeud<T>(value);
    if (!this.head) {
      this.head = newNode;
      this.currentSize++;
      if (this.currentSize === 1) {
        this.tail = this.head;
        return;
      }
      return;
    }
    this.tail!.next = newNode;
    this.tail = newNode;
    this.currentSize++;
  }

  addAtPosition(position: number, value: T): void {
    if (position < 0 || position > this.currentSize) {
      throw new Error("Position invalide");
    }

    if (this.currentSize >= this.size) {
      throw new Error("Capacité maximale atteinte");
    }

    const newNode = new Noeud<T>(value);

    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      if (this.currentSize === 0) {
        this.tail = newNode;
      }
      this.currentSize++;
      return;
    }

    let currentNode = this.head!;
    let index = 0;

    while (index < position - 1) {
      currentNode = currentNode.next!;
      index++;
    }

    newNode.next = currentNode.next;
    currentNode.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    this.currentSize++;
  }

  deleteFirst(): void {
    if (!this.head) {
      throw new Error("Liste vide");
    }

    this.head = this.head.next;
    this.currentSize--;
    if (this.currentSize === 0) {
      this.tail = null;
    }
    if (this.currentSize === 1) {
      this.tail = this.head;
    }
  }

  deleteLast(): void {
    if (!this.head) {
      throw new Error("Liste vide");
    }

    // Cas : un seul élément
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
      this.currentSize--;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next?.next !== null) {
      currentNode = currentNode.next!;
    }

    currentNode.next = null;
    this.tail = currentNode;
    this.currentSize--;
  }

  deleteAtPosition(position: number): void {
    if (position < 0 || position >= this.currentSize) {
      throw new Error("Position invalide");
    }

    if (!this.head) {
      throw new Error("Liste vide");
    }

    if (position === 0) {
      this.head = this.head.next;
      this.currentSize--;
      if (this.currentSize === 0) {
        this.tail = null;
      }
      return;
    }

    let currentNode = this.head;
    let index = 0;

    while (index < position - 1) {
      currentNode = currentNode.next!;
      index++;
    }

    currentNode.next = currentNode.next?.next || null;
    if (currentNode.next === null) {
      this.tail = currentNode;
    }
    this.currentSize--;
  }

  hasValue(value: T): boolean {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  getValue(position: number): T {
    if (position < 0 || position >= this.currentSize) {
      throw new Error("Position invalide");
    }

    let currentNode = this.head!;
    let index = 0;

    while (index < position) {
      currentNode = currentNode.next!;
      index++;
    }

    return currentNode.value;
  }
}

export function reverseList<T>(liste: LinkedList<T>): LinkedList<T> {
  const oldHead = liste.head;
  let currentNode: Noeud<T> | null = liste.head;
  let previous: Noeud<T> | null = null;

  while (currentNode !== null) {
    const next: Noeud<T> | null = currentNode.next;
    currentNode.next = previous;
    previous = currentNode;
    currentNode = next;
  }

  liste.head = previous;
  liste.tail = oldHead;
  return liste;
}

export type Comparator<T> = (a: T, b: T) => number;
export function insertionSort<T>(
  liste: LinkedList<T>,
  comparator: Comparator<T>,
): LinkedList<T> {
  // Liste triée initialement vide
  let sortedHead: Noeud<T> | null = null;
  let current: Noeud<T> | null = liste.head;
  while (current !== null) {
    const next = current.next; // Sauvegarde du suivant
    current.next = null; // On détache le noeud
    // Cas 1 : liste triée vide
    if (!sortedHead) {
      sortedHead = current;
    }
    // Cas 2 : insertion en tête
    else if (comparator(current.value, sortedHead.value) <= 0) {
      current.next = sortedHead;
      sortedHead = current;
    }
    // Cas 3 : insertion au milieu ou fin
    else {
      let sortedCurrent = sortedHead;
      while (
        sortedCurrent.next !== null &&
        comparator(current.value, sortedCurrent.next.value) > 0
      ) {
        sortedCurrent = sortedCurrent.next;
      }
      current.next = sortedCurrent.next;
      sortedCurrent.next = current;
    }
    current = next;
  }
  // Mise à jour de la liste originale
  liste.head = sortedHead;
  // Recalcul du tail
  let newTail = sortedHead;
  while (newTail?.next) {
    newTail = newTail.next;
  }
  liste.tail = newTail;
  return liste;
}
