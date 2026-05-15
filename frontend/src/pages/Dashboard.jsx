import React, { useState, useEffect } from 'react';

import api from '../services/api';

const StatCard = ({ title, value, icon, color }) => (
    <div className="card stat-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', border: 'none' }}>
        <div style={{
            background: `${color}10`,
            color: color,
            padding: '1.25rem',
            borderRadius: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 16px -4px ${color}20`
        }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--text-main)' }}>{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalTickets: 0,
        openTickets: 0,
        highPriority: 0,
        closedTickets: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.getAll({ size: 100 });
            const items = res.data.content;
            
            const totalTickets = items.length;
            const openTickets = items.filter(t => t.status === 'OPEN').length;
            const highPriority = items.filter(t => t.priority === 'High' || t.priority === 'Critical').length;
            const closedTickets = items.filter(t => t.status === 'CLOSED').length;

            setStats({ totalTickets, openTickets, highPriority, closedTickets });
        } catch (err) {
            console.error("Error fetching stats", err);
        }
    };

    return (
        <div className="animate-fade-in">
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>Ticketing Overview</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginTop: '0.25rem' }}>Welcome back, here is your real-time performance summary.</p>
                </div>
            </header>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Tickets" value={stats.totalTickets} icon={<ShoppingBag size={24} />} color="#4f46e5" />
                <StatCard title="Open Tickets" value={stats.openTickets} icon={<Users size={24} />} color="#f59e0b" />
                <StatCard title="High Priority" value={stats.highPriority} icon={<BarChart3 size={24} />} color="#ef4444" />
                <StatCard title="Closed Tickets" value={stats.closedTickets} icon={<DollarSign size={24} />} color="#10b981" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
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
                        <button className="btn" style={{ justifyContent: 'center', border: '1px solid var(--border)' }}>Add New ticket</button>
                        <button className="btn" style={{ justifyContent: 'center', border: '1px solid var(--border)' }}>Export Data (CSV)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
