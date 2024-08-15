import { Map } from 'immutable';

// Create an Immutable Map with the given object
export const map = Map({
  1: 'Liam',
  2: 'Noah',
  3: 'Elijah',
  4: 'Oliver',
  5: 'Jacob',
  6: 'Lucas',
});

// Create a new Map by modifying the values in the original map
export const map2 = map.withMutations((mapItem) => {
  mapItem.set(2, 'Benjamin').set(4, 'Oliver');
});
