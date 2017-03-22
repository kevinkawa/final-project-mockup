import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/list-listings', {
  name: 'List_Goods_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Goods_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/stuff/:id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.route('/create-listing', {
  name: 'Add_Good_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Good_Page' });
  },
});

FlowRouter.route('/edit-listing/:id', {
  name: 'Edit_Good_Data_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Good_Data_Page' });
  },
});

FlowRouter.route('/studentdata', {
  name: 'Create_Student_Data_Page',
  action() {
    BlazeLayout.render('App_Layout', { main: 'Create_Student_Data_Page' });
  },
});

FlowRouter.route('/studentdata/:id', {
  name: 'Edit_Student_Data_Page',
  action() {
    BlazeLayout.render('App_Layout', { main: 'Edit_Student_Data_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
