import { Template } from 'meteor/templating';
import { Goods } from '../../api/goods/goods.js';

Template.List_Goods_Page.helpers({

  /**
   * @returns {*} All of the Goods documents.
   */
  goodsList() {
    return Goods.find();
  },
});

Template.List_Goods_Page.onCreated(function onCreated() {
  this.subscribe('Goods');
});
