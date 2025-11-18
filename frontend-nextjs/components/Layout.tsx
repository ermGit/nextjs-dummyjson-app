import React, { useState } from 'react';
import Link from 'next/link';
import CartModal from './CartModal';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);


    return (
        <div>
            <header style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Link href="/">Home</Link> | <Link href="/products">Products</Link>
                </div>
                <div>
                    <button onClick={() => setOpen(true)}>Cart</button>
                </div>
            </header>


            <main style={{ padding: 20 }}>{children}</main>


            <CartModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
};


export default Layout;