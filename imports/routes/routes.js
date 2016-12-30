import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'react-mounter';

import Layout from '../ui/Layout/Layout';
import Login from '../ui/Components/Login/Login';
import Home from '../ui/Components/Home/Home';

FlowRouter.route('/', {
    triggersEnter:[(context, redirect)=> {
        if(Meteor.userId()) {
            redirect('/home');
        }
    }],
    action: (params, queryParams)=> {
        mount(Layout,{
            content: <Login/>
        })
    }
});

FlowRouter.route('/home', {
    triggersEnter: [(context, redirect)=> {
        if(!Meteor.userId()) {
            redirect('/');
        }
    }],
    action: (params, queryParams)=> {
        mount(Layout, {
            content: <Home />
        })
    }
});