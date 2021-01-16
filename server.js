const consola = require("consola");
const fs = require("fs");

const generator = require("./generator");

consola.LogLevel = 4;

const main = () => {
  const mode = "dev";
  const data = generator(mode);

  consola.success("Generation completed. Populating latest json into db.json");

  fs.writeFile(
    mode === "dev" ? "dev_db.json" : "db.json",
    JSON.stringify(data),
    "utf8",
    () => consola.success("db.json populated!")
  );
};

main();
