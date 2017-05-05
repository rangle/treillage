import test from 'ava';
import isPromise from './isPromise';

test('it should return true if a Promise is provided', t => {
  const promise = new Promise((resolve) => resolve(true));

  const payload = {
    promise,
  };

  t.truthy(isPromise(payload));
});

test('it should return false if something that is not a Promise is provided', t => {
  const badPayload1 = { hello: 'world' };
  const badPayload2 = ['hello', 'world'];
  const badPayload3 = 'hello world';
  const badPayload4 = 'hello world';

  t.falsy(isPromise({ promise: badPayload1 }));
  t.falsy(isPromise({ promise: badPayload2 }));
  t.falsy(isPromise({ promise: badPayload3 }));
  t.falsy(isPromise({ promise: badPayload4 }));
});
