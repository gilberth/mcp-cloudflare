import { type DnsRecord, type CreateDnsRecord, type UpdateDnsRecord } from "./types.js";
export declare const CloudflareApi: {
    configure: (config: {
        cloudflareApiToken: string;
        cloudflareZoneId: string;
        cloudflareEmail?: string;
    }) => void;
    listDnsRecords: () => Promise<DnsRecord[]>;
    getDnsRecord: (recordId: string) => Promise<DnsRecord>;
    createDnsRecord: (record: CreateDnsRecord) => Promise<DnsRecord>;
    updateDnsRecord: (recordId: string, updates: UpdateDnsRecord) => Promise<DnsRecord>;
    deleteDnsRecord: (recordId: string) => Promise<void>;
    findDnsRecords: (name?: string, type?: string) => Promise<DnsRecord[]>;
};
