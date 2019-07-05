/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Col, Container, Row } from '@Components/Container';

const Base: React.FunctionComponent = ({ children }) => {

  return (
    <Container>
      <Row>
        <Col col>{children}</Col>
      </Row>
    </Container>
  );
};

export { Base };
