import type { Meta, StoryObj } from '@storybook/react';
import RdsCompTenantInformation from "./rds-comp-tenant-information";


const meta: Meta = { 
    title: "Components/Tenant Information",
    component: RdsCompTenantInformation,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompTenantInformation>;

export default meta;
type Story = StoryObj<typeof RdsCompTenantInformation>;

export const Default: Story = {
    args: {
        editions: [
                    {
                        label: "Not assigned",
                        val:1
                    },
                    {
                        label: "Standard",
                        val:2
                    },
                    {
                        label: "apple",
                        val:3
                    },
                    {
                        label: "Apple1",
                        val:4
                    },
                ],
    }
} satisfies Story;




