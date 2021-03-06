import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'A Farewell To Arms',
    author: 'Ernest Hemingway'
  }

  const component = render(
    <Blog blog={blog} />
  )

  // const paragraph = component.container.querySelector('p')
  // console.log(prettyDOM(paragraph)) //helps you search for a smaller part of the component
  // component.debug() // shows you the html generated by the component in the console

  // Searches for matching text from entire HTML code rendered by component
  expect(component.container).toHaveTextContent('A Farewell To Arms')

  // getByText is a method that returns the element that contains the given text, exception occurs if it does not exist
  const element = component.getByText('A Farewell To Arms')
  expect(element).toBeDefined()

  // search for a specific element rendered by component, receives a css selector as param
  const div = component.container.querySelector('.blog-post')
  expect(div).toHaveTextContent('A Farewell To Arms')
})

describe('<Toggleable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel="login" className="toggleableContent">
        <div className="testDiv" />
      </Toggleable>
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('login')
    fireEvent.click(button)

    const div = component.container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })
})