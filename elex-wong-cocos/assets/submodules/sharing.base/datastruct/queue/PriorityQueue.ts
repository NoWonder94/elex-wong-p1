import { MinHeap } from '../heap/MinHeap';
import { Comparator } from '../utils/Comparator';

// 环形队列参考 https://blog.csdn.net/sking002007/article/details/6584590

// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
// https://github.com/trekhleb/javascript-algorithms.git
export class PriorityQueue<T> extends MinHeap<T> {
  // Setup priorities map.
  priorities = new Map<T, number>();

  constructor() {
    // Call MinHip constructor first.
    super(null);

    // Use custom comparator for heap elements that will take element priority
    // instead of element value into account.
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * Add item to the priority queue.
   * @param {*} item - item we're going to add to the queue.
   * @param {number} [priority] - items priority.
   * @return {PriorityQueue}
   */
  add(item: T, priority: number = 0) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  /**
   * Remove item from priority queue.
   * @param {*} item - item we're going to remove.
   * @param {Comparator} [customFindingComparator] - custom function for finding the item to remove
   * @return {PriorityQueue}
   */
  remove(item: T, customFindingComparator?: Comparator) {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }

  /**
   * Change priority of the item in a queue.
   * @param {*} item - item we're going to re-prioritize.
   * @param {number} priority - new item's priority.
   * @return {PriorityQueue}
   */
  changePriority(item: T, priority: number) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  /**
   * Find item by ite value.
   * @param {*} item
   * @return {Number[]}
   */
  findByValue(item: T) {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * Check if item already exists in a queue.
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item: T) {
    return this.findByValue(item).length > 0;
  }

  /**
   * Compares priorities of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  /**
   * Compares values of two items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
}
