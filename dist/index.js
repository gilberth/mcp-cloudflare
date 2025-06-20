import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { CloudflareApi } from "./api.js";
import { DnsRecordType } from "./types.js";
// Configuration schema for Smithery
export const configSchema = z.object({
    cloudflareApiToken: z.string().describe("Your Cloudflare API Token with Zone:Edit permissions"),
    cloudflareZoneId: z.string().describe("The Zone ID of your domain in Cloudflare"),
    cloudflareEmail: z.string().optional().describe("Your Cloudflare account email (only needed for legacy API keys)")
});
// Export default function for Smithery
export default function createServer({ config }) {
    const server = new Server({
        name: "mcp-cloudflare",
        version: "1.0.0",
    }, {
        capabilities: {
            tools: {},
        },
    });
    // Helper function to configure API only when needed
    const configureApiIfNeeded = () => {
        try {
            if (config?.cloudflareApiToken && config?.cloudflareZoneId) {
                CloudflareApi.configure(config);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error configuring Cloudflare API:', error);
            return false;
        }
    };
    // Register available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: "list_dns_records",
                    description: "List all DNS records for the configured zone",
                    inputSchema: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "Filter by record name (optional)",
                            },
                            type: {
                                type: "string",
                                enum: ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"],
                                description: "Filter by record type (optional)",
                            },
                        },
                    },
                },
                {
                    name: "get_dns_record",
                    description: "Get a specific DNS record by ID",
                    inputSchema: {
                        type: "object",
                        properties: {
                            recordId: {
                                type: "string",
                                description: "The DNS record ID",
                            },
                        },
                        required: ["recordId"],
                    },
                },
                {
                    name: "create_dns_record",
                    description: "Create a new DNS record",
                    inputSchema: {
                        type: "object",
                        properties: {
                            type: {
                                type: "string",
                                enum: ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"],
                                description: "DNS record type",
                            },
                            name: {
                                type: "string",
                                description: "DNS record name",
                            },
                            content: {
                                type: "string",
                                description: "DNS record content",
                            },
                            ttl: {
                                type: "number",
                                description: "Time to live (TTL) in seconds (default: 1 for auto)",
                                minimum: 1,
                            },
                            priority: {
                                type: "number",
                                description: "Priority (for MX records)",
                            },
                            proxied: {
                                type: "boolean",
                                description: "Whether the record should be proxied through Cloudflare",
                            },
                        },
                        required: ["type", "name", "content"],
                    },
                },
                {
                    name: "update_dns_record",
                    description: "Update an existing DNS record",
                    inputSchema: {
                        type: "object",
                        properties: {
                            recordId: {
                                type: "string",
                                description: "The DNS record ID to update",
                            },
                            type: {
                                type: "string",
                                enum: ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SRV", "CAA", "PTR"],
                                description: "DNS record type",
                            },
                            name: {
                                type: "string",
                                description: "DNS record name",
                            },
                            content: {
                                type: "string",
                                description: "DNS record content",
                            },
                            ttl: {
                                type: "number",
                                description: "Time to live (TTL) in seconds",
                                minimum: 1,
                            },
                            priority: {
                                type: "number",
                                description: "Priority (for MX records)",
                            },
                            proxied: {
                                type: "boolean",
                                description: "Whether the record should be proxied through Cloudflare",
                            },
                        },
                        required: ["recordId"],
                    },
                },
                {
                    name: "delete_dns_record",
                    description: "Delete a DNS record",
                    inputSchema: {
                        type: "object",
                        properties: {
                            recordId: {
                                type: "string",
                                description: "The DNS record ID to delete",
                            },
                        },
                        required: ["recordId"],
                    },
                },
            ],
        };
    });
    // Handle tool calls
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        if (name === "list_dns_records") {
            return await handleListDnsRecords(args);
        }
        if (name === "get_dns_record") {
            return await handleGetDnsRecord(args);
        }
        if (name === "create_dns_record") {
            return await handleCreateDnsRecord(args);
        }
        if (name === "update_dns_record") {
            return await handleUpdateDnsRecord(args);
        }
        if (name === "delete_dns_record") {
            return await handleDeleteDnsRecord(args);
        }
        throw new Error(`Unknown tool: ${name}`);
    });
    // Tool handlers
    const handleListDnsRecords = async (args) => {
        try {
            if (!configureApiIfNeeded()) {
                return {
                    content: [{ type: "text", text: "❌ Configuration incomplete. Please configure Cloudflare API Token and Zone ID first." }],
                };
            }
            const records = await CloudflareApi.findDnsRecords(args.name, args.type);
            if (records.length === 0) {
                return {
                    content: [{ type: "text", text: "No DNS records found matching the criteria." }],
                };
            }
            const recordsText = records.map(record => `🔹 ${record.name} (${record.type}) → ${record.content} [ID: ${record.id}]${record.proxied ? ' 🟠 Proxied' : ''}`).join('\n');
            return {
                content: [{
                        type: "text",
                        text: `✅ Found ${records.length} DNS record(s):\n\n${recordsText}`
                    }],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error listing DNS records: ${error instanceof Error ? error.message : 'Unknown error'}` }],
            };
        }
    };
    const handleGetDnsRecord = async (args) => {
        try {
            if (!configureApiIfNeeded()) {
                return {
                    content: [{ type: "text", text: "❌ Configuration incomplete. Please configure Cloudflare API Token and Zone ID first." }],
                };
            }
            const record = await CloudflareApi.getDnsRecord(args.recordId);
            return {
                content: [{
                        type: "text",
                        text: `✅ DNS Record Details:
🔹 Name: ${record.name}
🔹 Type: ${record.type}
🔹 Content: ${record.content}
🔹 TTL: ${record.ttl}
🔹 Proxied: ${record.proxied ? 'Yes' : 'No'}
${record.priority ? `🔹 Priority: ${record.priority}` : ''}
🔹 ID: ${record.id}
🔹 Created: ${new Date(record.created_on).toLocaleString()}
🔹 Modified: ${new Date(record.modified_on).toLocaleString()}`
                    }],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error getting DNS record: ${error instanceof Error ? error.message : 'Unknown error'}` }],
            };
        }
    };
    const handleCreateDnsRecord = async (args) => {
        try {
            if (!configureApiIfNeeded()) {
                return {
                    content: [{ type: "text", text: "❌ Configuration incomplete. Please configure Cloudflare API Token and Zone ID first." }],
                };
            }
            const recordData = {
                type: DnsRecordType.parse(args.type),
                name: args.name,
                content: args.content,
            };
            if (args.ttl !== undefined)
                recordData.ttl = args.ttl;
            if (args.priority !== undefined)
                recordData.priority = args.priority;
            if (args.proxied !== undefined)
                recordData.proxied = args.proxied;
            const record = await CloudflareApi.createDnsRecord(recordData);
            return {
                content: [{
                        type: "text",
                        text: `✅ DNS record created successfully!
🔹 Name: ${record.name}
🔹 Type: ${record.type}
🔹 Content: ${record.content}
🔹 ID: ${record.id}
${record.proxied ? '🟠 Proxied through Cloudflare' : ''}`
                    }],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error creating DNS record: ${error instanceof Error ? error.message : 'Unknown error'}` }],
            };
        }
    };
    const handleUpdateDnsRecord = async (args) => {
        try {
            if (!configureApiIfNeeded()) {
                return {
                    content: [{ type: "text", text: "❌ Configuration incomplete. Please configure Cloudflare API Token and Zone ID first." }],
                };
            }
            const updates = {};
            if (args.type)
                updates.type = DnsRecordType.parse(args.type);
            if (args.name)
                updates.name = args.name;
            if (args.content)
                updates.content = args.content;
            if (args.ttl !== undefined)
                updates.ttl = args.ttl;
            if (args.priority !== undefined)
                updates.priority = args.priority;
            if (args.proxied !== undefined)
                updates.proxied = args.proxied;
            const record = await CloudflareApi.updateDnsRecord(args.recordId, updates);
            return {
                content: [{
                        type: "text",
                        text: `✅ DNS record updated successfully!
🔹 Name: ${record.name}
🔹 Type: ${record.type}
🔹 Content: ${record.content}
🔹 ID: ${record.id}
${record.proxied ? '🟠 Proxied through Cloudflare' : ''}`
                    }],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error updating DNS record: ${error instanceof Error ? error.message : 'Unknown error'}` }],
            };
        }
    };
    const handleDeleteDnsRecord = async (args) => {
        try {
            if (!configureApiIfNeeded()) {
                return {
                    content: [{ type: "text", text: "❌ Configuration incomplete. Please configure Cloudflare API Token and Zone ID first." }],
                };
            }
            await CloudflareApi.deleteDnsRecord(args.recordId);
            return {
                content: [{
                        type: "text",
                        text: `✅ DNS record deleted successfully! (ID: ${args.recordId})`
                    }],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error deleting DNS record: ${error instanceof Error ? error.message : 'Unknown error'}` }],
            };
        }
    };
    return server;
}
