import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  todo() {
    return element(by.css('.mat-list-item'));
  }

  todosCount() {
    return element.all(by.css('.mat-list-item')).count()
  }

  firstTodo() {
    return element.all(by.css('.mat-list-item')).first().getText();
  }

  toolbarText() {
    return element(by.css('.mat-toolbar')).getText();
  }

  toolbarAdd() {
    return element(by.css('.tst__add mat-icon')).getText();
  }

  addButton() {
    return element(by.css('.tst__add'));
  }

  editButton() {
    return element(by.css('.tst__edit'));
  }

  deleteButton() {
    return element(by.css('.tst__delete'));
  }

  appDialog() {
    return element(by.css('app-dialog'));
  }

  dialogTitle() {
    return element(by.css('app-dialog .mat-card .mat-toolbar')).getText();
  }

  dialogSaveButton() {
    return element(by.css('.tst__ok'));
  }

  dialogCancelButton() {
    return element(by.css('.tst__cancel'));
  }

  valueElement() {
    return element(by.css('.tst__value'));
  }

  inputValue() {
    return this.valueElement().getAttribute('value');
  }

  inputPlaceholder() {
    return this.valueElement().getAttribute('placeholder');
  }
}
