import "server-only";

import { readFileSync } from "node:fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

function normalizePrivateKey(key: string): string {
  return key.replace(/\\n/g, "\n");
}

function loadServiceAccount(): ServiceAccount {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  let raw: string | null = null;

  if (json) {
    raw = json;
  } else if (base64) {
    raw = Buffer.from(base64, "base64").toString("utf8");
  } else if (serviceAccountPath) {
    raw = readFileSync(serviceAccountPath, "utf8");
  }

  if (!raw) {
    throw new Error(
      "Missing Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_JSON, FIREBASE_SERVICE_ACCOUNT_BASE64, or FIREBASE_SERVICE_ACCOUNT_PATH.",
    );
  }

  try {
    const serviceAccount = JSON.parse(raw) as ServiceAccount;
    return {
      ...serviceAccount,
      private_key: normalizePrivateKey(serviceAccount.private_key),
    };
  } catch (error) {
    throw new Error(
      "Invalid Firebase service account JSON. Verify FIREBASE_SERVICE_ACCOUNT_JSON, FIREBASE_SERVICE_ACCOUNT_BASE64, or FIREBASE_SERVICE_ACCOUNT_PATH.",
    );
  }
}

export function getAdminDb() {
  if (!getApps().length) {
    const serviceAccount = loadServiceAccount();
    initializeApp({
      credential: cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
    });
  }

  return getFirestore();
}
