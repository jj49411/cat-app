import React from 'react';
import { shallow } from 'enzyme';
import CatApp from './App';

describe('CatApp', () => {
    
    let wrapper;
    let component;
  
    beforeEach(() => {
    wrapper = shallow(<CatApp />);
    component = wrapper.instance();
  })

  it('shows the title', () => {
    const text = wrapper.find('h1').text();
    expect(text).toEqual("Let's learn about cats!");
  });

  it('has a button to choose a breed', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('runs showBreeds function when clicked on the button', () => {
    const showBreeds = jest
      .spyOn(component, 'showBreeds')
      .mockImplementation(() => Promise.resolve());
      
      component.forceUpdate();
      wrapper.find('#breedsButton').simulate('click')
      
      expect(showBreeds).toHaveBeenCalled();
  });

  it('renders name when clicked on a breed', () => {
    wrapper.setState({ breedsName:'American Shorthair' })
    expect(wrapper.find('#name').text()).toEqual('American Shorthair')
  });

  it('renders description when clicked on a breed', () => {
    wrapper.setState({ breedsDescription:'The American Shorthair is known for its longevity, robust health, good looks, sweet personality, and amiability with children, dogs, and other pets.' })
    expect(wrapper.find('#description').text()).toEqual('The American Shorthair is known for its longevity, robust health, good looks, sweet personality, and amiability with children, dogs, and other pets.')
  });
  


});

