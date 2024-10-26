import { sassPlugin } from 'esbuild-sass-plugin';

esbuild
	.build({
		entryPoints: ['./src/main.ts'],
		bundle: true,
		outdir: 'dist',
		plugins: [
			sassPlugin({
				includePaths: ['./node_modules'],
			}),
		],
		loader: { '.scss': 'css' },
	})
	.catch(() => process.exit(1));
