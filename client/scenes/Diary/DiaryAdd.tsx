/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Card, CardBody } from '@Components/Card';
import { Col, Row } from '@Components/Container';
import { TextInput } from '@Components/Forms';
import { FormGroup } from '@Components/Forms/FormGroup';
import { Base } from '@Layout/Base';

const SceneDiaryAdd: React.FunctionComponent = () => {
  return (
    <Base pageName="diary" title="Add Diary Entry">
      <Row>
        <Col col>
          <Card>
            <CardBody>
              <FormGroup isRow>
                <Col col>
                  <TextInput label="Today" placeholder="Test" />
                </Col>
                <Col col>
                  <TextInput label="Current Time" placeholder="Test2" />
                </Col>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Base>
  );
};

export { SceneDiaryAdd };
