import { execSync } from 'child_process';

export default async function globalSetup() {
  execSync('bash seed_test_db.sh', {
    cwd: '../restaurant-review-api',
    stdio: 'inherit',
  });
}