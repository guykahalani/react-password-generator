import { useCallback, useState } from 'react';
import './App.scss';
import GeneratorForm from './components/GeneratorForm';

function App() {
  
  const [password, setPassword] = useState('');

  const updatePassword = useCallback(newPassword => {
    setPassword(newPassword);
  }, []);

  const handleCopyPassword = e => {
    switch (password) {
      case '':
        alert('Nothing to copy!');  
        break;
      case 'Copied!':
        alert('Copied to clipboard!');
        break;
      default:
        navigator.clipboard.writeText(password);
        setPassword('Copied!');
        e.target.disabled = !e.target.disabled;
        break;
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Password Generator</h1>
        <div className="password-output-container">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="CLICK GENERATE" 
              id="password-output" 
              name="password-output" 
              readOnly 
              value={password} />
            <button onClick={e => handleCopyPassword(e)} disabled={false}>
              <i className="fas fa-copy"></i>
            </button>
          </div>
        </div>
        <GeneratorForm updatePassword={updatePassword}/>
      </div>
    </div>
  );
}

export default App;
