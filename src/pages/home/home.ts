import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  addContactFormGroup: FormGroup;
  emailRegex: '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

  constructor(public formBuilder: FormBuilder, public alertCtrl: AlertController) {

    this.addContactFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      company: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.pattern(this.emailRegex)])],
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*')])],
      postalCode: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9]*')])]
    });

  }

  askAddOurUpdate() {

    let confirm = this.alertCtrl.create({
      title: '',
      message: 'Create a new contact or add to an existing contact?',
      buttons: [
        {
          text: 'Existing',
          handler: () => {
            this.updateContact();
          }
        },
        {
          text: 'New',
          handler: () => {
            this.addContact();
          }
        }
      ]
    });

    confirm.present();

  };

  addContactSuccess() {
    console.log("addContactSuccess");
  };
  addContactFailure() {
    console.log("addContactFailure");
  };
  addContact() {
    let contact = this.addContactFormGroup.value;
    cordova.exec(this.addContactSuccess, this.addContactFailure, "InteractiveContacts", "addContact", [contact]);
  };
  
  updateContactSuccess() {
    console.log("updateContactSuccess");
  };
  updateContactFailure() {
    console.log("updateContactFailure");
  };
  updateContact() {
    let contact = this.addContactFormGroup.value;
    cordova.exec(this.updateContactSuccess, this.updateContactFailure, "InteractiveContacts", "updateContact", [contact]);
  };

}
