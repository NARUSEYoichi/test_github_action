import globals from "globals";
// import pluginJs from "@eslint/js";
import html from "eslint-plugin-html"
import autofixPlugin from 'eslint-plugin-autofix';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            "src/docs/_build/",
            "src/static/AdminLTE-master/",
            "src/static/admin/",
            "src/static/bootstrap-datepicker-1.9.0-dist/",
            "src/static/jazzmin/",
            "src/static/vendor/",
        ]
    },
    {
        plugins: {
            autofix: autofixPlugin,
        },
        files: ["src/**/*.js"],
        rules: {
            "no-undef": "warn",             // warn on variables not defined with var/let/const
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                $: "readonly", // Mark jQuery $ as a known global
                jQuery: "readonly",
                Swal: "readonly",
                gettext: "readonly",
            },
        },
        files: ["src/**/*.html"],

        plugins: {html},

        "rules": {
            "no-undef": "warn",             // warn on variables not defined with var/let/const
        }
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                $: "readonly", // Mark jQuery $ as a known global
                jQuery: "readonly",
                Swal: "readonly",
                gettext: "readonly",
            },
        },
        files: ["src/**/*.js"],
        rules: {
            "no-undef": "warn",             // warn on variables not defined with var/let/const
        },
    },

    // pluginJs.configs.recommended,
];
