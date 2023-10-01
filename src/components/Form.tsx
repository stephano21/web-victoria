import React from 'react';
import { Input } from './InputCustom';

interface FormField<T> {
    name: string;
    label?: string; // Hacemos el label opcional
    type?: string;
    bclass?: string;
    value: T;
    onChange: (value: T) => void;
}

interface GenericFormProps {
    fields: FormField<any>[];
    onSubmit: () => void;
}

export const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                {fields.map((field) => (
                    <Input key={field.name} {...field} bclass={field.bclass} label={field.label} type={field.type} />
                ))}
            </div>

            <button type="submit"  className='btn btn-primary'> <i className="bi bi-send"> </i>Enviar</button>
        </form>
    );
};