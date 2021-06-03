import React from 'react';

import ViewParagraph from './ViewParagraph';
import { render } from '@testing-library/react';

// import { render } from '../../../testUtils/modifiedRenderReactTesting';

describe('View paragraphs', () => {
  let testProps = {};
  const mockTitle = 'mockTitle';
  const mockContent = 'mockContent';

  beforeEach(() => {
    const mockGetValues = jest.fn().mockImplementation(() =>
      Promise.resolve({
        title: mockTitle,
        content: mockContent,
      })
    );
    const keys = {
      view_id: 'landing',
      identity: 'presentation_00',
    };
    testProps = {
      keys: keys,
      qnt: 3,
      initData: [],
      getValues: mockGetValues,
    };
  });
  test('it should exists', () => {
    render(<ViewParagraph {...testProps} />);

    // console.log('testing, testProps ->', testProps)
  });
});
