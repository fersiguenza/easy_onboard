// Authentication configuration and providers
export type AuthProvider = 'none' | 'simple' | 'cognito' | 'azure' | 'google';

export interface AuthConfig {
  provider: AuthProvider;
  requireAuth: boolean;
  protectWelcome: boolean;
  adminOnly: boolean;
}

export interface CognitoConfig {
  userPoolId: string;
  clientId: string;
  region: string;
  domain?: string;
  adminGroupName?: string; // Cognito group for admin users
}

export interface AzureConfig {
  clientId: string;
  authority: string;
  redirectUri: string;
  adminGroupId?: string; // Azure AD group for admin users
}

export interface GoogleConfig {
  clientId: string;
  redirectUri: string;
  adminDomain?: string; // Domain for admin users (e.g., "admin.company.com")
}

export interface SimpleAuthConfig {
  // Regular user credentials
  userUsername: string;
  userPassword: string;
  // Admin credentials
  adminUsername: string;
  adminPassword: string;
}

// Get authentication configuration from environment variables
export function getAuthConfig(): AuthConfig {
  const provider = (process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'none') as AuthProvider;
  const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH === 'true';
  const protectWelcome = process.env.NEXT_PUBLIC_PROTECT_WELCOME === 'true';
  const adminOnly = process.env.NEXT_PUBLIC_ADMIN_ONLY === 'true';

  return {
    provider,
    requireAuth,
    protectWelcome,
    adminOnly,
  };
}

// Get provider-specific configuration
export function getCognitoConfig(): CognitoConfig | null {
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION;

  if (!userPoolId || !clientId || !region) return null;

  return {
    userPoolId,
    clientId,
    region,
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    adminGroupName: process.env.NEXT_PUBLIC_COGNITO_ADMIN_GROUP || 'Administrators',
  };
}

export function getAzureConfig(): AzureConfig | null {
  const clientId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID;
  const authority = process.env.NEXT_PUBLIC_AZURE_AUTHORITY;
  const redirectUri = process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI;

  if (!clientId || !authority || !redirectUri) return null;

  return {
    clientId,
    authority,
    redirectUri,
    adminGroupId: process.env.NEXT_PUBLIC_AZURE_ADMIN_GROUP_ID,
  };
}

export function getGoogleConfig(): GoogleConfig | null {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) return null;

  return {
    clientId,
    redirectUri,
    adminDomain: process.env.NEXT_PUBLIC_GOOGLE_ADMIN_DOMAIN,
  };
}

export function getSimpleAuthConfig(): SimpleAuthConfig | null {
  const userUsername = process.env.NEXT_PUBLIC_USER_USERNAME;
  const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  if (!userUsername || !userPassword || !adminUsername || !adminPassword) return null;

  return {
    userUsername,
    userPassword,
    adminUsername,
    adminPassword,
  };
}
