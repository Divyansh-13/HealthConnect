const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if firebase-tools is installed
try {
  execSync('firebase --version', { stdio: 'ignore' });
  console.log('Firebase CLI is installed, proceeding...');
} catch (e) {
  console.error('Firebase CLI is not installed. Please install it with: npm install -g firebase-tools');
  process.exit(1);
}

// Check if user is logged in to Firebase
try {
  execSync('firebase projects:list', { stdio: 'ignore' });
  console.log('You are logged in to Firebase CLI');
} catch (e) {
  console.error('You are not logged in to Firebase CLI. Please run: firebase login');
  process.exit(1);
}

// Deploy Firestore rules
console.log('Deploying Firestore rules...');
try {
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  console.log('Firestore rules deployed successfully');
} catch (e) {
  console.error('Failed to deploy Firestore rules:', e.message);
  process.exit(1);
}

console.log('All done! Your Firestore rules have been updated.');
