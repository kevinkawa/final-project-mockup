import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { StudentData, StudentDataSchema } from '../../api/studentdata/studentdata.js';
import { notificationList } from './create-student-data-page.js';

/* eslint-disable object-shorthand, no-unused-vars, no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Student_Data_Page.onCreated(function onCreated() {
  this.subscribe('StudentData');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = StudentDataSchema.namedContext('Edit_StudentData_Page');
});

Template.Edit_Student_Data_Page.helpers({
  studentDataField(fieldName) {
    const studentData = StudentData.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return studentData && studentData[fieldName];
  },
  notifications() {
    const studentData = StudentData.findOne(FlowRouter.getParam('_id'));
    const selectedNotifications = studentData && studentData.notifications;
    return studentData && _.map(notificationList,
            function makeNotificationObject(notification) {
              return { label: notification, selected: _.contains(selectedNotifications, notification) };
            });
  },
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});

Template.Edit_Student_Data_Page.events({
  'submit .student-data-form'(event, instance) {
    event.preventDefault();
    // Get uhid (text field)
    const uhid = event.target.IDNumber.value;
    // Get first (text field)
    const first = event.target.First.value;
    // Get last (text field)
    const last = event.target.Last.value;
    // Get telephone (text field)
    const telephone = event.target.Telephone.value;
    // Get email (text field)
    const email = event.target.Email.value;
    // Get list of checked boxes
    // Multiple select list  (notifications)
    const selectedNotifications = _.filter(event.target.Notifications.selectedOptions, (option) => option.selected);
    const notifications = _.map(selectedMajors, (option) => option.value);

    const updatedStudentData = { uhid, first, last, telephone, email, notifications };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    StudentDataSchema.clean(updatedStudentData);
    // Determine validity.
    instance.context.validate(updatedStudentData);

    if (instance.context.isValid()) {
      const id = StudentData.update(FlowRouter.getParam('_id'), { $set: updatedStudentData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

