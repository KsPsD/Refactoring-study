export type playValue={
    name:string,
    type:string,

}
export type play={
    [key:string]:playValue
}


export default  { 
    "hamlet":{"name": "Halmet", "type":"tragedy"},
    "as-like":{"name": "As You Like It", "type":"comedy"},
    "othello":{"name":"Othello", "type":"tragedy"}
}

