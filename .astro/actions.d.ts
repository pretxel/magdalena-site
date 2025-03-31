declare module "astro:actions" {
	type Actions = typeof import("/Users/edselserrano/Projects/personal/psicoterapeuta-magdalena/src/actions/index.ts")["server"];

	export const actions: Actions;
}