import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';

  var EC = protractor.ExpectedConditions;

describe('material-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.get("http://localhost:4200");

    page = new AppPage();
    page.navigateTo();
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('MaterialApp');
  });

  it('should display a heading', () => {
    expect(page.getToolbarText()).toContain('material-todo');
  });

  it('should have 0 todos', () => {
    expect(element.all(by.css('.mat-list-item')).count()).toEqual(0);
  });

  it('should have an add button', () => {
    expect(page.getToolbarAdd()).toContain('add');
  });

  it('should open dialog for add', () => {
    page.getAddButton().click();
    expect(element(by.css('app-dialog'))).toBeDefined();
    expect(element(by.css('app-dialog .mat-card .mat-toolbar')).getText()).toContain('New Task');
    expect(element(by.css('app-dialog .mat-card-content')).getText()).toContain('Enter Task');
    expect(page.getValueElement().getAttribute('value')).toEqual('');
    expect(page.getValueElement().getAttribute('placeholder')).toContain('What do you need to do?');
    expect(page.getDialogSaveButton().getText()).toContain('Create');
   });

  it('should add todo with save', () => {
    page.getAddButton().click();
    expect(page.getValueElement().getAttribute('value')).toEqual('');
    expect(page.getDialogSaveButton()).toBeDefined();
    expect(element(by.css('app-dialog .mat-card'))).toBeDefined();

    page.getValueElement().sendKeys('First Todo');
    page.getDialogSaveButton().click();

    expect(element.all(by.css('app-dialog .mat-card')).count()).toEqual(0);

    expect(element.all(by.css('.mat-list-item')).count()).toEqual(1);

    let firstTitle = element.all(by.css('.mat-list-item')).first().all(by.css('.mat-checkbox-label')).first();
    expect(firstTitle.getText()).toContain('First Todo');
  });

  it('should cancel dialog', () => {
    page.getAddButton().click();
    expect(page.getValueElement().getAttribute('value')).toEqual('');
    expect(page.getDialogCancelButton()).toBeDefined();
    expect(element(by.css('app-dialog .mat-card'))).toBeDefined();

    page.getValueElement().sendKeys('First Todo');
    page.getDialogCancelButton().click();

    expect(element.all(by.css('app-dialog .mat-card')).count()).toEqual(0);

    expect(element.all(by.css('.mat-list-item')).count()).toEqual(0);
  });

  it('should open dialog for edit', () => {
    page.getAddButton().click();

    var saveButton = page.getDialogSaveButton();
    var inputValue = page.getValueElement();

    expect(inputValue.isDisplayed()).toBe(true);
    expect(saveButton.isDisplayed()).toBe(true);

    inputValue.sendKeys('First Todo');
    saveButton.click();

    expect(element.all(by.css('.mat-list-item')).count()).toEqual(1);

    let firstTodo = element.all(by.css('.mat-list-item')).first().all(by.css('.mat-checkbox-label')).first();
    expect(firstTodo.getText()).toContain('First Todo');

    browser.actions().mouseMove(element(by.css('.mat-list-item'))).perform().then(() => {
      let editButton = element(by.css('.tst__edit'));
      expect(editButton.isDisplayed()).toBe(true);

      editButton.click().then(() => {
        expect(element(by.css('app-dialog'))).toBeDefined();
        expect(element(by.css('app-dialog .mat-card .mat-toolbar')).getText()).toContain('Edit Task');
        expect(saveButton).toBeDefined();
        expect(saveButton.getText()).toContain('Edit');

        expect(inputValue).toBeDefined();
        expect(inputValue.getAttribute('value')).toBe('First Todo');
      });
    });
  });

  it('should edit todo item', () => {
    page.getAddButton().click();

    var saveButton = page.getDialogSaveButton();
    var inputValue = page.getValueElement();

    expect(inputValue.isDisplayed()).toBe(true);
    expect(saveButton.isDisplayed()).toBe(true);

    inputValue.sendKeys('First Todo');

    saveButton.click();

    let firstTodo = element.all(by.css('.mat-list-item')).first().all(by.css('.mat-checkbox-label')).first();
    expect(firstTodo.getText()).toContain('First Todo');

    browser.actions().mouseMove(element(by.css('.mat-list-item'))).perform().then(() => {
      let editButton = element(by.css('.tst__edit'));
      expect(editButton.isDisplayed()).toBe(true);

      editButton.click().then(() => {
        expect(saveButton.isDisplayed()).toBe(true);
        expect(saveButton.getText()).toContain('Edit');

        expect(inputValue.isDisplayed()).toBe(true);
        expect(inputValue.getAttribute('value')).toBe('First Todo');

        inputValue.sendKeys('');
        inputValue.sendKeys('First Todo Edited');

        saveButton.click();

        expect(element.all(by.css('.mat-list-item')).count()).toEqual(1);

        expect(firstTodo.getText()).toContain('First Todo Edited');
      });
    });
  });

  it('should remove todo item', () => {
    page.getAddButton().click();

    var saveButton = page.getDialogSaveButton();
    var inputValue = page.getValueElement();

    expect(inputValue.isDisplayed()).toBe(true);
    expect(saveButton.isDisplayed()).toBe(true);

    inputValue.sendKeys('First Todo');

    saveButton.click();

    let firstTodo = element.all(by.css('.mat-list-item')).first().all(by.css('.mat-checkbox-label')).first();
    expect(firstTodo.getText()).toContain('First Todo');

    browser.actions().mouseMove(element(by.css('.mat-list-item'))).perform().then(() => {
      let deleteButton = element(by.css('.tst__delete'));
      expect(deleteButton.isDisplayed()).toBe(true);

      deleteButton.click().then(() => {
        expect(element.all(by.css('.mat-list-item')).count()).toEqual(0);
      });
    });
  });
});
