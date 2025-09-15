/**
 * Simple test script to verify API integration
 * This will test our proxy endpoints to ensure they can connect to the backend
 */

async function testApiEndpoints() {
  const baseUrl = "http://localhost:3001";

  console.log("🧪 Testing Services API Integration...\n");

  // Test endpoints
  const endpoints = [
    { method: "GET", url: "/api/services", description: "Get all services" },
    {
      method: "GET",
      url: "/api/services/active",
      description: "Get active services",
    },
    {
      method: "GET",
      url: "/api/services/by-category/dogs",
      description: "Get services by category",
    },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`🔄 Testing ${endpoint.method} ${endpoint.url}`);
      console.log(`📝 ${endpoint.description}`);

      const response = await fetch(`${baseUrl}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const status = response.status;
      const statusText = response.statusText;

      console.log(`📊 Status: ${status} ${statusText}`);

      if (response.ok) {
        console.log("✅ Success!");
      } else {
        const errorText = await response.text();
        console.log(`❌ Failed: ${errorText}`);
      }

      console.log("━".repeat(50));
    } catch (error) {
      console.log(`❌ Network Error: ${error.message}`);
      console.log("━".repeat(50));
    }
  }

  console.log("🏁 Test completed!");
}

// Run the test
testApiEndpoints();
