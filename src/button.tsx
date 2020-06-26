import React, { useState } from 'react';

type Props = typeof defaultProps;

const defaultProps = {
  label: 'Button',
  onClick: () => {
    /* */
  },
};

export const Button = ({ label, onClick }: Props) => {
  const [toggle, setToggle] = useState(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
    setToggle(!toggle);
  };

  return (
    <div>
      <h2>{!toggle ? '1' : '2'}</h2>
      <button className="btn btn-primary" onClick={handleOnClick}>
        {label}
      </button>
    </div>
  );
};

Button.defaultProps = { ...defaultProps };

Button.displayName = 'Button';
