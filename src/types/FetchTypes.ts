

export type FetchOptionType = {
    method: string,
    headers:{
        Authorization?: string
        'Content-Type'?: string
    },
    body?: string
    
}

export type CheckErrorType = (res: Response) => Response | string



