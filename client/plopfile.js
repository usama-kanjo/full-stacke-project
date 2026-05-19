export default function (plop) {
  plop.setGenerator('atom', {
    description: 'Atom component (en küçük UI birimi)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/atoms/{{name}}/index.tsx',
        template: `type {{name}}Props = {
  children?: React.ReactNode;
};

export default function {{name}}({ children }: {{name}}Props) {
  return <div className={styles.container}>{children}</div>;
}

import styles from "./{{name}}.module.css";
`,
      },
      {
        type: 'add',
        path: 'src/components/atoms/{{name}}/{{name}}.module.css',
        template: `.container {
  /* {{name}} styles */
}
`,
      },
      {
        type: 'add',
        path: 'src/components/atoms/{{name}}/{{name}}.stories.tsx',
        template: `import type { Meta, StoryObj } from "@storybook/react";
import {{name}} from "./index";

const meta: Meta<typeof {{name}}> = {
  title: "Atoms/{{name}}",
  component: {{name}},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof {{name}}>;

export const Default: Story = {
  args: {
    children: "{{name}}",
  },
};
`,
      },
    ],
  });

  plop.setGenerator('molecule', {
    description: 'Molecule component (atomlardan oluşan grup)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/molecules/{{name}}/index.tsx',
        template: `type {{name}}Props = {
  children?: React.ReactNode;
};

export default function {{name}}({ children }: {{name}}Props) {
  return <div className={styles.container}>{children}</div>;
}

import styles from "./{{name}}.module.css";
`,
      },
      {
        type: 'add',
        path: 'src/components/molecules/{{name}}/{{name}}.module.css',
        template: `.container {
  /* {{name}} styles */
}
`,
      },
      {
        type: 'add',
        path: 'src/components/molecules/{{name}}/{{name}}.stories.tsx',
        template: `import type { Meta, StoryObj } from "@storybook/react";
import {{name}} from "./index";

const meta: Meta<typeof {{name}}> = {
  title: "Molecules/{{name}}",
  component: {{name}},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof {{name}}>;

export const Default: Story = {
  args: {
    children: "{{name}}",
  },
};
`,
      },
    ],
  });

  plop.setGenerator('organism', {
    description: 'Organism component (karmaşık UI bölümü)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/organisms/{{name}}/index.tsx',
        template: `type {{name}}Props = {
  children?: React.ReactNode;
};

export default function {{name}}({ children }: {{name}}Props) {
  return <div className={styles.container}>{children}</div>;
}

import styles from "./{{name}}.module.css";
`,
      },
      {
        type: 'add',
        path: 'src/components/organisms/{{name}}/{{name}}.module.css',
        template: `.container {
  /* {{name}} styles */
}
`,
      },
      {
        type: 'add',
        path: 'src/components/organisms/{{name}}/{{name}}.stories.tsx',
        template: `import type { Meta, StoryObj } from "@storybook/react";
import {{name}} from "./index";

const meta: Meta<typeof {{name}}> = {
  title: "Organisms/{{name}}",
  component: {{name}},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof {{name}}>;

export const Default: Story = {
  args: {
    children: "{{name}}",
  },
};
`,
      },
    ],
  });

  plop.setGenerator('page', {
    description: 'Page component (Next.js App Router sayfası)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name (kebab-case):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/{{name}}/page.tsx',
        template: `export default function {{pascalCase name}}Page() {
  return <div>{/* {{name}} page */}</div>;
}
`,
      },
    ],
  });
}
