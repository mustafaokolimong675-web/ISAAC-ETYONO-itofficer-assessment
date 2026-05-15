import React, { useState, useEffect } from 'react';

const ItemForm = ({ initialData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        status: 'Active'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: null });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.price || formData.price < 0) newErrors.price = 'Valid email is required';
        if (formData.quantity === '' || formData.quantity < 0) newErrors.quantity = 'Valid quantity is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
                <label className="form-label">ticket name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g. name of ticket here please"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    placeholder="Enter description"
                ></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Classification</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="form-control">
                        <option value="">Select Type</option>
                        <option value="Current Asset">Current Asset</option>
                        <option value="Fixed Asset">Fixed Asset</option>
                        <option value="Liability">Liability</option>
                        <option value="Equity">Equity</option>
                        <option value="Revenue">Revenue</option>
                        <option value="Expense">Expense</option>
                    </select>
                    {errors.category && <span className="error-text">{errors.category}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Record Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="form-control">
                        <option value="Active">Verified</option>
                        <option value="Pending">Pending Audit</option>
                        <option value="Inactive">Archived</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                        step="0.01"
                    />
                    {errors.price && <span className="error-text">{errors.price}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Volume / Units</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.quantity && <span className="error-text">{errors.quantity}</span>}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};

export default ItemForm;
