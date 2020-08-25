import React, { useState } from 'react';
import PasswordShowSvg from 'resources/svgs/authentication/PasswordShowSvg.svg';
import PasswordHideSvg from 'resources/svgs/authentication/PasswordHideSvg.svg';
import VyboInputBox from '../VyboInputBox/VyboInputBox';

const VyboInputPassword = (
  props: React.HTMLProps<HTMLInputElement> & { error?: string }
) => {
  const [inputType, setInputType] = useState('password');
  const handlePasswordIconClick = () => {
    setInputType((type) => (type === 'password' ? 'text' : 'password'));
  };
  return (
    <VyboInputBox
      type={inputType}
      iconAlt="password"
      iconSource={inputType === 'password' ? PasswordShowSvg : PasswordHideSvg}
      iconClick={handlePasswordIconClick}
      {...props}
    />
  );
};

export default VyboInputPassword;
