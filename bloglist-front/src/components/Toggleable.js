import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StylishDiv = styled.div`
`
const StylishButton = styled.button`
  background: #fff870;
&:hover {
  background: #85015d
}
font-size: 0.9em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #8f8d64;
border-radius: 3px;
text-align: center;
`

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  console.log('visible:', visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  console.log('hideWhenVisible', hideWhenVisible)
  console.log('swhowhenvisible', showWhenVisible)

  const toggleVisibility = () => {
    console.log('togglevisibility runs with visible:', visible)
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  console.log('props.children', props.children)
  return (
    <StylishDiv>
      <div style={hideWhenVisible}>
        <StylishButton onClick={toggleVisibility}>{props.buttonLabel}</StylishButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StylishButton onClick={toggleVisibility}>cancel</StylishButton>
      </div>
    </StylishDiv>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable