import React from 'react';
import { CSSTransition } from 'react-transition-group';
const WithAnimation = ({ ComponentAninamtion, ...items }) => {
  return (
    <CSSTransition classNames="pages" timeout={1000} unmountOnExit>
      <ComponentAninamtion {...items}></ComponentAninamtion>;
    </CSSTransition>
  );
};
export default WithAnimation;
