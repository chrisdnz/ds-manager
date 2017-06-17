import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { mount } from 'react-mounter';

import Layout from '../ui/Layout/Layout';
import LayoutPublic from '../ui/Layout/LayoutPublic';
import Login from '../ui/Components/Login/Login';
import Home from '../ui/Components/Home/Home';
import Brands from '../ui/Components/Home/Brands/Brands';
import Setup from '../ui/Components/Home/Setup/Setup';
import TVs from '../ui/Components/Home/TVs/TVs';
import App from '../ui/Components/cliente/App.jsx';
import TVView from '../ui/Components/Home/TVs/tv_view/tv_view';

FlowRouter.route('/', {
    triggersEnter:[(context, redirect)=> {
        if(Meteor.userId()) {
            redirect('/home');
        }
    }],
    action: (params, queryParams)=> {
        mount(LayoutPublic,{
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
FlowRouter.route('/brands', {
    triggersEnter: [(context, redirect)=> {
        if(!Meteor.userId()) {
            redirect('/');
        }
    }],
    action: (params, queryParams)=> {
        mount(Layout, {
            content: <Brands />
        })
    }
});
FlowRouter.route('/config', {
    triggersEnter: [(context, redirect)=> {
        if(!Meteor.userId()) {
            redirect('/');
        }
    }],
    action: (params, queryParams)=> {
        mount(Layout, {
            content: <Setup />
        })
    }
});

FlowRouter.route('/tvs', {
    triggersEnter: [(context, redirect)=> {
        if(!Meteor.userId()) {
            redirect('/');
        }
    }],
    action: (params, queryParams)=> {
        mount(Layout, {
            content: <TVs />
        })
    }
});
FlowRouter.route('/home/:tvName', {
    triggersEnter: [(context, redirect)=> {
        if(!Meteor.userId()) {
            redirect('/');
        }
    }],
    action: (params, queryParams)=> {
        mount(Layout, {
            content: <TVView name={params.tvName} />
        })
    }
});

FlowRouter.route('/preview', {
    action: (params, queryParams)=> {
        mount(LayoutPublic, {
            content: <App />
        })
    }
});
FlowRouter.route('/cliente/:tvName', {
    action: (params, queryParams)=> {
        mount(LayoutPublic, {
            content: <App name={params.tvName}/>
        })
    }
});
