import React from 'react'
import type { Story } from '@storybook/react'

import { Input } from '../Input'
import { Label } from '../Label'

export default {
  title: 'Label',
  component: Label,
}

const Template: Story<ExtractProps<typeof Label>> = (args) => <Label {...args} />

export const WithInput = Template.bind({})

WithInput.args = {
  description: 'Email',
  control: <Input placeholder="Email" />,
}

export const GroupOfLabelsWithInputs: Story<ExtractProps<typeof Label>> = (args) => (
  <>
    <Label {...args} description="Name" control={<Input value="John Doe" />} />
    <Label {...args} description="Email" control={<Input value="test@email.com" />} />
    <Label {...args} description="Password" control={<Input type="password" value="12345678" />} />
  </>
)
