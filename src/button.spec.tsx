import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';

import * as TestSubject from './button';

describe('Button', (): void => {
  it('Button export exists', (): void => {
    expect(TestSubject.Button).toBeDefined();
  });

  it('Button snapshot', (): void => {
    const snapshot = create(<TestSubject.Button label="button" />);
    snapshot.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('should change state on click', () => {
    const testSubject = mount(<TestSubject.Button label="button" />);

    expect(testSubject.text()).toBe('1button');

    testSubject.find('button').simulate('click');
    expect(testSubject.text()).toBe('2button');

    testSubject.find('button').simulate('click');
    expect(testSubject.text()).toBe('1button');
  });

  it('should invoke provided onClick handler', (): void => {
    const onClick = jest.fn();
    const testSubject = mount(<TestSubject.Button label="button" onClick={onClick} />);

    testSubject.find('button').simulate('click');

    expect(testSubject.text()).toBe('2button');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
