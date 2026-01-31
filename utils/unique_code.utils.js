import crypto from "crypto";

function createUniqueHash(userIp) {
  return crypto.createHash("sha256").update(userIp).digest("hex");
}

export default createUniqueHash;
