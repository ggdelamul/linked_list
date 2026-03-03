import { LinkedList, reverseList } from "../src/linkedList";
import { describe, it, expect } from "@jest/globals";

describe("LinkedList", () => {
  describe("addFirst", () => {
    it("devrait ajouter un élément au début d'une liste vide", () => {
      const list = new LinkedList<number>(5);
      list.addFirst(10);
      expect(list.head?.value).toBe(10);
      expect(list.tail?.value).toBe(10);
      expect(list.currentSize).toBe(1);
    });

    it("devrait ajouter un élément au début d'une liste non vide", () => {
      const list = new LinkedList<string>(5);
      list.addFirst("a");
      list.addFirst("b");
      expect(list.head?.value).toBe("b");
      expect(list.head?.next?.value).toBe("a");
      expect(list.tail?.value).toBe("a");
      expect(list.currentSize).toBe(2);
    });

    it("devrait lancer une erreur si la liste est pleine", () => {
      const list = new LinkedList<number>(1);
      list.addFirst(10);
      expect(() => list.addFirst(20)).toThrow("Capacité maximale atteinte");
    });
  });

  describe("addLast", () => {
    it("devrait ajouter un élément à la fin d'une liste vide", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      expect(list.head?.value).toBe(10);
      expect(list.tail?.value).toBe(10);
      expect(list.currentSize).toBe(1);
    });

    it("devrait ajouter un élément à la fin d'une liste non vide", () => {
      const list = new LinkedList<string>(5);
      list.addLast("a");
      list.addLast("b");
      expect(list.head?.value).toBe("a");
      expect(list.tail?.value).toBe("b");
      expect(list.head?.next?.value).toBe("b");
      expect(list.currentSize).toBe(2);
    });

    it("devrait lancer une erreur si la liste est pleine", () => {
      const list = new LinkedList<number>(1);
      list.addLast(10);
      expect(() => list.addLast(20)).toThrow("Capacité maximale atteinte");
    });
  });

  describe("addAtPosition", () => {
    it("devrait ajouter à la position 0 (comme addFirst)", () => {
      const list = new LinkedList<number>(5);
      list.addAtPosition(0, 10);
      expect(list.head?.value).toBe(10);
      expect(list.tail?.value).toBe(10);
      expect(list.currentSize).toBe(1);
    });

    it("devrait ajouter à la fin (comme addLast)", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addAtPosition(1, 20);
      expect(list.tail?.value).toBe(20);
      expect(list.head?.next?.value).toBe(20);
      expect(list.currentSize).toBe(2);
    });

    it("devrait ajouter au milieu de la liste", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(30);
      list.addAtPosition(1, 20); // 10 -> 20 -> 30
      expect(list.head?.next?.value).toBe(20);
      expect(list.head?.next?.next?.value).toBe(30);
      expect(list.currentSize).toBe(3);
    });

    it("devrait lancer une erreur pour une position invalide", () => {
      const list = new LinkedList<number>(5);
      expect(() => list.addAtPosition(-1, 10)).toThrow("Position invalide");
      expect(() => list.addAtPosition(1, 10)).toThrow("Position invalide");
    });
  });

  describe("deleteFirst", () => {
    it("devrait supprimer le premier élément", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(20);
      list.deleteFirst();
      expect(list.head?.value).toBe(20);
      expect(list.currentSize).toBe(1);
    });

    it("devrait mettre tail à null si la liste devient vide", () => {
      const list = new LinkedList<number>(5);
      list.addFirst(10);
      list.deleteFirst();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.currentSize).toBe(0);
    });

    it("devrait lancer une erreur si la liste est vide", () => {
      const list = new LinkedList<number>(5);
      expect(() => list.deleteFirst()).toThrow("Liste vide");
    });
  });

  describe("deleteLast", () => {
    it("devrait supprimer le dernier élément et mettre à jour tail", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(20);
      list.deleteLast();
      expect(list.tail?.value).toBe(10);
      expect(list.tail?.next).toBeNull();
      expect(list.currentSize).toBe(1);
    });

    it("devrait vider la liste s'il n'y a qu'un seul élément", () => {
      const list = new LinkedList<number>(5);
      list.addFirst(10);
      list.deleteLast();
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
      expect(list.currentSize).toBe(0);
    });

    it("devrait lancer une erreur si la liste est vide", () => {
      const list = new LinkedList<number>(5);
      expect(() => list.deleteLast()).toThrow("Liste vide");
    });
  });

  describe("deleteAtPosition", () => {
    it("devrait supprimer à la position 0", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(20);
      list.deleteAtPosition(0);
      expect(list.head?.value).toBe(20);
    });

    it("devrait supprimer le dernier élément et mettre à jour tail", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(20);
      list.deleteAtPosition(1);
      expect(list.tail?.value).toBe(10);
      expect(list.tail?.next).toBeNull();
    });

    it("devrait supprimer au milieu", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(20);
      list.addLast(30);
      list.deleteAtPosition(1); // Supprime 20
      expect(list.head?.next?.value).toBe(30);
      expect(list.currentSize).toBe(2);
    });

    it("devrait lancer une erreur pour une position invalide", () => {
      const list = new LinkedList<number>(5);
      list.addFirst(10);
      expect(() => list.deleteAtPosition(5)).toThrow("Position invalide");
    });
  });

  describe("hasValue", () => {
    it("devrait retourner true si la valeur existe", () => {
      const list = new LinkedList<string>(5);
      list.addLast("a");
      list.addLast("b");
      expect(list.hasValue("b")).toBe(true);
    });

    it("devrait retourner false si la valeur n'existe pas", () => {
      const list = new LinkedList<string>(5);
      list.addLast("a");
      expect(list.hasValue("z")).toBe(false);
    });
  });

  describe("getValue", () => {
    it("devrait retourner la valeur à la position donnée", () => {
      const list = new LinkedList<number>(5);
      list.addLast(10);
      list.addLast(20);
      expect(list.getValue(1)).toBe(20);
    });
  });

  describe("reverseList", () => {
    it("devrait inverser la liste et mettre à jour head et tail", () => {
      const list = new LinkedList<number>(5);
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);
      const reversed = reverseList(list);
      expect(reversed.head?.value).toBe(3);
      expect(reversed.tail?.value).toBe(1);
      expect(reversed.head?.next?.value).toBe(2);
    });
  });

  describe("hasCycle", () => {
    it("devrait retourner false si la liste ne contient pas de cycle", () => {
      const list = new LinkedList<number>(5);
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);
      expect(list.hasCycle()).toBe(false);
    });

    it("devrait retourner true si la liste contient un cycle", () => {
      const list = new LinkedList<number>(5);
      list.addLast(1);
      list.addLast(2);
      list.addLast(3);
      // Création manuelle d'un cycle : le dernier élément pointe vers le deuxième (3 -> 2)
      if (list.tail && list.head?.next) {
        list.tail.next = list.head.next;
      }
      expect(list.hasCycle()).toBe(true);
    });
  });
});
