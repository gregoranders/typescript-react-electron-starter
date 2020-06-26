import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';

jest.mock('fancy-log');

import * as TestSubject from './application';

import { RendererService } from './renderer-service';

describe('Application', (): void => {
  const pingMock = jest.fn();
  const RendererServiceMock = jest.fn().mockImplementation(() => {
    return {
      ping: pingMock,
    };
  });

  const service: RendererService = new RendererServiceMock();

  beforeEach((): void => {
    RendererServiceMock.mockClear();
  });

  it('export exists', (): void => {
    expect(TestSubject.Application).toBeDefined();
  });

  it('snapshot', (): void => {
    const snapshot = create(<TestSubject.Application service={service} />);
    snapshot.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('header', (): void => {
    const testSubject = mount(<TestSubject.Application service={service} />);

    expect(testSubject.find('h1').text()).toBe('Application loaded');
  });

  it('button clicked', (): void => {
    const testSubject = mount(<TestSubject.Application service={service} />);

    expect(pingMock).toBeCalledTimes(0);
    testSubject.find('Button').find('button').simulate('click');
    expect(pingMock).toBeCalledTimes(1);
  });
});
