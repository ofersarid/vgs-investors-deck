import React, { Fragment } from 'react';
// import cx from 'classnames';
import { compose } from 'redux';
import styles from './styles.scss';

const Mobile = ({ animation, forward, frame }) => {
  return (
    <Fragment>
      <div className={styles.container} >
        Mobile Version
      </div>
    </Fragment>
  );
};

export default compose()(Mobile);
