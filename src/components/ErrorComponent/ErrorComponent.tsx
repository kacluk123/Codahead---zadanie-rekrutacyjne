import { Alert } from 'antd'
import * as React from 'react'
import * as Styled from './ErrorComponent.styles'

export const ErrorComponent = () => {
  return (
    <Styled.ErrorComponent>
      <Alert
        message="Error"
        description="An error occured, plase try again later"
        type="error"
        showIcon
      />
    </Styled.ErrorComponent>
  )
} 
