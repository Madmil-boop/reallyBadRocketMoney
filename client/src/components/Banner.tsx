import React from 'react';
import { Button } from './ui/Button.tsx';

const PLAID_ENV = import.meta.env.VITE_PLAID_ENV;

interface Props {
  initialSubheading?: boolean;
}

const Banner: React.FC<Props> = () => {
  return (
    <div id="banner" className="bottom-border-content">
      <div className="header">
        <h1 className="everpresent-content__heading">Budget App</h1>
      </div>
    </div>
  );
};

export default Banner;
