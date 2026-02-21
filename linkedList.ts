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
  size: number; // capacité maximale
  currentSize: number; // nombre réel d’éléments

  constructor(size: number, head: Noeud<T> | null = null) {
    this.size = size;
    this.head = head;
    this.currentSize = 0;
  }

  show(): void {
    console.log("La liste contient " + this.currentSize + " éléments");
    let current = this.head;
    let listeString = "";

    while (current) {
      listeString += current.value + " -> ";
      current = current.next;
    }

    console.log(listeString + "null");
  }

  addFirst(value: T): void {
    if (this.currentSize >= this.size) {
      throw new Error("Capacité maximale atteinte");
    }

    const newNode = new Noeud(value, this.head);
    this.head = newNode;
    this.currentSize++;
  }

  addLast(value: T): void {
    if (this.currentSize >= this.size) {
      throw new Error("Capacité maximale atteinte");
    }

    const newNode = new Noeud<T>(value);

    if (!this.head) {
      this.head = newNode;
      this.currentSize++;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }

    currentNode.next = newNode;
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
    this.currentSize++;
  }

  deleteFirst(): void {
    if (!this.head) {
      throw new Error("Liste vide");
    }

    this.head = this.head.next;
    this.currentSize--;
  }

  deleteLast(): void {
    if (!this.head) {
      throw new Error("Liste vide");
    }

    // Cas : un seul élément
    if (!this.head.next) {
      this.head = null;
      this.currentSize--;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next?.next !== null) {
      currentNode = currentNode.next!;
    }

    currentNode.next = null;
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
      return;
    }

    let currentNode = this.head;
    let index = 0;

    while (index < position - 1) {
      currentNode = currentNode.next!;
      index++;
    }

    currentNode.next = currentNode.next?.next || null;
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
  let currentNode: Noeud<T> | null = liste.head;
  let previous: Noeud<T> | null = null;

  while (currentNode !== null) {
    const next: Noeud<T> | null = currentNode.next; //on sauvegrade
    currentNode.next = previous; //on inverse
    previous = currentNode; //on avance previous
    currentNode = next; //on avance next
  }

  liste.head = previous;
  return liste;
}
