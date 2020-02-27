import React from 'react';
import { shallow } from 'enzyme';
import CatApp from './App';

describe('CatApp', () => {
    
    let wrapper;
  
    beforeEach(() => {
    wrapper = shallow(<CatApp />);
  })

  it('shows the title', () => {
    const text = wrapper.find('p').text();
    expect(text).toEqual("Let's learn about cats!");
  });

  it('has a button to choose a breed', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('runs showBreeds function when clicked on the button', () => {
    const component = wrapper.instance();
    const showBreeds = jest
      .spyOn(component, 'showBreeds')
      .mockImplementation(() => Promise.resolve());
      
      component.forceUpdate();
      wrapper.find('#breedsButton').simulate('click')
      
      expect(showBreeds).toHaveBeenCalled();
  });

  

});

