import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import sveltePreprocess from 'svelte-preprocess';
import json from '@rollup/plugin-json'
import {glob} from 'glob'
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';

String.prototype.lcFirst = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

let
    includePathOptions = {
        paths: ['..'],
    },
    svelteOptions = {
        compilerOptions: {
            // enable run-time checks
            customElement: true
        },
        onwarn: (warning, handler) => {
            const { code } = warning;
            if (code === "css-unused-selector")
                return;

            handler(warning);
        },
        preprocess: sveltePreprocess(),
    },
    resolveOptions = {
        browser: true,
        // Force resolving for these modules to root's node_modules that helps
        // to prevent bundling the same package multiple times if package is
        // imported from dependencies.
        dedupe: ['svelte']
    }
    , rollupOptions = []
;
[
    'DomainColorPickers'
].forEach(component => {
    const path = component + '/' + component + '.js';
    rollupOptions.push(
        {
            input: 'Resources/Private/WebComponents/' + path,
            output: {
                file: 'Resources/Public/WebComponents/' + path,
                format: 'iife',
            },
            plugins: [
                json({
                    compact: true
                }),
                includePaths(includePathOptions),
                url({
                  include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
                }),
                svelte(svelteOptions),
                postcss({
                  extract: true,  // Extracts the CSS into a separate file
                  minimize: true, // Minify the CSS (optional)
                  use: ['sass'],  // Enable if using SCSS or any preprocessor
                }),
                resolve(resolveOptions),
                commonjs()
            ],
        },
    )
})
;

glob
    .sync('Resources/Private/WebComponents/**/test.js')
    .forEach(file => {
        let output = file.replace('test', 'testBundle')
        rollupOptions.push(
            {
                input: file,
                output: {
                    file:output,
                    format: 'iife',
                },
                plugins: [
                    json({
                        compact: true
                    }),
                    url({
                      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
                    }),
                    includePaths(includePathOptions),
                    svelte(svelteOptions),
                    resolve(resolveOptions),
                    commonjs()
                ],
            },
        )
    })


export default rollupOptions;


