const { initializeApp, getApps, cert } = require('/home/z/my-project/node_modules/firebase-admin/app');
const { getFirestore } = require('/home/z/my-project/node_modules/firebase-admin/firestore');
const fs = require('fs');
const sa = JSON.parse(fs.readFileSync('/home/z/my-project/.secure/quackforge-sa.json', 'utf8'));
const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(sa) });
const db = getFirestore(app);
db.collection('enquiries').add({
  name: 'Smoke Test',
  email: 'smoke@test.com',
  message: 'Testing Firestore writes from quackforge project',
  created_at: Date.now()
}).then(ref => {
  console.log('OK ID:', ref.id);
  process.exit(0);
}).catch(err => {
  console.log('Firestore error:', err.message);
  process.exit(1);
});
