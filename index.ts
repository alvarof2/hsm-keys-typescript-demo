import { ethers } from "ethers";
import { GcpKmsSigner } from "ethers-gcp-kms-signer";

const kmsCredentialsBase = {
  projectId: "blockchaintestsglobaltestnet",
  locationId: "global",
  keyRingId: "alvaro-test",
  keyVersion: "5",
};
let kmsCredentials = [];
const roles = ["import"];

for (const role of roles) {
  kmsCredentials.push({
    ...kmsCredentialsBase,
    keyId: role,
  });
}

for (const kmsCredential of kmsCredentials) {
  console.log(JSON.stringify(kmsCredential, null, 2));
}

// From ethers, call providers.getDefaultProvider() to get a provider
const provider = new ethers.providers.JsonRpcProvider("https://ethereum-holesky-rpc.publicnode.com");


(async () => {
  for (const kmsCredential of kmsCredentials) {
    let signer = new GcpKmsSigner(kmsCredential);
    signer = signer.connect(provider);
    const address = await signer.getAddress();
    console.log(`Address for ${kmsCredential.keyId}: ${address}`);

    // const tx = await signer.sendTransaction({
    //   to: "0x571ca978F1ACA28445c7d496A6F02B6a12D8a64a",
    //   value: ethers.utils.parseEther("0.0005"),
    // });
    // console.log("Transaction:", tx);
  }

})();
