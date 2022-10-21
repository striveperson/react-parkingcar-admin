import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import './index.css';

const queryClient = new QueryClient({defaultOptions: {
  queries: {
    retry: 0,
    // suspense: true,
    refetchOnWindowFocus: false // 다른쪽에 포스 맞춰저있다가 윈도우로 포커스가 들어오면 refetch 실행
  }
}});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>          
          <App />
        </Provider>
      </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
