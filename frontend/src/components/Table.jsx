import React from 'react';

const Table = ({ headers, data, onEdit, onDelete, loading }) => {
    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {headers.map((h, i) => <th key={i}>{h}</th>)}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <span className={`badge ${item.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(item);
                                        }} 
                                        className="btn" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem', border: '1px solid var(--border)' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id);
                                        }} 
                                        className="btn btn-danger" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={headers.length + 1} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
