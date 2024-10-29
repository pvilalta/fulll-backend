import { DataSource } from "typeorm";
import { Before } from "@cucumber/cucumber";

import { ActionBus } from "../src/app";
import { bootstrap } from "../src/bootstrap";
import { dataSourceConfig } from "../ormconfig";

export let queryBus: ActionBus;
export let commandBus: ActionBus;

Before(async function () {
  const appDataSource = new DataSource({
    ...dataSourceConfig,
    database: ":memory:"
  });
  await appDataSource.initialize();

  const { queryBus: qb, commandBus: cb } = bootstrap(appDataSource);

  queryBus = qb;
  commandBus = cb;
});
