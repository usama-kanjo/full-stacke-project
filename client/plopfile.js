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
        templateFile: 'plop-templates/component/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/atoms/{{name}}/{{name}}.module.css',
        templateFile: 'plop-templates/component/module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/atoms/{{name}}/{{name}}.stories.tsx',
        templateFile: 'plop-templates/component/story.tsx.hbs',
        data: { componentType: 'Atoms' },
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
        templateFile: 'plop-templates/component/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/molecules/{{name}}/{{name}}.module.css',
        templateFile: 'plop-templates/component/module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/molecules/{{name}}/{{name}}.stories.tsx',
        templateFile: 'plop-templates/component/story.tsx.hbs',
        data: { componentType: 'Molecules' },
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
        templateFile: 'plop-templates/component/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/organisms/{{name}}/{{name}}.module.css',
        templateFile: 'plop-templates/component/module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/organisms/{{name}}/{{name}}.stories.tsx',
        templateFile: 'plop-templates/component/story.tsx.hbs',
        data: { componentType: 'Organisms' },
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
        templateFile: 'plop-templates/page/page.tsx.hbs',
      },
    ],
  });
}
