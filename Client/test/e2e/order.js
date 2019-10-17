/* eslint-disable no-undef */
import { ClientFunction } from 'testcafe';

fixture`Order`
  .page`https://fast-food-fast.herokuapp.com/`;

test('Make an order test', async t => {
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .click('.signout')
    .typeText('.signupEmail', 'email100@email.com')
    .typeText('.signupPassword', 'password')
    .click('.signup')
    .expect(getLocation()).contains('https://fast-food-fast.herokuapp.com/orders')
    .click('.meal-button1')
    .click('.button__orders-checkout')
    .wait(2000)
    .click('.make-order')
    .expect(getLocation()).contains('https://fast-food-fast.herokuapp.com/history');
});