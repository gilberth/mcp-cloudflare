# MCP Cloudflare DNS Server

A Model Context Protocol server implementation for Cloudflare DNS that enables AI agents to manage DNS records for your domains.

<a href="https://glama.ai/mcp/servers/@gilberth/mcp-cloudflare">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@gilberth/mcp-cloudflare/badge" alt="Cloudflare DNS Server MCP server" />
</a>

## Features

- 🔍 **List DNS records** - View all or filtered DNS records
- 📝 **Create DNS records** - Add new A, AAAA, CNAME, MX, TXT, and other record types  
- ✏️ **Update DNS records** - Modify existing records
- 🗑️ **Delete DNS records** - Remove unwanted records
- 🔧 **Full Cloudflare API support** - Supports proxying, TTL, priority settings

## Setup

### 1. Get Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Zone:Edit" template or create custom token with:
   - Zone:Read
   - Zone:Edit
4. Copy your API token

### 2. Get Zone ID

1. Go to your domain in Cloudflare Dashboard
2. Copy the Zone ID from the right sidebar

## Usage

### With Smithery (Cloud)

Deploy directly to Smithery for hosted access.

### With npx (Local)

```bash
npx -y @thelord/mcp-cloudflare
```

### Environment Variables

Create a `.env` file:

```env
CLOUDFLARE_API_TOKEN=your-api-token-here
CLOUDFLARE_ZONE_ID=your-zone-id-here
CLOUDFLARE_EMAIL=your-email@example.com  # Optional
```

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@thelord/mcp-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-api-token",
        "CLOUDFLARE_ZONE_ID": "your-zone-id"
      }
    }
  }
}
```

## Available Tools

### `list_dns_records`
List all DNS records or filter by name/type.

### `get_dns_record`
Get detailed information about a specific DNS record.

### `create_dns_record`
Create a new DNS record with specified type, name, and content.

### `update_dns_record`
Update an existing DNS record by ID.

### `delete_dns_record`
Delete a DNS record by ID.

## Supported DNS Record Types

- A (IPv4 address)
- AAAA (IPv6 address)  
- CNAME (Canonical name)
- MX (Mail exchange)
- TXT (Text)
- NS (Name server)
- SRV (Service)
- CAA (Certificate Authority Authorization)
- PTR (Pointer)

## Security

- API tokens are never logged or exposed
- Uses official Cloudflare API with secure authentication
- Supports scoped API tokens for minimal permissions

## License

MIT