import * as React from 'react';

import Routes from './routes';
import { Header, Container } from 'semantic-ui-react';
import Nav from './components/Nav/Nav';
import './index.scss';

class App extends React.Component<any> {
  public state = {
    currentHero: {}
  }

  public render() {
    return (
      <React.Fragment>
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
            <Nav />
        </Header>
        <Container
            fluid={true}
            style={{ marginTop: '65px', padding: '0 5%' }}>
            <Routes currentHero={this.state.currentHero} />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
