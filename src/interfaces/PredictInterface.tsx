export interface IProyectoPred {
    Project: number;
    Pred: number;
    "qq/has": number;
}

export interface IDatosPorMes {
    mes: string;
    data: IProyectoPred[];
}

export interface IPredict {
    Id: string;
    FechaRegistro: Date,
    Hacienda: string
}

