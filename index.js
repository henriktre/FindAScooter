const inquirer = require("inquirer");
const createEnturService = require("@entur/sdk").default;
const service = createEnturService({ clientName: "scootiscoot" });
console.log("find me a scooter app 0.0.0.1 alpha");
let find = "find closest scooter";
let exit = "exit app";
async function findScooter() {
  try {
    const scooters = await service.getScootersByPosition({
      latitude: 59.908812,
      longitude: 10.745687,
      limit: 1,
    });
    let s = scooters[0];
    let bat;
    if (s.battery === undefined) s.battery = s.batteryLevel;
    console.log(
      `Operator: ${s.operator}
Battery: ${s.battery}
Lat: ${s.lat}
Long: ${s.lon}
`
    );
  } catch (error) {
    console.error(error);
  }
}
inquirer
  .prompt([
    {
      type: "list",
      message: "Choose what you want to do",
      name: "choice",
      choices: [find, exit],
    },
  ])
  .then(({ choice }) => {
    if (choice === find) {
      findScooter();
    }
  })
  .catch((error) => {
    console.error(error);
  });
