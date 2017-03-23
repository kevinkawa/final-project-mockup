import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Goods, GoodsSchema } from '../../api/goods/goods.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

// The form field structures to be shared by both the create page and the edit page.
export const categoryList = ['Books', 'DVDs', 'Furniture', 'Misc'];
export const conditionList = ['New', 'Like New', 'Fair', 'Used', 'Poor'];
export const askingObjects = [{ label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '40', value: '40' },
  { label: '50', value: '50' }];

Template.Add_Good_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GoodsSchema.namedContext('Add_Good_Page');
});

Template.Add_Good_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  categories() {
    return _.map(categoryList, function makeCategoryObject(category) {
      return { label: category };
    });
  },
  conditions() {
    return _.map(conditionList, function makeConditionObject(condition) {
      return { label: condition };
    });
  },
  asking() {
    return askingObjects;
  },
});

Template.Add_Good_Page.events({
  'submit .student-data-form'(event, instance) {
    event.preventDefault();
    // Get category (radio)
    const category = event.target.Category.value;
    // Get item (text field)
    const item = event.target.Item.value;
    // Get condition (radio)
    const condition = event.target.Condition.value;
    // Get asking (single)
    const asking = event.target.Asking.value;
    //
    const newGoodData = { category, item, condition, asking };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newGoodtData reflects what will be inserted.
    GoodsSchema.clean(newGoodData);
    // Determine validity.
    instance.context.validate(newGoodData);
    if (instance.context.isValid()) {
      Goods.insert(newGoodData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Home_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
