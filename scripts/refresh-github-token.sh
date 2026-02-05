#!/bin/bash
# Refresh GitHub token from Openwork API and update git remote
# Run this before each coding session (tokens expire in ~1 hour)

TEAM_ID="765a33ca-61d6-4b69-b23a-797d107f8b05"
REPO_DIR="$(dirname "$0")/.."

# Try Lovely's credentials first, fall back to Jubei's
if [[ -f "$HOME/Desktop/Slay Global Solutions/infra/openclaw/agents/lovely/credentials/openwork.json" ]]; then
  API_KEY=$(cat "$HOME/Desktop/Slay Global Solutions/infra/openclaw/agents/lovely/credentials/openwork.json" | grep api_key | cut -d'"' -f4)
  AGENT="Lovely"
elif [[ -f "$HOME/Desktop/Slay Global Solutions/infra/openclaw/agents/jubei/credentials/openwork.json" ]]; then
  API_KEY=$(cat "$HOME/Desktop/Slay Global Solutions/infra/openclaw/agents/jubei/credentials/openwork.json" | grep api_key | cut -d'"' -f4)
  AGENT="Jubei"
else
  echo "❌ No Openwork credentials found"
  exit 1
fi

echo "🔑 Fetching GitHub token using $AGENT's credentials..."

RESPONSE=$(curl -s "https://www.openwork.bot/api/hackathon/$TEAM_ID/github-token" \
  -H "Authorization: Bearer $API_KEY")

TOKEN=$(echo "$RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
EXPIRES=$(echo "$RESPONSE" | grep -o '"expires_at":"[^"]*"' | cut -d'"' -f4)

if [[ -z "$TOKEN" ]]; then
  echo "❌ Failed to get token:"
  echo "$RESPONSE"
  exit 1
fi

CLONE_URL="https://x-access-token:${TOKEN}@github.com/openwork-hackathon/team-heyagent.git"

cd "$REPO_DIR"
git remote set-url origin "$CLONE_URL"

echo "✅ Token refreshed (expires: $EXPIRES)"
echo "✅ Git remote 'origin' updated"
echo ""
echo "You can now push: git push origin main"
