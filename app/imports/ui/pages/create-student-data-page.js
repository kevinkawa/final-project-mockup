import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { StudentData, StudentDataSchema } from '../../api/studentdata/studentdata.js';

/* eslint-disable no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

// The form field structures to be shared by both the create page and the edit page.
export const notificationList = ['Telephone', 'Email', 'Text Message'];

Template.Create_Student_Data_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = StudentDataSchema.namedContext('Create_StudentData_Page');
});

Template.Create_Student_Data_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  notifications() {
    return _.map(notificationList, function makeNotificationObject(notification) { return { label: notification }; });
  },
});


Template.Create_Student_Data_Page.events({
  'submit .student-data-form'(event, instance) {
    event.preventDefault();
    // Get uhid (text field)
    const uhid = event.target.IDnumber.value;
    // Get first (text field)
    const first = event.target.First.value;
    // Get last (text field)
    const last = event.target.Last.value;
    // Get telephone (text field)
    const telephone = event.target.Telephone.value;
    // Get email (text field)
    const email = event.target.Email.value;
    // Get notifications (multiple selection)
    const selectedNotifications = _.filter(event.target.Notifications.selectedOptions, (option) => option.selected);
    const notifications = _.map(selectedNotifications, (option) => option.value);
    //
    const newStudentData = { uhid, first, last, telephone, email, notifications };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    StudentDataSchema.clean(newStudentData);
    // Determine validity.
    instance.context.validate(newStudentData);
    if (instance.context.isValid()) {
      const id = StudentData.insert(newStudentData);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
