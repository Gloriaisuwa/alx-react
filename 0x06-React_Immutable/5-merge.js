import { List, Map } from 'immutable';

// Function to concatenate the values of two arrays into a List
export function concatElements(page1, page2) {
  return List(page1.concat(page2));
}

// Function to merge the values of two objects into a List
export function mergeElements(page1, page2) {
  return Map(page1).merge(page2);
}
