import React from 'react'
import type { Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Input as InputComponent } from '../Input'

export default {
  title: 'Input',
  component: InputComponent,
}

export const Input: Story<ExtractProps<typeof InputComponent>> = (args) => (
  <InputComponent onChange={action('change')} {...args} />
)

Input.args = {
  placeholder: 'Email',
  fluid: false,
}
