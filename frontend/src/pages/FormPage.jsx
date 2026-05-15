import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';
import ItemForm from '../components/ItemForm';

const FormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        setFetching(true);
        try {
            const res = await api.getById(id);
            setItem(res.data);
        } catch (err) {
            alert("Error loading item details");
            navigate('/items');
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            if (id) {
                await api.update(id, formData);
            } else {
                await api.create(formData);
            }
            navigate('/items');
        } catch (err) {
            alert("Error saving record: " + (err.response?.data?.message || "Internal Server Error"));
        } finally {
            setLoading(false);
        }
    };

    if (id && fetching) return <div style={{ padding: '2rem' }}>Loading data...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button 
                onClick={() => navigate('/items')} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', marginBottom: '1.5rem', padding: 0 }}
            >
                <ArrowLeft size={18} /> Back to List
            </button>
            
            <header style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
                    {id ? 'Refine Asset Details' : 'Register New Asset'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginTop: '0.25rem' }}>
                    {id ? 'Modify the parameters of this financial record.' : 'Enter the details to initialize a new asset in the ecosystem.'}
                </p>
            </header>

            <ItemForm 
                initialData={item} 
                onSubmit={handleSubmit} 
                onCancel={() => navigate('/items')}
                loading={loading}
            />
        </div>
    );
};

export default FormPage;
