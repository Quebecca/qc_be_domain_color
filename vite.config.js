import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Deux cibles, comme rollup.config.js :
//   - 'component' (défaut) : l'artefact livrable qc-domain-color-pickers.
//   - 'test' : le bundle du harnais de dev (dev/test.html), gitignoré.
// Sélection via la variable d'env BUILD_TARGET (voir scripts package.json).
const isTest = process.env.BUILD_TARGET === 'test';

const targets = {
    component: {
        entry: 'Resources/Private/WebComponents/DomainColorPickers/DomainColorPickers.js',
        outDir: 'Resources/Public/WebComponents/DomainColorPickers',
        fileName: 'DomainColorPickers.js',
    },
    test: {
        entry: 'Resources/Private/WebComponents/DomainColorPickers/dev/test.js',
        outDir: 'Resources/Private/WebComponents/DomainColorPickers/dev',
        fileName: 'testBundle.js',
    },
};

const target = isTest ? targets.test : targets.component;

// Migration du bundler Rollup -> Vite (Svelte 4 conservé).
// Objectif : produire le MÊME artefact que rollup.config.js
//   - web component compilé en custom element (shadow: 'none')
//   - un seul fichier IIFE, styles SCSS injectés dans le JS (aucun .css séparé)
//   - même chemin de sortie que la config Rollup, pour ne rien changer côté TYPO3.
export default defineConfig({
    plugins: [
        svelte({
            // Équivaut aux svelteOptions de rollup.config.js.
            compilerOptions: {
                customElement: true,
            },
            // SCSS des blocs <style lang="scss"> via le pipeline CSS de Vite (dep sass déjà présente),
            // en remplacement de svelte-preprocess.
            preprocess: vitePreprocess(),
            onwarn(warning, handler) {
                if (warning.code === 'css-unused-selector') {
                    return;
                }
                handler(warning);
            },
        }),
    ],
    resolve: {
        // Reprend resolveOptions.dedupe de la config Rollup : une seule copie de svelte.
        dedupe: ['svelte'],
    },
    build: {
        outDir: target.outDir,
        // Ne pas vider le dossier de sortie (il contient d'autres assets publics suivis).
        emptyOutDir: false,
        // Minification esbuild (défaut Vite). Le JS de BackOffice n'a pas besoin d'être lisible.
        minify: 'esbuild',
        lib: {
            entry: path.resolve(__dirname, target.entry),
            formats: ['iife'],
            name: 'DomainColorPickers',
            fileName: () => target.fileName,
        },
        rollupOptions: {
            output: {
                // Nom de sortie figé, sans hash, identique à l'ancien artefact.
                entryFileNames: target.fileName,
            },
        },
    },
});
