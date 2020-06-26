import React from 'react';

import { RendererService } from './renderer-service';

import { Button } from './button';

type Props = {
  service: RendererService;
};

export const Application = ({ service }: Props) => {
  const onClick = () => {
    service.ping();
  };

  return (
    <div className="section container">
      <h1>Application loaded</h1>
      <Button label="Toggle" onClick={onClick} />
    </div>
  );
};

Application.displayName = 'Application';
