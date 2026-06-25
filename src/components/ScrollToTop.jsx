// client/src/components/ScrollToTop.jsx
// React Router doesn't reset scroll position on navigation by default —
// without this, clicking into a hospital/doctor page (or any link) keeps
// whatever scroll position you were at on the previous page. This component
// watches the URL and scrolls back to the top every time it changes.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
