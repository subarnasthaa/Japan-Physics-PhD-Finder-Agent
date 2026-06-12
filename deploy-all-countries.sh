#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Deploy All 5 Country Physics PhD Finders to Vercel
# ─────────────────────────────────────────────────────────────
# 
# Usage: VERCEL_TOKEN=your_token_here bash deploy-all-countries.sh
#
# Get your Vercel token from: https://vercel.com/account/tokens
#
# This script will:
# 1. Create a Vercel project for each country
# 2. Link it to the corresponding GitHub repo
# 3. Trigger the first deployment
#
# Prerequisites:
# - Vercel CLI installed (npm i -g vercel)
# - VERCEL_TOKEN environment variable set
# ─────────────────────────────────────────────────────────────

set -e

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ Error: VERCEL_TOKEN not set"
  echo "Get your token from: https://vercel.com/account/tokens"
  echo "Usage: VERCEL_TOKEN=your_token bash deploy-all-countries.sh"
  exit 1
fi

COUNTRIES=(
  "Germany-Physics-PhD-Finder-Agent"
  "Japan-Physics-PhD-Finder-Agent"
  "UK-Physics-PhD-Finder-Agent"
  "Australia-Physics-PhD-Finder-Agent"
  "NewZealand-Physics-PhD-Finder-Agent"
)

GITHUB_USER="subarnasthaa"
TEMP_DIR="/tmp/phd-finder-deploy"

echo "🚀 Deploying 5 Country Physics PhD Finders to Vercel"
echo "===================================================="
echo ""

# Create temp directory
mkdir -p "$TEMP_DIR"

for COUNTRY in "${COUNTRIES[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📦 Deploying: $COUNTRY"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Clone the repo
  REPO_DIR="$TEMP_DIR/$COUNTRY"
  if [ -d "$REPO_DIR" ]; then
    echo "✓ Repo already cloned, pulling latest..."
    cd "$REPO_DIR" && git pull
  else
    echo "⬇️  Cloning from GitHub..."
    git clone "https://github.com/$GITHUB_USER/$COUNTRY.git" "$REPO_DIR"
  fi
  
  cd "$REPO_DIR"
  
  # Remove any existing Vercel project link
  rm -rf .vercel
  
  # Deploy to Vercel
  echo "🚀 Deploying to Vercel..."
  vercel deploy --prod --yes --token "$VERCEL_TOKEN"
  
  echo ""
  echo "✅ $COUNTRY deployed!"
  echo ""
done

echo ""
echo "===================================================="
echo "🎉 All 5 countries deployed to Vercel!"
echo "===================================================="
echo ""
echo "Visit your Vercel dashboard to see all deployments:"
echo "https://vercel.com/dashboard"
echo ""

# Cleanup
echo "Cleaning up temp files..."
rm -rf "$TEMP_DIR"
echo "✅ Done!"
