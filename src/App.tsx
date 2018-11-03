import * as React from 'react';

import Layout from './hoc/Layout';
import Routes from './routes';
import './index.scss';

class App extends React.Component<any, any> {
  public state = {
    currentHero: {}
  }

  public render() {
    return (
      <Layout>
        <Routes currentHero={this.state.currentHero} />
      </Layout>
    );
  }
}

export default App;
