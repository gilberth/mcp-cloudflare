import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { z } from 'zod';
export declare const configSchema: z.ZodObject<{
    cloudflareApiToken: z.ZodString;
    cloudflareZoneId: z.ZodString;
    cloudflareEmail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cloudflareApiToken: string;
    cloudflareZoneId: string;
    cloudflareEmail?: string | undefined;
}, {
    cloudflareApiToken: string;
    cloudflareZoneId: string;
    cloudflareEmail?: string | undefined;
}>;
export default function createServer({ config }: {
    config: z.infer<typeof configSchema>;
}): Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>;
