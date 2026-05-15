import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';
import TicketForm from '../components/TicketForm';

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
            alert("Error loading ticket details");
            navigate('/tickets');
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
            navigate('/tickets');
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
                onClick={() => navigate('/tickets')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', marginBottom: '1.5rem', padding: 0 }}
            >
                <ArrowLeft size={18} /> Back to List
            </button>

            <header style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
                    {id ? 'Update Ticket Details' : 'Create New Ticket'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginTop: '0.25rem' }}>
                    {id ? 'Modify the details of this support ticket.' : 'Enter the details to create a new support ticket.'}
                </p>
            </header>

            <TicketForm
                initialData={item}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/tickets')}
                loading={loading}
            />
        </div>
    );
};

export default FormPage;
