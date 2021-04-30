import React from 'react'
import type { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button as ButtonComponent } from '../Button'

export default {
  title: 'Button',
  component: ButtonComponent,
}

const Template: Story<ExtractProps<typeof ButtonComponent>> = (args) => (
  <ButtonComponent onChange={action('change')} {...args} />
)

export const Default = Template.bind({})

Default.args = {
  children: 'Click Here',
}

export const Primary = Template.bind({})

Primary.args = {
  children: 'Click Here',
  primary: true,
}
