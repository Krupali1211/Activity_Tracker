import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './routes/AppRouter';


class Root extends React.Component {
    render() {
      return (
        <div>
          <AppRouter/>
        </div>
      );
    }
  }

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
