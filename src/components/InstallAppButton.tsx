import React, { useState, useEffect } from 'react';

interface Props { }

const InstallAppButton: React.FC<Props> = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [installable, setInstallable] = useState<boolean>(false);
    const [isInstalled, setIsInstalled] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            console.log('beforeinstallprompt fired');
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            setInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        const handleAppInstalled = () => {
            console.log('App installed.');
            setIsInstalled(true);
            setInstallable(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('appinstalled', handleAppInstalled);

        // Check if the app is already installed on mount
        setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            console.log('Prompting user to install app...');
            (deferredPrompt as any).prompt();

            (deferredPrompt as any).userChoice.then((choiceResult: { outcome: string }) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                setDeferredPrompt(null);
                setInstallable(false);
            });
        }
    };

    if (isInstalled) {
        return <p>แอปพลิเคชันได้ถูกติดตั้งแล้ว</p>;
    }

    return (
        <div>
            {installable && (
                <button id="installButton" onClick={handleInstallClick}>
                    ติดตั้งแอป
                </button>
            )}
            {!installable && !isInstalled && <p>กำลังรอให้เบราว์เซอร์พร้อมสำหรับการติดตั้ง...</p>}
        </div>
    );
};

export default InstallAppButton;