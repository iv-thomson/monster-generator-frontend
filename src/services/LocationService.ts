import { LocationDTO, Location, LocationState } from "@/models"

import { Http } from "./HttpService"

export namespace LocationService {
    const baseUrl = "http://localhost:8080"
    const endpoint = `${baseUrl}/location`

    export const list = (): Promise<Location[]> => Http.getJson<LocationDTO[]>(endpoint).then(Location.from)

    export const create = (creature: LocationState) => Http.postJson(endpoint, creature)

    export const deleteCreature = (id: string) => Http.deleteRequest(`${endpoint}/${id}`)

}