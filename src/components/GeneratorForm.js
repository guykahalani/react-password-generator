import React, { useState } from 'react';
import characters from './characters';


const GeneratorForm = ({ updatePassword }) => {
    
    const [passwordLength, setPasswordLength] = useState(16);
    const [settings, setSettings] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: false });

    const handlePasswordLengthChange = e => {
        setPasswordLength(e.target.value);
    }
    const handleSettingsChange = e => {
        let updatedSettings = { ...settings, [e.target.id]: e.target.checked };
        setSettings(updatedSettings);
    }

    const generateCharList = () => {
        let charList =  '';
        let regex = '';
        settings.uppercase && (charList += characters.upperCaseLetters) && (regex += '(?=.*[A-Z])'); 
        settings.lowercase && (charList += characters.lowerCaseLetters) && (regex += '(?=.*[a-z])'); 
        settings.numbers && (charList += characters.numbers) && (regex += '(?=.*\\d)'); 
        settings.symbols && (charList += characters.specialCharacters) && (regex += `(?=.*[${characters.specialCharacters}])`); 
        return [charList, new RegExp(regex)];
    }

    const getRandomCharIndex = (l) => {
        return Math.round(Math.random() * (l-1));
    }
    
    const generatePassword = () => {
        let password = '';
        const [charList, regex] = generateCharList();
        
        for (let i = 0; i < Number(passwordLength); i++) {
            const charIndex = getRandomCharIndex(charList.length);
            const randomChar = charList.charAt(charIndex);

            // make sure there are no consecutive characters
            password.charAt(password.length-1) === randomChar ? i-- : password += randomChar;

            // regenerate password if regex fails
            if (i+1 === Number(passwordLength) && !regex.test(password)) {
                i = -1;
                password = '';
            }
        }

        return password;
    }

    const handleSubmit = e => {
        e.preventDefault();
        Object.values(settings).some(setting => setting === true) ? updatePassword(generatePassword()) : alert('Include at least one option');
    }

    const displaySettingsOptions = Object.entries(settings).map(([setting, isChecked]) => (
        <div className="form-group" key={setting}>
            <label htmlFor="uppercase">
                Include {setting}
            </label>
            <label className="switch">
                <input 
                    type="checkbox" 
                    name="settings" 
                    id={setting} 
                    checked={isChecked} 
                    onChange={e => handleSettingsChange(e)}
                />
                <span className="slider"></span>
            </label>
        </div>
    ))

    return (
        <div className='generator-form-container'>
            <form className='generator-form' onSubmit={e => handleSubmit(e)}>
                <fieldset>
                    <legend>Length: <span className="length-value">{passwordLength}</span></legend>
                    <div className="form-group">
                        <span className="range-min">4</span> 
                        <input type="range" name="length" id="length" min="4" max="32" value={passwordLength} onChange={e => handlePasswordLengthChange(e)} /> 
                        <span className="range-max">32</span>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Settings</legend>
                    { displaySettingsOptions }
                </fieldset>
                <input type="submit" value="Generate Password" />
            </form>
        </div>
    )
}

export default GeneratorForm
