import styled from 'styled-components'

export const PageContainer = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: 2.75rem calc(100% - 2.75rem);
`

export const PageHeader = styled.header`
  flex-shrink: 0;

  position: sticky;
  top: 0;

  z-index: 500;
  left: 0;
  right: 0;

  height: 2.75rem;

  padding: 0 1rem;
  display: flex;
  align-items: center;
`

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
`
