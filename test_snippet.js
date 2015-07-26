var el = document.createElement('div');
el.textContent = 'Hello world';
var x = {};
x.x = x;
([
  undefined,
  null,
  false,
  0,
  '',
  'hello world',
  /test/g,
  new Date(),
  [1, 2, [3, 4, [5, 6]]],
  {a: 1, b: 2},
  new TypeError('hello world'),
  el,
  function () {},
  function abc1(d, e, f) { return 'ghi'; },
  x,
])