export interface Apidata {
    loc:string,
    confirmedCasesIndian: number,
    discharged: number,
    deaths: number,
    confirmedCasesForeign: number,
    totalConfirmed: number   
}
export interface ApiStateData{
    day:string,
    statewise: [
            {
                active: number,
                confirmed: number,
                deaths: number,
                recovered: number,
                state: string
            }
            
        ]
}