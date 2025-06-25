import { z } from "zod";
// Cloudflare DNS Record types
export const DnsRecordType = z.enum([
    "A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"
]);
export const CloudflareDnsRecord = z.object({
    id: z.string(),
    zone_id: z.string().optional(),
    zone_name: z.string().optional(),
    name: z.string(),
    type: DnsRecordType,
    content: z.string(),
    proxied: z.boolean().optional(),
    ttl: z.number(),
    priority: z.number().optional(),
    created_on: z.string(),
    modified_on: z.string(),
    meta: z.object({
        auto_added: z.boolean().optional(),
        managed_by_apps: z.boolean().optional(),
        managed_by_argo_tunnel: z.boolean().optional(),
    }).optional(),
});
export const CloudflareApiResponse = z.object({
    success: z.boolean(),
    errors: z.array(z.object({
        code: z.number(),
        message: z.string(),
    })),
    messages: z.array(z.object({
        code: z.number(),
        message: z.string(),
    })),
    result: z.union([
        z.array(CloudflareDnsRecord),
        CloudflareDnsRecord,
        z.null(),
    ]).optional(),
    result_info: z.object({
        page: z.number(),
        per_page: z.number(),
        count: z.number(),
        total_count: z.number(),
    }).optional(),
});
export const CreateDnsRecordRequest = z.object({
    type: DnsRecordType,
    name: z.string(),
    content: z.string(),
    ttl: z.number().optional().default(1),
    priority: z.number().optional(),
    proxied: z.boolean().optional(),
});
export const UpdateDnsRecordRequest = z.object({
    type: DnsRecordType.optional(),
    name: z.string().optional(),
    content: z.string().optional(),
    ttl: z.number().optional(),
    priority: z.number().optional(),
    proxied: z.boolean().optional(),
});
