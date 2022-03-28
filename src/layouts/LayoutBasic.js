import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const nameSpace = 'layout-basic';

export default function LayoutBasic({ children }) {
  return (
    <>
      <Header />
      <Container className={nameSpace}>{children}</Container>
    </>
  );
}

LayoutBasic.propTypes = {
  children: PropTypes.element.isRequired,
};
