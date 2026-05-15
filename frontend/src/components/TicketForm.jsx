import React, { useState, useEffect } from 'react';

const TicketForm = ({ initialData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        department: '',
        issueTitle: '',
        issueDescription: '',
        priority: 'Low',
        status: 'OPEN'
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
        if (!formData.fullname) newErrors.fullname = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.issueTitle) newErrors.issueTitle = 'Issue title is required';
        if (!formData.issueDescription) newErrors.issueDescription = 'Issue description is required';
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. John Doe"
                    />
                    {errors.fullname && <span className="error-text">{errors.fullname}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. john@example.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Department</label>
                    <select name="department" value={formData.department} onChange={handleChange} className="form-control">
                        <option value="">Select Department</option>
                        <option value="accounts">Accounts / Bursar</option>
                        <option value="science">Science</option>
                        <option value="library">Library</option>
                        <option value="humanresource">Human Resources</option>
                    </select>
                    {errors.department && <span className="error-text">{errors.department}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleChange} className="form-control">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Issue Title</label>
                <input
                    name="issueTitle"
                    value={formData.issueTitle}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Brief summary of the issue"
                />
                {errors.issueTitle && <span className="error-text">{errors.issueTitle}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Issue Description</label>
                <textarea
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Provide detailed description of the issue..."
                ></textarea>
                {errors.issueDescription && <span className="error-text">{errors.issueDescription}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Ticket Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="form-control">
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Ticket'}
                </button>
            </div>
        </form>
    );
};

export default TicketForm;
