import React, { useState, lazy, Suspense } from 'react';
import { useAuth } from './hooks/use-auth';
import { Button } from './components/ui/button';

// Lazy load components
const Form = lazy(() => import('./components/form').then(module => ({ default: module.Form })));
const Preview = lazy(() => import('./components/preview').then(module => ({ default: module.Preview })));
const LoginForm = lazy(() => import('./components/login-form').then(module => ({ default: module.LoginForm })));

// Load fonts dynamically
const loadFonts = async () => {
  const fonts = [
    'inter',
    'roboto',
    'poppins',
    'montserrat',
    'playfair-display',
    'lato',
    'raleway'
  ];
  
  await Promise.all(
    fonts.map(font => 
      Promise.all([
        import(`@fontsource/${font}/400.css`),
        import(`@fontsource/${font}/700.css`)
      ])
    )
  );
};

// Load fonts when component mounts
loadFonts();

function App() {
  const [caption, setCaption] = useState('');
  const [color1, setColor1] = useState('#FF6B6B');
  const [color2, setColor2] = useState('#4ECDC4');
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm onLogin={setIsAuthenticated} />
      </Suspense>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">TikTok Slide Generator</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="flex gap-8">
        <div className='w-3/4 overflow-y-auto max-h-[100vh]'>
          <Suspense fallback={<div>Loading form...</div>}>
            <Form
              caption={caption}
              onCaptionChange={setCaption}
              color1={color1}
              onColor1Change={setColor1}
              color2={color2}
              onColor2Change={setColor2}
            />
          </Suspense>
        </div>
        <div className="w-1/4">
          <Suspense fallback={<div>Loading preview...</div>}>
            <Preview
              caption={caption}
              color1={color1}
              color2={color2}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
