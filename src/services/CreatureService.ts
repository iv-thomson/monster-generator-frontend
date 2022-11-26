import { CreatureDTO } from "../models"
import { Creature, CreatureState } from "../models/Creature"
import { Http } from "./HttpService"

export namespace CreatureService {
    const baseUrl = "http://localhost:8080"
    const endpoint = `${baseUrl}/creature`

    export const list = (): Promise<Creature[]> => Http.getJson<CreatureDTO[]>(endpoint).then(Creature.from)

    export const create = (creature: CreatureState) => Http.postJson(endpoint, creature)

    export const deleteCreature = (id: string) => Http.deleteRequest(`${endpoint}/${id}`)

}