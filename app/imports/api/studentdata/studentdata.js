import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const StudentData = new Mongo.Collection('StudentData');

/**
 * Create the schema for StudentData
 */
export const StudentDataSchema = new SimpleSchema({
  uhid: {
    label: 'IDnumber',
    type: String,
  },
  first: {
    label: 'First',
    type: String,
  },
  last: {
    label: 'Last',
    type: String,
  },
  telephone: {
    label: 'Telephone',
    type: String,
  },
  email: {
    label: 'Email',
    type: String,
  },
  notifications: {
    label: 'Notifications',
    type: [String],
  },
});

StudentData.attachSchema(StudentDataSchema);
