import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // 確保引入 jest-dom 擴展
import App from '../App';

test('renders without crashing Test', () => {
  render(<App />);
});