import {$, $$, browser, by, element, ExpectedConditions} from 'protractor';
import {expect} from "chai";

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to add 3 items to reading list and undo my last action', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const book1 = element.all(by.css('.book-grid .book')).get(0);
    const book1Btn = book1.all(by.tagName('button'));
    await book1Btn.click();

    const book2 = element.all(by.css('.book-grid .book')).get(1);
    const book2Btn = book2.all(by.tagName('button'));
    await book2Btn.click();

    const book3 = element.all(by.css('.book-grid .book')).get(2);
    const book3Btn = book3.all(by.tagName('button'));
    await book3Btn.click();
  });
});
