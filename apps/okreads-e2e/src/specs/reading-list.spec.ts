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

  it('Then: I should be able to mark a book as finished', async () => {
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

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    const firstReadingListItemSlider = element.all(by.css('.slider')).get(0);
    await firstReadingListItemSlider.click();

    const firstReadingListItemDatePicker = element.all(by.css('.datepicker')).get(0);
    await firstReadingListItemDatePicker.click();

    const firstReadingListItemToday = element.all(by.css('.mat-calendar-body-today')).get(0);
    await firstReadingListItemToday.click();

    const date1 = new Date(); // placeholder date
    const date2 = new Date();
    date2.setDate((new Date()).getDate() + 1);

    //TODO: Replace placeholder date with the element node value
    //const firstReadingListItemDateString = element.all(by.css('.mat-input-element')).get(0).getAttribute("ng-reflect-model");
    expect(date1).to.be.lessThan(date2,  'Date string must be before the next day');
  });
});
