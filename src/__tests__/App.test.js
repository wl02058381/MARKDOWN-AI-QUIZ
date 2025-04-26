import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // 確保引入 jest-dom 擴展
import App from '../App';

configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  render(<App />);
});