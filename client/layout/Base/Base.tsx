/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Main } from '@Layout/Main';
import { Sidebar } from '@Layout/Sidebar';
import { PageHeading } from './PageHeading';
import { Container } from '@Components/Container';

interface Props {
  pageName: string;
  title: string;
}

const Base: React.FunctionComponent<Props> = ({ children, pageName, title }) => {

  return (
    <div className={`Base ${pageName} d-flex h-auto min-h-screen`}>
      <div className="d-flex flex-fill">
        <Sidebar />
        <Main>
          <Container>
            <PageHeading>{title}</PageHeading>
            {children}
          </Container>
        </Main>
      </div>
    </div>
  );
};

export { Base };
