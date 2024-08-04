import React from 'react';
import Dropdown from './components/Dropdown';

function App() {
    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
        { value: '6', label: 'Option 6' },
        { value: '7', label: 'Option 7' },
    ];

    return (
        <div className="App">
            <h1 className="text-2xl font-bold mb-4">Dropdown Component</h1>
            <Dropdown options={options} searchable multiple />
        </div>
    );
}

export default App;