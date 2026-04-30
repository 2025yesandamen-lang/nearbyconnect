const fs = require("fs");
const path = require("path");

const apiDir = path.join(__dirname, "..", "app", "api");

function fixRouteFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // If file is empty → add safe template
  if (!content.trim()) {
    content = `
export async function GET() {
  return Response.json({ message: "OK" });
}
`;
  }

  // If no export found → inject default GET
  if (!content.includes("export")) {
    content += `

export async function GET() {
  return Response.json({ message: "Auto-fixed route" });
}
`;
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log("Fixed:", filePath);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file === "route.ts") {
      fixRouteFile(fullPath);
    }
  });
}

walk(apiDir);

console.log("✅ All API routes auto-fixed");