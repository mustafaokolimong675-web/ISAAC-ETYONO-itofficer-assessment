import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Download } from 'lucide-react';
import api from '../services/api';
import Table from '../components/Table';

const ListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems();
    }, [pagination.page, searchTerm]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await api.getAll({ 
                page: pagination.page, 
                size: pagination.size,
                search: searchTerm 
            });
            setItems(res.data.content);
            setPagination({ ...pagination, totalPages: res.data.totalPages });
        } catch (err) {
            console.error("Failed to fetch items", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await api.delete(id);
                fetchItems();
            } catch (err) {
                alert("Error deleting item");
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPagination({ ...pagination, page: 0 });
    };

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Ticket Management</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your enterprise support tickets.</p>
                </div>
                <button onClick={() => navigate('/tickets/new')} className="btn btn-primary">
                    <Plus size={18} /> New Ticket
                </button>
            </header>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by name, department or issue..." 
                            className="form-control"
                            style={{ paddingLeft: '40px' }}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button className="btn" style={{ border: '1px solid var(--border)' }}>
                        <Filter size={18} /> Filter
                    </button>
                    <button className="btn" style={{ border: '1px solid var(--border)' }}>
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            <div className="card">
                <Table 
                    headers={['User', 'Department', 'Issue', 'Priority', 'Status']} 
                    data={items}
                    loading={loading}
                    onEdit={(item) => navigate(`/tickets/edit/${item.id}`)}
                    onDelete={handleDelete}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Showing page {pagination.page + 1} of {pagination.totalPages || 1}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                            disabled={pagination.page === 0}
                            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                            className="btn btn-secondary"
                            style={{ opacity: pagination.page === 0 ? 0.5 : 1 }}
                        >
                            Previous
                        </button>
                        <button 
                            disabled={pagination.page >= pagination.totalPages - 1}
                            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                            className="btn btn-secondary"
                            style={{ opacity: pagination.page >= pagination.totalPages - 1 ? 0.5 : 1 }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPage;
