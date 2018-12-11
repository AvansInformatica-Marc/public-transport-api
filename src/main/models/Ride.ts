import { ID } from "./db/ID";

export default interface Ride {
    operator: ID // NS, Qbuzz
    type: string // Sprinter, R-NET, R-NET stoptrein, StadsBuzz
    train?: ID[]
    bus?: ID
    line?: string // 8, 491
    stops: { 
        stop: ID // Sliedrecht Baanhoek, Station Dordrecht
        platform?: string // 15, 4b, P
        arrivalAfter?: number // Time between this and previous stop
        waitingTime?: number // Amount of minutes the train or bus waits before departure
    }[],
    excludeDays: (0 | 1 | 2 | 3 | 4 | 5 | 6)[], // ex. sunday
    departures: string[] // 07:58, 08:28, 08:58, 09:28, 09:58
}