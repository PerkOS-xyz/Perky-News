import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
  readFileSync('/root/.config/firebase/perky-news-sa.json', 'utf8')
);

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const token = (await admin.credential.cert(serviceAccount).getAccessToken()).access_token;
const projectId = 'perky-news';

const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{articleId} {
      allow read: if true;
      allow write: if false;
    }
    match /topics/{topicId} {
      allow read: if true;
      allow write: if false;
    }
    match /settings/{doc} {
      allow read: if true;
      allow write: if false;
    }
  }
}`;

// Create ruleset
const rulesetRes = await fetch(
  `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source: { files: [{ name: 'firestore.rules', content: rules }] }
    })
  }
);
const ruleset = await rulesetRes.json();
console.log('Created ruleset:', ruleset.name);

// Delete existing release and create new one
console.log('Creating new release...');
const createRes = await fetch(
  `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `projects/${projectId}/releases/cloud.firestore`,
      rulesetName: ruleset.name
    })
  }
);

const text = await createRes.text();
console.log('Status:', createRes.status);

if (createRes.status === 409) {
  console.log('Release already exists, trying PUT...');
  const putRes = await fetch(
    `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases/cloud.firestore`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `projects/${projectId}/releases/cloud.firestore`,
        rulesetName: ruleset.name
      })
    }
  );
  console.log('PUT Status:', putRes.status);
  const putText = await putRes.text();
  if (putRes.ok) {
    console.log('✅ Rules deployed via PUT!');
  } else {
    console.log('PUT Response:', putText.substring(0, 500));
  }
} else if (createRes.ok) {
  console.log('✅ Rules deployed via POST!');
} else {
  console.log('Response:', text);
}

process.exit(0);
