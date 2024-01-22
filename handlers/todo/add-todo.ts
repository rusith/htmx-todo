import { get } from "helpers/handler";

export const handler = () => 
  get("/todos", async ({ renderPartial }, req) => {
    return renderPartial("components/todo-modal")
  })

export default handler;