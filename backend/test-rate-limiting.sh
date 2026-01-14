#!/bin/bash

# Test Rate Limiting Implementation
# This script tests the rate limiting on auth endpoints

echo "🧪 Testing Rate Limiting Implementation"
echo "========================================"
echo ""

BASE_URL="http://localhost:3000"

echo "📝 Test 1: Login endpoint rate limit (5 requests per minute)"
echo "Sending 7 rapid login requests (should block after 5)..."
echo ""

for i in {1..7}; do
  echo -n "Request $i: "
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrongpassword"}' \
    "$BASE_URL/auth/login" 2>&1)
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  
  if [ "$HTTP_CODE" = "429" ]; then
    echo "✅ BLOCKED (HTTP 429 - Too Many Requests)"
  elif [ "$HTTP_CODE" = "401" ]; then
    echo "✅ ALLOWED (HTTP 401 - Invalid credentials as expected)"
  else
    echo "⚠️  HTTP $HTTP_CODE"
  fi
  
  sleep 0.2
done

echo ""
echo "📝 Test 2: Signup endpoint rate limit (3 requests per minute)"
echo "Sending 5 rapid signup requests (should block after 3)..."
echo ""

for i in {1..5}; do
  echo -n "Request $i: "
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@test.com\",\"password\":\"password123\",\"name\":\"Test User\"}" \
    "$BASE_URL/auth/signup" 2>&1)
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  
  if [ "$HTTP_CODE" = "429" ]; then
    echo "✅ BLOCKED (HTTP 429 - Too Many Requests)"
  elif [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "409" ]; then
    echo "✅ ALLOWED (HTTP $HTTP_CODE)"
  else
    echo "⚠️  HTTP $HTTP_CODE"
  fi
  
  sleep 0.2
done

echo ""
echo "========================================"
echo "✅ Rate limiting test completed!"
echo ""
echo "Expected results:"
echo "- Login: First 5 requests should be allowed (401/successful), 6th+ blocked (429)"
echo "- Signup: First 3 requests should be allowed (201/409), 4th+ blocked (429)"
echo ""
echo "If you see 429 errors, rate limiting is working! 🎉"
