import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTodos() {
    return element(by.css('.mat-list-item'));
  }

  getToolbarText() {
    return element(by.css('.mat-toolbar')).getText();
  }

  getToolbarAdd() {
    return element(by.css('.tst__add mat-icon')).getText();
  }

  getAddButton() {
    return element(by.css('.tst__add'));
  }

  getEditButton() {
    return element(by.css('.tst__edit'));
  }

  getDeleteButton() {
    return element(by.css('.tst__delete'));
  }

  getDialogSaveButton() {
    return element(by.css('.tst__ok'));
  }

  getDialogCancelButton() {
    return element(by.css('.tst__cancel'));
  }

  getValueElement() {
    return element(by.css('.tst__value'));
  }
}
