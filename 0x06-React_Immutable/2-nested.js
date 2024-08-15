import { fromJS } from 'immutable';

export default function accessImmutableObject(object, array) {
  // Convert the plain JavaScript object into an Immutable.js Map
  const immutableObject = fromJS(object);

  // Use the getIn method to access the value at the specified path
  return immutableObject.getIn(array);
}
