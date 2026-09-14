export type InstallPlatform = 'ios' | 'android' | 'other';
export type InstallPromptOutcome = 'accepted' | 'dismissed' | 'unavailable';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

type InstallationListener = (event: { installed: boolean; promptAvailable: boolean; standalone: boolean }) => void;

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

export function isRunningStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || navigatorWithStandalone.standalone === true;
}

export function detectInstallPlatform(): InstallPlatform {
  if (typeof window === 'undefined') return 'other';
  const userAgent = window.navigator.userAgent;
  const iPadOs = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(userAgent) || iPadOs) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'other';
}

export function hasNativeInstallPrompt(): boolean {
  return deferredInstallPrompt !== null;
}

export async function promptNativeInstallation(): Promise<InstallPromptOutcome> {
  const promptEvent = deferredInstallPrompt;
  if (!promptEvent) return 'unavailable';

  deferredInstallPrompt = null;
  await promptEvent.prompt();
  const choice = await promptEvent.userChoice;
  return choice.outcome;
}

export function listenForPwaInstallation(listener: InstallationListener): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const displayMode = window.matchMedia('(display-mode: standalone)');
  const emit = (installed = false) => listener({
    installed,
    promptAvailable: hasNativeInstallPrompt(),
    standalone: isRunningStandalone(),
  });

  const onBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    deferredInstallPrompt = event as BeforeInstallPromptEvent;
    emit(false);
  };
  const onAppInstalled = () => {
    deferredInstallPrompt = null;
    emit(true);
  };
  const onDisplayModeChange = () => emit(false);
  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') emit(false);
  };

  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
  window.addEventListener('appinstalled', onAppInstalled);
  displayMode.addEventListener('change', onDisplayModeChange);
  document.addEventListener('visibilitychange', onVisibilityChange);
  emit(false);

  return () => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.removeEventListener('appinstalled', onAppInstalled);
    displayMode.removeEventListener('change', onDisplayModeChange);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}
