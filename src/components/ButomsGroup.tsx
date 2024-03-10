import React from 'react';

interface ButomsGroupProps {
    id?: number;
    Name? : string;
    onEdit?: (id: number, Name:string,) => void;
    onDelete?: (id: number, Name:string) => void;
}

export const ButomsGroup: React.FC<ButomsGroupProps> = ({
    id = 0,
    Name="Elemento",
    onEdit,
    onDelete,
}) => {
    return (
        <div>
            {onEdit && (
                <button onClick={() => onEdit(id,Name)} className='btn btn-primary'>
                    <i className="bi bi-pencil-square"></i>
                </button>
            )}
            {onDelete && (
                <button onClick={() => onDelete(id,Name)} className='btn btn-danger'>
                    <i className="bi bi-trash-fill"></i>
                </button>
            )}
        </div>
    );
};