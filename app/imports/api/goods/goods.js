import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Goods = new Mongo.Collection('Goods');

/**
 * Create the schema for Goods
 */

export const GoodsSchema = new SimpleSchema({
  category: {
    label: 'Category',
    type: String,
    optional: false,
    max: 200,
  },
  item: {
    label: 'Item',
    type: String,
    optional: false,
    max: 200,
  },
  condition: {
    label: 'Condition',
    type: String,
    optional: false,
    max: 200,
  },
  asking: {
    label: 'Asking cost',
    type: Number,
    optional: false,
    max: 200,
  },
});

Goods.attachSchema(GoodsSchema);
