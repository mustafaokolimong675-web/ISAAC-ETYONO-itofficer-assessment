import React from 'react';

const Table = ({ headers, data, onEdit, onDelete, loading }) => {
    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="table-wrapper animate-fade-in">
            <table>
                <thead>
                    <tr>
                        {headers.map((h, i) => <th key={i}>{h}</th>)}
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((item, index) => (
                        <tr key={item.id || index}>
                            <td style={{ fontWeight: 600 }}>{item.fullname}<br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.email}</span></td>
                            <td>{item.department}</td>
                            <td style={{ fontWeight: 500 }}>{item.issueTitle}</td>
                            <td>{item.priority}</td>
                            <td>
                                <span className={`badge ${item.status === 'OPEN' ? 'badge-warning' : item.status === 'CLOSED' ? 'badge-success' : 'badge-primary'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit(item);
                                        }}
                                        className="btn btn-outline"
                                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
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
                                        style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#fee2e2', color: '#991b1b', border: 'none' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={headers.length + 1} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                <p style={{ fontSize: '1rem', fontWeight: 500 }}>No transaction records found.</p>
                                <p style={{ fontSize: '0.875rem' }}>Start by adding a new asset or transaction.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
