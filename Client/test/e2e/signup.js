/* eslint-disable no-undef */
import { ClientFunction } from 'testcafe';

const randomEmail = require('random-email');

fixture`Signup`
  .page`https://fast-food-fast.herokuapp.com/`;

test('Signup test', async t => {
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click('.get-started')
    .typeText('.signupName', `user${Math.random() * 1029384739202012}`)
    .typeText('.signupEmail', randomEmail({ domain: 'fast-food-fast.herokuapp.com' }))
    .typeText('.signupPassword', 'password')
    .click('.signup')
    .expect(getLocation()).contains('https://fast-food-fast.herokuapp.com/orders');
});
