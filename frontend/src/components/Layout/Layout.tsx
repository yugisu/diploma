import styled from 'styled-components'

export const PageContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`

export const PageHeader = styled.header`
  flex-shrink: 0;

  position: sticky;
  top: 0;

  z-index: 500;
  left: 0;
  right: 0;

  height: 3rem;

  padding: 0 4rem;
  display: flex;
  align-items: center;
`

export const PageBody = styled.div`
  flex: 1 0;

  padding: 2rem 4rem 5rem;
  display: flex;
  flex-direction: column;
`
