import React from 'react';
// import cx from 'classnames';
import { compose } from 'redux';
import styles from './styles.scss';

const Desktop = ({ animation, frame }) => {
  return (
    <div className={styles.container} >
      Desktop Version
    </div >
  );
};

export default compose()(Desktop);
