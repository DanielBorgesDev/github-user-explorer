import { z } from 'zod'

const EnvSchema = z.object({
  VITE_GITHUB_API: z.string().url().default('https://api.github.com'),
  VITE_REQUEST_TIMEOUT_MS: z.coerce.number().default(15000),
})

export type Env = z.infer<typeof EnvSchema>

declare global {
  interface ImportMeta {
    readonly env: Record<string, unknown>;
  }
}

export const env: Env = EnvSchema.parse(import.meta.env)
