import { connect } from "mongoose"

export const setupDb = async (url: string) => {
  await connect(url)
}
