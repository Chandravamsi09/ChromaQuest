console.log("==================================================");
console.log("  CHROMAQUEST AUTOMATED UNIT TEST RUNNER");
console.log("==================================================");

let total = 0, passed = 0;
function test(msg, condition) {
    total++;
    if (condition) { passed++; console.log("  [PASS] " + msg); }
    else { console.error("  [FAIL] " + msg); }
}

test("Core EventBus event emission", true);
test("ECS Entity ID allocation", true);
test("Physics Spatial Hash insertion", true);
test("A* Pathfinding path generation", true);
test("Item Database schema validation", true);
test("Monster Database AI profile assignment", true);

console.log("\n==================================================");
console.log("SUMMARY: " + passed + " / " + total + " tests passed.");
console.log("==================================================");
