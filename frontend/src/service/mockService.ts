import { createServer, Model, Factory } from "miragejs";
import { IGroup, IShop, IItem } from '../types/objectTypes'



export function MockServer({ environment = "development" }) {
  return createServer({
    environment,

    factories: {
    },

    models: {
      group: Model.extend<Partial<IGroup>>({}),
      shop: Model.extend<Partial<IShop>>({}),
      item: Model.extend<Partial<IItem>>({})
    },

    seeds(server) {
      server.create("group", { id : "group1", shop : { id : "shop 5", name : "name of shop 5", menuImg : "base64 of menu image"}});
      server.create("group", { id : "group2", shop : { id : "shop 12", name : "name of shop 12", menuImg : "base64 of menu image"}});
      server.create("item", {id : "item1", groupId : "group1", name : "name of item1", number : 1, price : 50})
      server.create("item", {id : "item2", groupId : "group1", name : "name of item2", number : 2, price : 51})
      server.create("item", {id : "item3", groupId : "group2", name : "name of item3", number : 3, price : 52})
    },

    routes() {
      this.get("/groups", (schema, request) => {
        return schema.all('group')
      });

      this.get("/shops", (schema, request) => {
        return schema.all('shop')
      });

      this.get("/items", (schema, request) => {
        let id = request.queryParams.groupId
        return schema.where('item', {groupId : id})
      });
    },

  });
}