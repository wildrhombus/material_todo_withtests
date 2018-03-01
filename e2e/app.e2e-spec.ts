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
    expect(page.toolbarText()).toContain('material-todo');
  });

  it('should have 0 todos', () => {
    expect(page.todosCount()).toEqual(0);
  });

  it('should have an add button', () => {
    expect(page.toolbarAdd()).toContain('add');
  });

  describe('Todo Actions', () => {
    beforeEach(() => {
      page.addButton().click();
    });

    it('should open a dialog for create', () => {
      expect(page.appDialog().isDisplayed()).toBe(true);
      expect(page.dialogTitle()).toContain('New Task');
      expect(page.inputValue()).toEqual('');
      expect(page.inputPlaceholder()).toContain('What do you need to do?');
      expect(page.dialogSaveButton().getText()).toContain('Create');
    });

    it('should add a todo', () => {
      page.valueElement().sendKeys('First Todo');
      page.dialogSaveButton().click();

      expect(page.appDialog().isDisplayed()).toBe(false);
      expect(page.todosCount()).toEqual(1);
      expect(page.firstTodo()).toContain('First Todo');
    });

    it('should cancel dialog', () => {
      expect(page.dialogCancelButton()).toBeDefined();

      page.valueElement().sendKeys('First Todo');
      page.dialogCancelButton().click();

      expect(page.appDialog().isDisplayed()).toBe(false);
      expect(page.todosCount()).toEqual(0);
    });

    describe('TodoActions with existing todo', () => {
      beforeEach(() => {
        page.valueElement().sendKeys('First Todo');
        page.dialogSaveButton().click();
      });

      it('should open dialog for edit', () => {
        browser.actions().mouseMove(page.todo()).perform().then(() => {
          let editButton = page.editButton();
          expect(editButton.isDisplayed()).toBe(true);

          editButton.click().then(() => {
            expect(page.appDialog().isDisplayed()).toBe(true);
            expect(page.dialogTitle()).toContain('Edit Task');
            expect(page.inputValue()).toEqual('First Todo');
            expect(page.dialogSaveButton().getText()).toContain('Edit');
          });
        });
      });

      it('should edit todo item', () => {
        browser.actions().mouseMove(page.todo()).perform().then(() => {
          page.editButton().click().then(() => {
            let inputValue = page.valueElement();

            inputValue.sendKeys('');
            inputValue.sendKeys('First Todo Edited');

            page.dialogSaveButton().click();

            expect(page.appDialog().isDisplayed()).toBe(false);
            expect(page.todosCount()).toEqual(1);
            expect(page.firstTodo()).toContain('First Todo Edited');
          });
        });
      });

      it('should remove todo item', () => {
        browser.actions().mouseMove(page.todo()).perform().then(() => {
          let deleteButton = page.deleteButton();
          expect(deleteButton.isDisplayed()).toBe(true);

          deleteButton.click().then(() => {
            expect(page.todosCount()).toEqual(0);
          });
        });
      });
    });
  });
});
