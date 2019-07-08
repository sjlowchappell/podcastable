import React from 'react';
import apiLogo from './assets/api-logo.png';

class Footer extends React.Component {
    render () {
        return (
            <footer>
                <div className='wrapper'>
                    <a href='https://www.listennotes.com/api/docs/' className='apiLogo'>
                        <img src={apiLogo} />
                    </a>
                    <p>© 2019 Sam Low-Chappell</p>
                </div>
            </footer>
        )
    }
}

export default Footer;