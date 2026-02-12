const bcrypt = require('bcryptjs');

async function run() {
  const pin = '0000'; // тут задайте ПИН, который хотите
  const hash = await bcrypt.hash(pin, 10);
  console.log('PIN:', pin);
  console.log('HASH:', hash);
}

run().catch(console.error);