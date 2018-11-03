import * as React from 'react';

import { Header, Container } from 'semantic-ui-react';
import '../index.scss';

interface IProps {
    children?: React.ReactNode;
}

const layout: React.SFC<IProps> = ({children}) => (
    <div>
        <Header
            style={{
                background: '#c52d46',
                position: 'fixed',
                justifyContent: 'space-between',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '9998',
                display: 'flex',
                boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
            }}>
            Nav goes here.
        </Header>
        <Container
            fluid={true}
            style={{ marginTop: '65px', padding: '0 5%' }}>
            {children}
        </Container>
    </div>
);

export default layout;