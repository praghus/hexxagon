import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    build: {
        sourcemap: true,
        target: 'esnext',
        rollupOptions: {
            output: {
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: '[name]-[hash].js',
                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'assets/images/[name]-[hash][extname]'
                    }
                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]'
                    }
                    // default value
                    // ref: https://rollupjs.org/guide/en/#outputassetfilenames
                    return 'assets/[name]-[hash][extname]'
                }
            }
        }
    },
    plugins: [react()]
})
