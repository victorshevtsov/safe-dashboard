import React from 'react'
import styled from 'styled-components'
import { Logo } from './components/Logo'
import { OwnersList } from './components/OwnersList'

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const SafeApp = (): React.ReactElement => {

  return (
    <Container>
      <Logo />
      <OwnersList />
    </Container>
  )
}

export default SafeApp
