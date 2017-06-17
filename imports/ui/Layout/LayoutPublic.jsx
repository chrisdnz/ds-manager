import React, {Component} from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class LayoutPublic extends Component {
    render() {
        return (
            <main>
                {this.props.content}
                <Alert stack={{limit: 3}} />
            </main>
        );
    }
}
export default LayoutPublic;