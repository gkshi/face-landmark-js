import React, { useEffect } from 'react'

import IconCheck from '../../icons/check'

import './_index.scss'

interface UICheckboxProps extends React.ComponentProps<any> {}

function UICheckbox (props: UICheckboxProps) {
  const inputRef = React.useRef(null)

  const inputProps = () => {
    const _props = { ...props }
    delete _props.children
    return _props
  }

  const checked = () => props.checked

  const onClick = e => {
    e.preventDefault()
    inputRef.current.click()
  }

  useEffect(() => {
    console.log('# props.checked', props.checked)
  }, [props.checked])

  return (
    <div className={`component -ui-checkbox ${checked() ? '-checked' : ''}`}>
      <label className="flex a-center" onClick={onClick}>
        <input ref={inputRef} type="checkbox" {...inputProps()} />
        <div className="icon-container -check box flex center">
          <IconCheck />
        </div>
        <div className="label">{props.children}</div>
      </label>
    </div>
  )
}

export default UICheckbox
