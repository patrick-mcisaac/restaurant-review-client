import { execSync } from 'child_process';

export default async function globalTeardown() {
  execSync('rm test_db.sqlite3', {
    cwd: '../restaurant-review-api',
    stdio: 'inherit',
  });
  execSync('pkill -f "next-dev"', {stdio: 'inherit'})
  execSync('pkill -f "manage.py runserver"', {stdio: 'inherit'})
}