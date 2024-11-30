import type {Meta, StoryObj} from "@storybook/react";
import LastProjectCard from "./LastProjectCard";
import {fn} from "@storybook/test";

const meta: Meta<typeof LastProjectCard> = {
    component: LastProjectCard,
    tags: ['autodocs'],
    args: {onClick: fn(),},
}

export default meta;
type Story = StoryObj<typeof LastProjectCard>;


export const Primary: Story = {
    name: 'Pattern 1',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 1',
        imageUrl: '/patterns/1.webp',
    },
};

export const Secondary: Story = {
    name: 'Pattern 2',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 2',
        imageUrl: '/patterns/2.webp',
    },
};

export const Third: Story = {
    name: 'Pattern 3',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 3',
        imageUrl: '/patterns/3.webp',
    },
};

export const Fourth: Story = {
    name: 'Pattern 4',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 4',
        imageUrl: '/patterns/4.webp',
    },
};

export const Fifth: Story = {
    name: 'Pattern 5',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 5',
        imageUrl: '/patterns/5.webp',
    },
};

export const Sixth: Story = {
    name: 'Pattern 6',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 6',
        imageUrl: '/patterns/6.webp',
    },
};

export const Seventh: Story = {
    name: 'Pattern 7',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 7',
        imageUrl: '/patterns/7.webp',
    },
};

export const Eighth: Story = {
    name: 'Pattern 8',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 8',
        imageUrl: '/patterns/8.webp',
    },
};

export const Ninth: Story = {
    name: 'Pattern 9',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 9',
        imageUrl: '/patterns/9.webp',
    },
};

export const Tenth: Story = {
    name: 'Pattern 10',
    parameters: {
        docs: {
            description: {
                story: 'Паттерны для проекта выбираются по функции {(index * 71287328173) % 10 + 1}, где index это порядковый номер проекта в supabase',
            },
        },
    },
    args: {
        title: 'Project 10',
        imageUrl: '/patterns/10.webp',
    },
};