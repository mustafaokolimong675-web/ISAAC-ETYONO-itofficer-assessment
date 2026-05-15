import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, DollarSign, BarChart3 } from 'lucide-react';
import api from '../services/api';

const StatCard = ({ title, value, icon, color }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ 
            background: `${color}15`, 
            color: color, 
            padding: '1rem', 
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalItems: 0,
        totalValue: 0,
        avgPrice: 0,
        lowStock: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.getAll({ size: 100 });
            const items = res.data.content;
            
            const totalItems = items.length;
            const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            const avgPrice = totalItems > 0 ? (items.reduce((acc, item) => acc + item.price, 0) / totalItems) : 0;
            const lowStock = items.filter(item => item.quantity < 5).length;

            setStats({ totalItems, totalValue, avgPrice, lowStock });
        } catch (err) {
            console.error("Error fetching stats", err);
        }
    };

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Welcome Back!</h2>
                <p style={{ color: 'var(--text-muted)' }}>Here's what's happening in your business today.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Items" value={stats.totalItems} icon={<ShoppingBag />} color="#2563eb" />
                <StatCard title="Inventory Value" value={`$${stats.totalValue.toLocaleString()}`} icon={<DollarSign />} color="#10b981" />
                <StatCard title="Avg. Item Price" value={`$${stats.avgPrice.toFixed(2)}`} icon={<BarChart3 />} color="#f59e0b" />
                <StatCard title="Low Stock Alerts" value={stats.lowStock} icon={<Users />} color="#ef4444" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Recent Activity</h4>
                    <div style={{ height: '300px', background: '#f8fafc', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        Activity Chart Visualization Placeholder
                    </div>
                </div>
                <div className="card">
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Quick Actions</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button className="btn btn-primary" style={{ justifyContent: 'center' }}>Generate Monthly Report</button>
                        <button className="btn" style={{ justifyContent: 'center', border: '1px solid var(--border)' }}>Add New Transaction</button>
                        <button className="btn" style={{ justifyContent: 'center', border: '1px solid var(--border)' }}>Export Data (CSV)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
