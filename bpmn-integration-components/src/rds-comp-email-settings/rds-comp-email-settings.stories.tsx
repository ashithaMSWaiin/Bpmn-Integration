import type { Meta, StoryObj } from '@storybook/react';
import RdsCompEmailSettings from "./rds-comp-email-settings";


const meta: Meta = { 
    title: "Components/Email Settings",
    component: RdsCompEmailSettings,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompEmailSettings>;

export default meta;
type Story = StoryObj<typeof RdsCompEmailSettings>;

export const Default: Story = {
    args: {
    }
} satisfies Story;




