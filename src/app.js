import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import asyncComponent from './asyncComponent';
import {Provider} from 'mobx-react';
import { configure} from 'mobx';
import 'core-js/es6/symbol';


configure({ enforceActions:'observed' });
const MOUNT_NODE = document.getElementById("app");

const AsyncCpt=asyncComponent(import(/* webpackChunkName: "any" */'./any'));

const App=()=>{
    return <Provider>
        <AsyncCpt />
    </Provider>
}

render(<App/>,MOUNT_NODE);
if(module.hot){
    module.hot.accept();
}

