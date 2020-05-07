import React from 'react';
import { useLoader } from './useLoader';
import './App.scss';
function App() {
  const {progress,progressText} = useLoader();
  const progressPercent = progress * 100;
  const className = `Progress__Bar__Data__${progressPercent}`;
  return (
    <div className="App">
      <div className={'Bar__Title__Container'}>
        <h2 className={'Bar__Title'}>RX JS Progress Bar</h2>
      </div>
      <div className="Progress__Border">
        <div className={`Progress__Bar ${className}`}>
           { progressPercent === 100 && 'Successfully Hacked!'}
        </div>
      </div>
      <div className="Percentage">
        <p className={'Percentage__Text'}>{progressPercent} %</p>
      </div>
      <div className="Progress__Text__Container">
        <p className="Progress__Text">
          {progressText}
        </p>
      </div>
      <div className="Load__Button__Container">
        <button className={'Hack__Button'} id="load">
          Click To Hack!
        </button>
      </div>
      <div className="SocialLink__Container">
        <h3>Made By: <a href={'https://facebook.com/developerayarhlaine'}>Ayar Hlaine</a></h3>
      </div>
    </div>
  );
}

export default App;
