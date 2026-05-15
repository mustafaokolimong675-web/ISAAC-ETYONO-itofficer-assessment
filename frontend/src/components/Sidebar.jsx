import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, List, PlusCircle, Settings, HelpCircle, LogOut, DollarSign } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <List size={20} />, label: 'Management', path: '/items' },
        { icon: <PlusCircle size={20} />, label: 'Add New', path: '/items/new' },
    ];

    return (
        <aside className="sidebar" style={{
            width: 'var(--sidebar-width)',
            background: 'white',
            borderRight: '1px solid var(--border)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100
        }}>
            <div className="sidebar-header" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '-0.025em' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), #4f46e5)',
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                    }}>
                        <DollarSign size={20} />
                    </div>
                    DiuFinance
                </h1>
            </div>

            <nav style={{ padding: '1.5rem 1rem', flex: 1 }}>
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            marginBottom: '0.5rem',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            background: isActive ? '#eff6ff' : 'transparent',
                            fontWeight: isActive ? 600 : 500,
                            transition: 'all 0.2s'
                        })}
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)' }}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
