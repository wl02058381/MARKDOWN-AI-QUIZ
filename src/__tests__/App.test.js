import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // 確保引入 jest-dom 擴展
import App from '../App';
import 'jest-canvas-mock'; // 可選，用於處理 canvas 相關警告
import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

test('renders without crashing', () => {
  render(<App />);
});