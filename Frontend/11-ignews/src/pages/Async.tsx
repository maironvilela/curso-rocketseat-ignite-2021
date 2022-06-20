import { useEffect, useState } from 'react';

export default function Async() {
  const [isH1Visible, setIsH1Visible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsH1Visible(true);
    }, 2000);
  }, []);
  return <div>{isH1Visible && <h1>Async</h1>}</div>;
}
