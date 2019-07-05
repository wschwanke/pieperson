/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Card, CardBody, CardHeader } from '@Components/Card';
import { Col, Row } from '@Components/Container';
import { Base } from '@Layout/Base';

const SceneDiary: React.FunctionComponent = () => {
  return (
    <Base pageName="diary" title="Diary">
      <Row>
        <Col col>
          <Card>
            <CardHeader>View Diary Entries</CardHeader>
            <CardBody>Diary table</CardBody>
          </Card>
        </Col>
      </Row>
    </Base>
  );
};

export { SceneDiary };
