module.exports = function (plop) {
    plop.setGenerator('components', {
        description: 'Build a Component Skeleton',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name of the component?'
            },
            {
                type: 'list',
                name: 'type',
                message: 'Type of the component?',
                choices: ['pure', 'base', 'feature', 'wrapper', 'provider'],
                default: 'pure'
            },
            {
                type: 'checkbox',
                name: 'files',
                message: 'Files to create?',
                default: ['vue', 'unit'],
                choices: [
                    {
                        name: 'vue',
                        message: 'Vue file'
                    },
                    {
                        name: 'unit',
                        message: 'Unit test file'
                    },
                    {
                        name: 'story',
                        message: 'Storybook file'
                    }
                ]
            },
            {
                type: "checkbox",
                name: "blocks",
                message: "Blocks:",
                default: ["script", "template"],
                when: function (answers) { 
                    return answers.files.includes('vue')
                },
                choices: [
                    {
                        name: "script",
                        message: "add script block",
                    },
                    {
                        name: "template",
                        message: "add template block",
                    },
                    {
                        name: "style",
                        message: "add style block",
                    },
                ],
            },

        ],
        actions: [
            {
                skip: function (answers) {
                    return !answers.files.includes('vue') ? 'skipped' : null
                },
                type: 'add',
                path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.vue',
                templateFile: 'plopTemplates/component.hbs',
                skipIfExists: true,
                
            },
            {
                skip: function (answers) {
                    return !answers.files.includes('unit') ? 'skipped' : null
                },
                type: 'add',
                path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.test.ts',
                templateFile: 'plopTemplates/unitComponent.hbs',
                skipIfExists: true,
                
            },
            {
                skip: function (answers) {
                    return !answers.files.includes('stories') ? 'skipped' : null
                },
                type: 'add',
                path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.stories.ts',
                templateFile: 'plopTemplates/componentStory.hbs',
                skipIfExists: true,
                
            }
        ]
    })

    plop.setGenerator('layout', {
        description: 'Build a Layout Skeleton',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name of the Layout'
            },
            
        ],
        actions: [
            {
                type: 'add',
                path: 'src/layouts/{{camelCase name}}.vue',
                templateFile: 'plopTemplates/layout.hbs',
                skipIfExists: true,
            }
        ]
    })

    plop.setGenerator('page', {
        description: 'Build a Page Skeleton',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name of the Page'
            },
            {
                type: 'input',
                name: 'path',
                message: 'Path of the Page'
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{path}}{{camelCase name}}.vue',
                templateFile: 'plopTemplates/page.hbs',
                skipIfExists: true,
            }
        ]
    })

    plop.setGenerator('composable', {
        description: 'Build a Composable Skeleton',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name of the Composable'
            },
            {
                type: 'confirm',
                name: 'unit',
                message: 'Add a Unit Test File?',
                default: true
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/composables/{{camelCase name}}/{{camelCase name}}.ts',
                templateFile: 'plopTemplates/composable.hbs',
                skipIfExists: true,
            },
            {
                skip: function (answers) {
                    return !answers.unit ? 'skipped' : null
                },
                type: 'add',
                path: 'src/composables/{{camelCase name}}/{{camelCase name}}.test.ts',
                templateFile: 'plopTemplates/unitComposable.hbs',
                skipIfExists: true,
            }
        ]
    })

    plop.setGenerator('store', {
        description: 'Build a Pinia Store File',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name of the Store'
            },
            {
                type: 'confirm',
                name: 'persist',
                message: 'Persist the Store?',
                default: false
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/store/{{camelCase name}}.ts',
                templateFile: 'plopTemplates/piniaStore.hbs',
                skipIfExists: true,
            },
        ]
    })

    plop.setGenerator('interface', {
        description: 'Build a Typescript Interface',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name of the Interface'
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/type/{{camelCase name}}.interfaces.ts',
                templateFile: 'plopTemplates/interface.hbs',
                skipIfExists: true,
            },
        ]
    })
}