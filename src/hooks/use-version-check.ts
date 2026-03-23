import { useEffect, useRef, useState } from "react";

let initialHash: string | null = null;

export function useVersionCheck() {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const checked = useRef(false);

	useEffect(() => {
		const fetchHash = async () => {
			const res = await fetch(`/version.json?t=${Date.now()}`);
			const { hash } = await res.json();
			return hash as string;
		};

		// Capture the hash on first load
		if (!initialHash) {
			fetchHash().then((h) => {
				initialHash = h;
			}).catch(() => {});
		}

		const check = async () => {
			if (checked.current || !initialHash) return;
			try {
				const hash = await fetchHash();
				if (hash !== initialHash) {
					checked.current = true;
					setUpdateAvailable(true);
				}
			} catch {
				// ignore network errors
			}
		};

		const onVisibility = () => {
			if (document.visibilityState === "visible") void check();
		};
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return updateAvailable;
}
