import clsx from 'clsx'
import React from 'react'
import styled from 'styled-components'

export const PageContainer = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: 3rem calc(100% - 3rem);
`

export const PageHeader = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <header
    className={clsx('z-50 flex-shrink-0 px-4 h-12 sticky top-0 left-0 right-0 flex items-center bg-gray', className)}
    {...props}
  />
)

export const PageBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('flex flex-col', className)} {...props} />
)
