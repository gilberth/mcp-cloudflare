#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import createServer from './index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get config from environment variables
const config = {
  cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN || '',
  cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID || '',
  cloudflareEmail: process.env.CLOUDFLARE_EMAIL || ''
};

// Validate required config
if (!config.cloudflareApiToken || !config.cloudflareZoneId) {
  console.error('❌ Missing required environment variables:');
  console.error('   CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID');
  console.error('');
  console.error('📝 Create a .env file with:');
  console.error('   CLOUDFLARE_API_TOKEN=your-api-token');
  console.error('   CLOUDFLARE_ZONE_ID=your-zone-id');
  console.error('   CLOUDFLARE_EMAIL=your-email@example.com  # Optional');
  console.error('');
  console.error('🔑 Get your API token at: https://dash.cloudflare.com/profile/api-tokens');
  console.error('🆔 Find your Zone ID in the Cloudflare dashboard for your domain');
  process.exit(1);
}

const server = createServer({ config });

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🚀 Cloudflare MCP Server running locally');
}

main().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});