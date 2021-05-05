import React from 'react'
import type { Story } from '@storybook/react'

import { Input } from '../Input'
import { InputLabel } from '../InputLabel'

export default {
  title: 'InputLabel',
  component: InputLabel,
}

const Template: Story<ExtractProps<typeof InputLabel>> = (args) => <InputLabel {...args} />

export const WithInput = Template.bind({})

WithInput.args = {
  description: 'Email',
  control: <Input type="text" placeholder="Email" />,
}

export const GroupOfLabelsWithInputs: Story<ExtractProps<typeof InputLabel>> = (args) => (
  <>
    <InputLabel {...args} description="Name" control={<Input type="text" value="John Doe" />} />
    <InputLabel {...args} description="Email" control={<Input type="text" value="test@email.com" />} />
    <InputLabel {...args} description="Password" control={<Input type="password" value="12345678" />} />
  </>
)
