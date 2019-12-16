/* eslint-disable no-undef */
import { ClientFunction } from 'testcafe';

fixture`Login`
  .page`https://fast-food-fast.herokuapp.com/`;

test('Login test', async t => {
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click('.signout')
    .typeText('.signupEmail', 'email100@email.com')
    .typeText('.signupPassword', 'password')
    .click('.signup')
    .expect(getLocation()).contains('https://fast-food-fast.herokuapp.com/orders');
});
