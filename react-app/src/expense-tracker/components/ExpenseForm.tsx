import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
    description: z.string().min(3, {message: 'Description should be at least 3 characters.'}),
    amount: z.number({invalid_type_error: 'Amount is required.'}).min(1, {message: 'Amount should be at least 1.'}),
    category: z.enum(categories, {
        errorMap: () => ({message: 'Category is required.'}),
    })
});

type ExpenseFormData = z.infer<typeof schema>;  

interface Props {
    onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({onSubmit}: Props) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ExpenseFormData>({
        resolver: zodResolver(schema),
    });


    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data);
            reset();
        })}>  

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" {...register('description')} />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
                </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="number" className="form-control" id="amount" {...register('amount', {valueAsNumber: true})} />
                {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-select" id="category" {...register('category')} >
                    <option value="">All categories</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
                {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    )
}       

export default ExpenseForm;