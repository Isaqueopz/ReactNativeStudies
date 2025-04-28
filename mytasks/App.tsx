import React from 'react';
import { registerRootComponent } from 'expo';
import { Routes } from './src/routes';

export default function App() {
  return <Routes />;
}

registerRootComponent(App);
