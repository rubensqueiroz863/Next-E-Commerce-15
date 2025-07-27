import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { SignInButton, UserButton } from '@clerk/nextjs';
import Cart from './Cart';

function NavBar() {
    //const useStore = useCartStore();

    return (
        <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-neutral-900 text-gray-300">
            <Link href="/" className="uppercase text-white font-bold text-md h-12 flex items-center">
                next-ecommerce
            </Link>
            <div className="flex items-center gap-8">
                <Cart/>
                <div>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode='modal'>
                            <button className="border rounded-md cursor-pointer border-gray-400 px-3 py-2">
                                Fazer Login
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
                
            </div>
        </nav>
    );
}

export default NavBar;