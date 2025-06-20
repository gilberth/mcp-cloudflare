import { z } from "zod";
export declare const DnsRecordType: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"]>;
export declare const CloudflareDnsRecord: z.ZodObject<{
    id: z.ZodString;
    zone_id: z.ZodString;
    zone_name: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"]>;
    content: z.ZodString;
    proxied: z.ZodOptional<z.ZodBoolean>;
    ttl: z.ZodNumber;
    priority: z.ZodOptional<z.ZodNumber>;
    created_on: z.ZodString;
    modified_on: z.ZodString;
    meta: z.ZodOptional<z.ZodObject<{
        auto_added: z.ZodOptional<z.ZodBoolean>;
        managed_by_apps: z.ZodOptional<z.ZodBoolean>;
        managed_by_argo_tunnel: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        auto_added?: boolean | undefined;
        managed_by_apps?: boolean | undefined;
        managed_by_argo_tunnel?: boolean | undefined;
    }, {
        auto_added?: boolean | undefined;
        managed_by_apps?: boolean | undefined;
        managed_by_argo_tunnel?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    zone_id: string;
    zone_name: string;
    name: string;
    type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
    content: string;
    ttl: number;
    created_on: string;
    modified_on: string;
    proxied?: boolean | undefined;
    priority?: number | undefined;
    meta?: {
        auto_added?: boolean | undefined;
        managed_by_apps?: boolean | undefined;
        managed_by_argo_tunnel?: boolean | undefined;
    } | undefined;
}, {
    id: string;
    zone_id: string;
    zone_name: string;
    name: string;
    type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
    content: string;
    ttl: number;
    created_on: string;
    modified_on: string;
    proxied?: boolean | undefined;
    priority?: number | undefined;
    meta?: {
        auto_added?: boolean | undefined;
        managed_by_apps?: boolean | undefined;
        managed_by_argo_tunnel?: boolean | undefined;
    } | undefined;
}>;
export declare const CloudflareApiResponse: z.ZodObject<{
    success: z.ZodBoolean;
    errors: z.ZodArray<z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
    }, {
        code: number;
        message: string;
    }>, "many">;
    messages: z.ZodArray<z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
    }, {
        code: number;
        message: string;
    }>, "many">;
    result: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        zone_id: z.ZodString;
        zone_name: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"]>;
        content: z.ZodString;
        proxied: z.ZodOptional<z.ZodBoolean>;
        ttl: z.ZodNumber;
        priority: z.ZodOptional<z.ZodNumber>;
        created_on: z.ZodString;
        modified_on: z.ZodString;
        meta: z.ZodOptional<z.ZodObject<{
            auto_added: z.ZodOptional<z.ZodBoolean>;
            managed_by_apps: z.ZodOptional<z.ZodBoolean>;
            managed_by_argo_tunnel: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        }, {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    }, {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    }>, "many">, z.ZodObject<{
        id: z.ZodString;
        zone_id: z.ZodString;
        zone_name: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"]>;
        content: z.ZodString;
        proxied: z.ZodOptional<z.ZodBoolean>;
        ttl: z.ZodNumber;
        priority: z.ZodOptional<z.ZodNumber>;
        created_on: z.ZodString;
        modified_on: z.ZodString;
        meta: z.ZodOptional<z.ZodObject<{
            auto_added: z.ZodOptional<z.ZodBoolean>;
            managed_by_apps: z.ZodOptional<z.ZodBoolean>;
            managed_by_argo_tunnel: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        }, {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    }, {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    }>, z.ZodNull]>>;
    result_info: z.ZodOptional<z.ZodObject<{
        page: z.ZodNumber;
        per_page: z.ZodNumber;
        count: z.ZodNumber;
        total_count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        page: number;
        per_page: number;
        count: number;
        total_count: number;
    }, {
        page: number;
        per_page: number;
        count: number;
        total_count: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    errors: {
        code: number;
        message: string;
    }[];
    messages: {
        code: number;
        message: string;
    }[];
    result?: {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    } | {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    }[] | null | undefined;
    result_info?: {
        page: number;
        per_page: number;
        count: number;
        total_count: number;
    } | undefined;
}, {
    success: boolean;
    errors: {
        code: number;
        message: string;
    }[];
    messages: {
        code: number;
        message: string;
    }[];
    result?: {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    } | {
        id: string;
        zone_id: string;
        zone_name: string;
        name: string;
        type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
        content: string;
        ttl: number;
        created_on: string;
        modified_on: string;
        proxied?: boolean | undefined;
        priority?: number | undefined;
        meta?: {
            auto_added?: boolean | undefined;
            managed_by_apps?: boolean | undefined;
            managed_by_argo_tunnel?: boolean | undefined;
        } | undefined;
    }[] | null | undefined;
    result_info?: {
        page: number;
        per_page: number;
        count: number;
        total_count: number;
    } | undefined;
}>;
export declare const CreateDnsRecordRequest: z.ZodObject<{
    type: z.ZodEnum<["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"]>;
    name: z.ZodString;
    content: z.ZodString;
    ttl: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    priority: z.ZodOptional<z.ZodNumber>;
    proxied: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
    content: string;
    ttl: number;
    proxied?: boolean | undefined;
    priority?: number | undefined;
}, {
    name: string;
    type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR";
    content: string;
    proxied?: boolean | undefined;
    ttl?: number | undefined;
    priority?: number | undefined;
}>;
export declare const UpdateDnsRecordRequest: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"]>>;
    name: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    ttl: z.ZodOptional<z.ZodNumber>;
    priority: z.ZodOptional<z.ZodNumber>;
    proxied: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR" | undefined;
    content?: string | undefined;
    proxied?: boolean | undefined;
    ttl?: number | undefined;
    priority?: number | undefined;
}, {
    name?: string | undefined;
    type?: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS" | "SRV" | "CAA" | "PTR" | undefined;
    content?: string | undefined;
    proxied?: boolean | undefined;
    ttl?: number | undefined;
    priority?: number | undefined;
}>;
export type DnsRecord = z.infer<typeof CloudflareDnsRecord>;
export type DnsRecordTypeEnum = z.infer<typeof DnsRecordType>;
export type ApiResponse = z.infer<typeof CloudflareApiResponse>;
export type CreateDnsRecord = z.infer<typeof CreateDnsRecordRequest>;
export type UpdateDnsRecord = z.infer<typeof UpdateDnsRecordRequest>;
