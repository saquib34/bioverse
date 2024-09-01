// src/utils/jwtUtils.js

const SECRET_KEY = import.meta.env.VITE_APP_JWT_SECRET;

// Simple base64 encoding/decoding
const base64Encode = (str) => btoa(encodeURIComponent(str));
const base64Decode = (str) => decodeURIComponent(atob(str));

// Simple signing function (this is NOT cryptographically secure)
const sign = (data) => {
  const signature = base64Encode(JSON.stringify(data) + SECRET_KEY);
  return signature;
};

export const generateToken = (userId, isTeamLead) => {
  const payload = {
    userId,
    isTeamLead,
    exp: Date.now() + 3600000 // 1 hour expiration
  };
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64Encode(JSON.stringify(header));
  const encodedPayload = base64Encode(JSON.stringify(payload));
  const signature = sign(encodedHeader + "." + encodedPayload);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const verifyToken = (token) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const recreatedSignature = sign(encodedHeader + "." + encodedPayload);
  
  if (signature !== recreatedSignature) {
    return null;
  }
  
  const payload = JSON.parse(base64Decode(encodedPayload));
  if (payload.exp < Date.now()) {
    return null;
  }
  
  return payload;
};

export const decodeToken = (token) => {
  const [, encodedPayload] = token.split('.');
  return JSON.parse(base64Decode(encodedPayload));
};