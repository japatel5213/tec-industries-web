import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ENV_PATH = path.join(process.cwd(), '.env.local');

// Helper to read .env.local and parse into a JSON object
function readEnv() {
  const config: Record<string, string> = {};
  if (!fs.existsSync(ENV_PATH)) {
    return config;
  }
  const content = fs.readFileSync(ENV_PATH, 'utf-8');
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, val] = trimmed.split('=', 2);
      config[key.trim()] = val.trim();
    }
  }
  return config;
}

// Helper to write JSON object back into .env.local
function writeEnv(newConfig: Record<string, string>) {
  let content = '';
  
  // Keep track of which keys we've already written
  const writtenKeys = new Set<string>();

  // If the file exists, preserve comments and structure where possible
  if (fs.existsSync(ENV_PATH)) {
    const lines = fs.readFileSync(ENV_PATH, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        content += line + '\n';
        continue;
      }
      if (trimmed.includes('=')) {
        const [key] = trimmed.split('=', 2);
        const trimmedKey = key.trim();
        if (trimmedKey in newConfig) {
          content += `${trimmedKey}=${newConfig[trimmedKey]}\n`;
          writtenKeys.add(trimmedKey);
        } else {
          content += line + '\n';
        }
      } else {
        content += line + '\n';
      }
    }
  }

  // Append any new keys that weren't in the original file
  for (const [key, val] of Object.entries(newConfig)) {
    if (!writtenKeys.has(key)) {
      content += `${key}=${val}\n`;
    }
  }

  fs.writeFileSync(ENV_PATH, content.trim() + '\n', 'utf-8');
}

export async function GET(request: NextRequest) {
  try {
    const config = readEnv();
    // Expose only safe and necessary keys for management
    return NextResponse.json({
      success: true,
      config: {
        WHATSAPP_ACCESS_TOKEN: config.WHATSAPP_ACCESS_TOKEN || '',
        WHATSAPP_PHONE_NUMBER_ID: config.WHATSAPP_PHONE_NUMBER_ID || '',
        WHATSAPP_WABA_ID: config.WHATSAPP_WABA_ID || '',
        ZOHO_CLIENT_ID: config.ZOHO_CLIENT_ID || '',
        ZOHO_CLIENT_SECRET: config.ZOHO_CLIENT_SECRET || '',
        ZOHO_REFRESH_TOKEN: config.ZOHO_REFRESH_TOKEN || '',
        RAJESH_PHONE_NUMBER: config.RAJESH_PHONE_NUMBER || ''
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const currentConfig = readEnv();
    
    // Merge new updates
    const updatedConfig = {
      ...currentConfig,
      ...body
    };

    writeEnv(updatedConfig);
    console.log('[Admin Config API] Updated .env.local config values:', Object.keys(body));
    
    return NextResponse.json({ success: true, message: 'Configuration updated successfully.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
