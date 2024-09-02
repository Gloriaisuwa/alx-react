import * as actions from '../actions/courseActionTypes';
import { Map, setIn, set } from 'immutable';
import { coursesNormalizer } from '../schema/courses';

const initialState = Map([]);

export default function courseReducer(
  state = initialState,
  action = { type: null }
) {
  switch (action.type) {
    case actions.FETCH_COURSE_SUCCESS:
      const normData = coursesNormalizer(action.data);
      Object.keys(normData).map((key) => {
        normData[key].isSelected = false;
      });
      return state.merge(normData);

    case actions.SELECT_COURSE:
      return setIn(state, [String(action.index), 'isSelected'], true);

    case actions.UNSELECT_COURSE:
      return setIn(state, [String(action.index), 'isSelected'], false);

    default:
      return state;
  }
}
