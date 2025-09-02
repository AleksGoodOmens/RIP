import config from '../../next.config';

test('next config has turbopack root', () => {
  expect(config.turbopack?.root).toBeDefined();
});
