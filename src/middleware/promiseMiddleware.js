import isPromise from '../utils/isPromise';

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    const { types, payload, meta } = action;
    const { promise, data } = payload;
    const { REQUEST, SUCCESS, FAILURE } = types;

    /**
    * Dispatch the pending action
    */
    dispatch({
      type: REQUEST,
      ...data && {
        payload: data,
      },
      ...meta && { meta },
    });

    /**
     * If successful, dispatch the fulfilled action, otherwise dispatch
     * rejected action.
     */
    return promise.then(
      result => {
        dispatch({
          type: SUCCESS,
          result,
          meta,
        });
      },
      error => {
        dispatch({
          type: FAILURE,
          error,
          meta,
        });
      }
    );
  };
}
