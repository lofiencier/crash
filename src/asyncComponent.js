import React, {Component} from 'react';
const path=require('path');

const asyncComponent = importComponent => {
     return class extends Component {
        constructor(props){
            super();
            this.state = {
                component: null
            }
        }
        componentDidMount(){
            importComponent.then(cmp=>{
                this.setState({component:cmp.default});
            });
        }
        render(){
            const C=this.state.component;
            return C?<C {...this.props}/>:null
        }
    }
}

// const lazyLoader = (importComponent) => (
//     class AsyncComponent extends Component {
//       state = { C: null }
  
//       async componentDidMount () {
//         const { default: C } = await importComponent();
//         this.setState({ C });
//       }
  
//       render () {
//         const { C } = this.state;
//         return C ? <C {...this.props} /> : null;
//       }
//     }
//   );

export default asyncComponent;