import {
  Noeud,
  LinkedList,
  reverseList,
  insertionSort,
  Comparator,
} from "./linkedList";

const list = new LinkedList<string>(7);

list.addFirst("a");
console.log("apres addFirst");
list.show();
list.addLast("b");
console.log("apres addLast");
list.show();
list.addAtPosition(1, "c");
console.log("apres addPosition");
list.show();
list.addAtPosition(2, "d");
console.log("apres addPosition");
list.show();
list.addAtPosition(1, "e");
console.log("apres addPosition");
list.show();
list.addAtPosition(3, "f");
console.log("apres addPosition");
list.show();
list.deleteFirst();
console.log("apres deleteFisrt");
list.show();
list.deleteLast();
console.log("apres deleteLast");
list.show();
list.deleteAtPosition(3);
console.log("apres deleteAtPosition");
list.show();
let bool = list.hasValue("c");
console.log("apres hasValue true");
console.log(bool);
let bool1 = list.hasValue("z");
console.log("apres hasValue false");
console.log(bool1);
let value = list.getValue(2);
console.log("apres getValue");
console.log(value);

let listReversed: LinkedList<string> = reverseList(list);
listReversed.show();

console.log("////ici demarre le code du tri");
const stringComparator: Comparator<string> = (a, b) => {
  return a.localeCompare(b);
};

let SortedList: LinkedList<string> = insertionSort<string>(
  list,
  stringComparator,
);
SortedList.show();
