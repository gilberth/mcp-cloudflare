import { z } from "zod";
import { CloudflareApiResponse, CreateDnsRecordRequest, UpdateDnsRecordRequest } from "./types.js";
// Configuration for Cloudflare API
let cloudflareConfig = {
    apiToken: '',
    zoneId: '',
    email: ''
};
// Configure API with parameters from Smithery
const configure = (config) => {
    cloudflareConfig.apiToken = config.cloudflareApiToken;
    cloudflareConfig.zoneId = config.cloudflareZoneId;
    cloudflareConfig.email = config.cloudflareEmail;
};
// Fallback for local development with environment variables
const parseEnv = () => {
    const parsed = z
        .object({
        CLOUDFLARE_API_TOKEN: z.string().optional(),
        CLOUDFLARE_ZONE_ID: z.string().optional(),
        CLOUDFLARE_EMAIL: z.string().optional(),
    })
        .safeParse(process.env);
    if (parsed.success && parsed.data.CLOUDFLARE_API_TOKEN && parsed.data.CLOUDFLARE_ZONE_ID) {
        cloudflareConfig.apiToken = parsed.data.CLOUDFLARE_API_TOKEN;
        cloudflareConfig.zoneId = parsed.data.CLOUDFLARE_ZONE_ID;
        cloudflareConfig.email = parsed.data.CLOUDFLARE_EMAIL;
    }
};
// Initialize with environment variables if available
parseEnv();
const getHeaders = () => {
    if (!cloudflareConfig.apiToken) {
        throw new Error("Cloudflare API Token not configured");
    }
    return {
        'Authorization': `Bearer ${cloudflareConfig.apiToken}`,
        'Content-Type': 'application/json',
    };
};
const api = async (endpoint, method = 'GET', body) => {
    if (!cloudflareConfig.zoneId) {
        throw new Error("Cloudflare Zone ID not configured");
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    try {
        const url = `https://api.cloudflare.com/client/v4/zones/${cloudflareConfig.zoneId}/${endpoint}`;
        const response = await fetch(url, {
            method,
            headers: getHeaders(),
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
        }
        return response;
    }
    catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Cloudflare API request timed out');
            }
            throw new Error(`Cloudflare API error: ${error.message}`);
        }
        throw error;
    }
};
export const CloudflareApi = {
    configure,
    // List all DNS records
    listDnsRecords: async () => {
        const response = await api('dns_records');
        const data = CloudflareApiResponse.parse(await response.json());
        if (!data.success) {
            throw new Error(`API Error: ${data.errors.map(e => e.message).join(', ')}`);
        }
        if (!data.result || !Array.isArray(data.result)) {
            return [];
        }
        return data.result;
    },
    // Get a specific DNS record by ID
    getDnsRecord: async (recordId) => {
        const response = await api(`dns_records/${recordId}`);
        const data = CloudflareApiResponse.parse(await response.json());
        if (!data.success) {
            throw new Error(`API Error: ${data.errors.map(e => e.message).join(', ')}`);
        }
        if (!data.result || Array.isArray(data.result)) {
            throw new Error('DNS record not found');
        }
        return data.result;
    },
    // Create a new DNS record
    createDnsRecord: async (record) => {
        const validatedRecord = CreateDnsRecordRequest.parse(record);
        const response = await api('dns_records', 'POST', validatedRecord);
        const data = CloudflareApiResponse.parse(await response.json());
        if (!data.success) {
            throw new Error(`API Error: ${data.errors.map(e => e.message).join(', ')}`);
        }
        if (!data.result || Array.isArray(data.result)) {
            throw new Error('Failed to create DNS record');
        }
        return data.result;
    },
    // Update an existing DNS record
    updateDnsRecord: async (recordId, updates) => {
        const validatedUpdates = UpdateDnsRecordRequest.parse(updates);
        const response = await api(`dns_records/${recordId}`, 'PUT', validatedUpdates);
        const data = CloudflareApiResponse.parse(await response.json());
        if (!data.success) {
            throw new Error(`API Error: ${data.errors.map(e => e.message).join(', ')}`);
        }
        if (!data.result || Array.isArray(data.result)) {
            throw new Error('Failed to update DNS record');
        }
        return data.result;
    },
    // Delete a DNS record
    deleteDnsRecord: async (recordId) => {
        const response = await api(`dns_records/${recordId}`, 'DELETE');
        const data = CloudflareApiResponse.parse(await response.json());
        if (!data.success) {
            throw new Error(`API Error: ${data.errors.map(e => e.message).join(', ')}`);
        }
    },
    // Find DNS records by name and/or type
    findDnsRecords: async (name, type) => {
        let endpoint = 'dns_records';
        const params = new URLSearchParams();
        if (name)
            params.append('name', name);
        if (type)
            params.append('type', type);
        if (params.toString()) {
            endpoint += `?${params.toString()}`;
        }
        const response = await api(endpoint);
        const data = CloudflareApiResponse.parse(await response.json());
        if (!data.success) {
            throw new Error(`API Error: ${data.errors.map(e => e.message).join(', ')}`);
        }
        if (!data.result || !Array.isArray(data.result)) {
            return [];
        }
        return data.result;
    },
};
