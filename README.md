# Dropdown Component

## Features
- Searchable Dropdown
- Portal Support
- Single or Multiple Selection
- Customizable Option Rendering
- Search Filtering
- Toggle Features
- Z-Index Compatibility

## Installation
1. Clone repository
2. Install dependencies:
    ```bash
    npm install
    ```

3. Jalankan server pengembangan:
    ```bash
    npm start
    ```

4. Jalankan Storybook:
    ```bash
    npm run storybook
    ```

## Usage
Import and use the `Dropdown` component in your project:
```javascript
import Dropdown from './components/Dropdown';

const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    // Tambahkan opsi lainnya sesuai kebutuhan
];

<Dropdown options={options} searchable multiple />;
